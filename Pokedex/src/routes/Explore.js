import React, { useEffect, useState } from 'react';
import Deck from '../components/Explore/Deck';
import {
  fetchPokemonData,
  fetchPokemonType,
  fetchPokemonByName,
} from '../helper/GetPokemons';

import PageFlipper from '../components/Explore/PageFlipper';

import { usePageNum } from '../helper/PageNumHooks';
import '../styles/Explore.css';
export default function Explore({ searchWord, type }) {
  const [data, setData] = useState(null);

  const { prePage } = usePageNum();
  const { nextPage } = usePageNum();

  useEffect(() => {
    const fetchAllData = async (prePage, nextPage, searchWord, type) => {
      if (searchWord) {
        const allData = await fetchPokemonByName(prePage, nextPage, searchWord);
        setData(allData);
      }
      if (type) {
        const allData = await fetchPokemonType(prePage, nextPage, type);
        setData(allData);
      }
      if (searchWord === null && type === null) {
        const allData = await fetchPokemonData(prePage, nextPage);
        setData(allData);
      }
    };
    fetchAllData(prePage, nextPage, searchWord, type);
  }, [prePage, nextPage, searchWord, type]);

  return (
    <>
      <div className="main">
        {data ? <Deck data={data} /> : <p>Loading...</p>}
      </div>
      <PageFlipper length={data?.length} />
    </>
  );
}
