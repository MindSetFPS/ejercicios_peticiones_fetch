import { useState } from 'react'
import { useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0)
  const [pokemon, setPokemon] = useState();
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState(25);

  useEffect(() => {
    getPokemonData()
  }, []);

  function getPokemonData() {
    setIsLoading(true)
    setPokemon(null)
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      .then(() => console.log(pokemon))
      .catch((error) => setError(true))
      .finally(() => setIsLoading(false))
  }

  function getNextPokemon() {
    setIsLoading(true)
    setPokemon(null)
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id + 1}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      .then(() => console.log(pokemon))
      .catch((error) => setError(true))
      .finally(() => setIsLoading(false))
  }

  function getPrevPokemon() {
    setIsLoading(true)
    setPokemon(null)
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id - 1}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      .then(() => console.log(pokemon))
      .catch((error) => setError(true))
      .finally(() => setIsLoading(false))
  }

  return (
    <div className='container mx-auto '>
      <div className='flex w-full px-2 my-2'>
        <input
          type="text"
          name=""
          id=""
          className='bg-slate-100 p-2 rounded-md w-full'
          placeholder='Nombre o Id de Pokemon'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={() => getPokemonData()}
          className='bg-red-500 p-2 ml-2 rounded-lg text-white font-bold hover:bg-red-700 transition'>
          Buscar
        </button>
      </div>
      {
        loading ? 'Cargando ...' : ''
      }
      {
        error ? 'No se encontró el resultado' : ''
      }
      <div className='grid grid-cols-2 md:grid-cols-8 md:bg-black rounded-3xl md:text-white '>
        <div className='p-2 md:p-0 md:rounded-l-3xl bg-blue-600 text-white font-bold flex justify-center items-center' onClick={() => getPrevPokemon()}>
          Anterior
        </div>
        <div className='col-span-6 p-4 -order-1 md:order-none md:p-12 '>
          {pokemon ? (
            <div className='md:flex'>
              <div className='
               flex justify-center items-center rounded-xl
              md:w-1/3 bg-cover bg-[center_-9rem] md:bg-[center_-5rem] bg-[url("https://preview.redd.it/ah-yes-my-favorite-pokemon-v0-pgy4vdutd5za1.jpg?width=640&crop=smart&auto=webp&s=c2605de33b18da76512a3501e6d9c780e146c14b")]'>
                <img className='w-32 h-64 object-contain'
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`} alt="" />
              </div>
              <div className='md:w-2/3 md:p-2'>
                <div className='flex justify-evenly'>
                  <h2>{pokemon.name}</h2>
                  <p># {pokemon.id}</p>
                  <p>Types: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
                  <p>Weight: {pokemon.weight} kg</p>
                </div>
                <div>
                  {
                    pokemon.stats.map((val) =>
                    (
                        <div className='h-6 my-3 bg-gradient-to-tr from-gray-300 to-gray-500 -300 rounded-full relative'>
                          <div className='text-white  font-bold text-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            { val.stat.name + ':' + val.base_stat}
                          </div>
                          <div className={`rounded-full h-full bg-gradient-to-tr from-blue-500 to-blue-400 w-[${(val.base_stat / 255) * 100}%]`}></div>
                        </div>
                    ))
                  }
                </div>
              </div>
            </div>
          ) : ''}
        </div>
        <div className='md:w-auto md:rounded-r-3xl bg-rose-600 text-white font-bold flex justify-center items-center' onClick={() => getNextPokemon()}>
          Siguiente
        </div>
      </div>
    </div>
  )
}

export default App
