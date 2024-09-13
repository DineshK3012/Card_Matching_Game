// Pokemon data containing name and image path
const pokemonData = [
    { id: 1, name: 'Pikachu', image: '/images/pikachu.png' },
    { id: 2, name: 'Charmander', image: '/images/charmander.png' },
    { id: 3, name: 'Bulbasaur', image: '/images/bulbasaur.png' },
    { id: 4, name: 'Jigglypuff', image: '/images/jigglypuff.png' },
    { id: 5, name: 'Snorlax', image: '/images/snorlax.png' },
    { id: 6, name: 'Eevee', image: '/images/eevee.png' }
];

// Function to randomly select 'n' unique Pokemon and return a shuffled array with duplicates
const getPokemonGrid = (numUnique) => {
    if (numUnique > pokemonData.length) {
        throw new Error('Requested number of unique Pokemon exceeds available data');
    }

    // Shuffle and take 'numUnique' unique Pokemon
    const shuffledPokemon = [...pokemonData].sort(() => 0.5 - Math.random());
    const selectedPokemon = shuffledPokemon.slice(0, numUnique);

    // Duplicate each Pokemon and shuffle the result to form the grid
    const duplicatedPokemon = [...selectedPokemon, ...selectedPokemon].sort(() => 0.5 - Math.random());

    return duplicatedPokemon;
};

export { getPokemonGrid };
