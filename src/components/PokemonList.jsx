import { useState, useEffect } from "react";

function PokemonList() {
  const [pokemonsList, setPokemonsList] = useState([]);
  const [pageLimit, setPageLimit] = useState(12);
  
  async function fetchPokemon() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pageLimit}&offset=0`);
      const data = await response.json();
      setPokemonsList(data.results || []);
    } catch (error) {
      console.error('Hata:', error);
    }
  }
  useEffect(() => {
    fetchPokemon()
  }, [pageLimit])

  const pageLimitHandler = () => {
    setPageLimit(pageLimit + 12)
  }
  
  return (
    <>
      <div className="row">
        {pokemonsList.map((item, index) => (
          <div key={index} className="col-3">
            <div className="card" style={{margin:'1rem'}}>
              <h3 className="text-center">{item.name}</h3>
            </div>
          </div>
        ))}
        <div className="col-12" style={{display:'flex', justifyContent:'center', marginTop:'1rem'}}>
          <button className="btn-small" onClick={pageLimitHandler}>Load More ...</button>
        </div>
      </div>
    </>
  );
}

export default PokemonList;
