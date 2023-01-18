import pokemons from "./data.js";

const availablePokemonCards = document.getElementById(
  "available-pokemons__cards"
);
const chosenPokemonCards = document.getElementById("chosen-pokemons__cards");
const totalCpEl = document.getElementById("total-cp");

let chosenPokemonsArr = [];

//Event listeners

availablePokemonCards.addEventListener("click", (e) => {
  if (e.target.dataset.index) {
    chosenPokemonsArr.push(pokemons[e.target.dataset.index]);
    pokemons.splice(e.target.dataset.index, 1);
    generatePokemonCards();
    calculateCP();
  }
});

chosenPokemonCards.addEventListener("click", (e) => {
  if (e.target.dataset.index) {
    pokemons.push(chosenPokemonsArr[e.target.dataset.index]);
    chosenPokemonsArr.splice(e.target.dataset.index, 1);
    generatePokemonCards();
    calculateCP();
  }
});

//Funktioner

function generatePokemonCards() {
  let availablePokemons = pokemons.map((pokemon, index) => {
    return `
    <div class="pokemon-card" id="${pokemon.id}" data-index="${index}">
        <div class="pokemon-card__color" id="${pokemon.name}" data-index="${index}"></div>
        <div class="pokemon-card__info" data-index="${index}">
            <p class="pokemon-card__name" data-index="${index}">${pokemon.name}</p>
            <p class="pokemon-card__cp" data-index="${index}">${pokemon.cp}</p>
        </div>
    </div>`;
  });

  let chosenPokemons = chosenPokemonsArr.map((pokemon, index) => {
    return `
    <div class="pokemon-card" id="${pokemon.id}" data-index="${index}">
        <div class="pokemon-card__color" id="${pokemon.name}" data-index="${index}"></div>
        <div class="pokemon-card__info" data-index="${index}">
            <p class="pokemon-card__name" data-index="${index}">${pokemon.name}</p>
            <p class="pokemon-card__cp" data-index="${index}">${pokemon.cp}</p>
        </div>
    </div>`;
  });

  availablePokemonCards.innerHTML = availablePokemons.join("");
  chosenPokemonCards.innerHTML = chosenPokemons.join("");

  pokemons.forEach((pokemon) => {
    document.getElementById(pokemon.name).style.backgroundColor = pokemon.color;
  });
  chosenPokemonsArr.forEach((pokemon) => {
    document.getElementById(pokemon.name).style.backgroundColor = pokemon.color;
  });
}

//Räkna ut CP
function calculateCP() {
  let totalCp = 0;
  chosenPokemonsArr.forEach((pokemon) => {
    totalCp += pokemon.cp;
  });
  totalCpEl.textContent = totalCp;
}

generatePokemonCards();
