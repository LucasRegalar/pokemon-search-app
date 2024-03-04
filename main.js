const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonImg = document.getElementById("pokemon-img");
const pokemonType = document.getElementById("types");
const pokemonHP = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpAttack = document.getElementById("special-attack");
const pokemonSpDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");


async function fetchPokemonDataAsyncVersion (searchInput) {
    try {
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`);
        console.log(response);
        if (!response.ok) {
            alert('Pokemon not found!');
            throw new Error("Pokemon not found"); // The "throw" statement makes the code jump straight to the catch block
        }
        const pokemonData = await response.json();
        console.log(pokemonData);
        return pokemonData;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const fetchPokemonDataAsyncVersionArrowSyntax = async (searchInput) => {
    try {
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`);
      //  console.log(response);
        if (!response.ok) {
            alert('Pokemon not found!');
            throw new Error("Pokemon not found"); // The "throw" statement makes the code jump straight to the catch block
        }
        const pokemonData = await response.json();
      //  console.log(pokemonData);
        return pokemonData;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const fetchPokemonDataThenVersion = (searchInput) => {
    fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`)
    .then(response => {
        console.log(response);
        if (!response.ok) {
            alert('Pokemon not found!');
            throw new Error('Pokemon not found'); // Throw an error to skip the next .then()
        }
        return response.json();
    })
    .then(pokemonData => {
        console.log(pokemonData);
        return pokemonData;
    })
    .catch((err) => {
        console.log(err);
        return null;
    })
}


const getPokemonData = async () => {
    try {
        const input = cleanInput(searchInput.value);
        const data = await fetchPokemonDataAsyncVersionArrowSyntax(input);
        console.log(data);
        clearInterface();
        displayPokemonData(data);
    } catch(err) {
        console.log(err)
    }
}

const cleanInput = (input) => {
    const inputLowerCase = input.toLowerCase();
    const regex = /\s/g
    const cleanInput = inputLowerCase.replace(regex, "-");
    return cleanInput;
}

const clearInterface = () => {
    pokemonId.innerText = "-";
    pokemonName.innerText = "-";
    pokemonWeight.innerText = "Weight: 0";
    pokemonHeight.innerText = "Height: 0";
    pokemonImg.setAttribute("src", "");
    pokemonType.innerHTML = '<p class="typeless type">-</p>';
    pokemonHP.innerText = "0";
    pokemonAttack.innerText = "0";
    pokemonDefense.innerText = "0";
    pokemonSpAttack.innerText = "0";
    pokemonSpDefense.innerText = "0";
    pokemonSpeed.innerText = "0";

}

const displayPokemonData = (data) => {
    const id = data.id;
    const name = data.name;
    const weight = data.weight;
    const height = data.height;
    const spriteFrontDefault = data.sprites.front_default;
    const hp = data.stats[0].base_stat;
    const attack = data.stats[1].base_stat;
    const defense = data.stats[2].base_stat;
    const spAttack = data.stats[3].base_stat;
    const spDefense = data.stats[4].base_stat;
    const speed = data.stats[5].base_stat;
    const types = data.types;
    console.log(types);
    pokemonId.innerText = `#${id}`;
    pokemonName.innerText = `${name.toUpperCase()}`;
    pokemonWeight.innerText = `Weight: ${weight}`;
    pokemonHeight.innerText = `Height: ${height}`;
    pokemonImg.setAttribute("src", spriteFrontDefault);
    pokemonType.innerHTML = createTypesHTML(types);
    pokemonHP.innerText = hp;
    pokemonAttack.innerText = attack;
    pokemonDefense.innerText = defense;
    pokemonSpAttack.innerText = spAttack;
    pokemonSpDefense.innerText = spDefense;
    pokemonSpeed.innerText = speed;
}

const createTypesHTML = (typesArr) => {
    let HTML = "";
    typesArr.forEach((type) => {
        HTML += `
        <p class="${type.type.name} type">${type.type.name.toUpperCase()}</p>
        `
    })
    return HTML;
}


searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    getPokemonData();
})