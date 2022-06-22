
import React from 'react'

function PokemonIndex() {
  const [pokemon, setPokemon] = React.useState([])

  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/pokemon')
      const json = await res.json()
      setPokemon(json)
    }
    getData()
  }, [])

  return (
    <div className="section">
      <h1 className="title">Pokemon Index</h1>
      <div className="container">
        {pokemon.map(pokemon => <h2 key={pokemon._id}>{pokemon.name}</h2>)}
      </div>
    </div>
  )
}

export default PokemonIndex

