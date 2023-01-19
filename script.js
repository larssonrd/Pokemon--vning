import pokemons from "./data.js";

const availablePokemonCards = document.getElementById(
  "available-pokemons__cards"
);
const chosenPokemonCards = document.getElementById("chosen-pokemons__cards");
const totalCPEl = document.getElementById("total-cp");

let chosenPokemonsArr = [];

//////// Event listeners ////////

availablePokemonCards.addEventListener("click", (e) => {
  if (availablePokemonCards.contains(e.target)) {
    let parentEl = e.target.closest("[data-index]");
    if (parentEl) {
      let arrIndex = parentEl.dataset.index;
      chosenPokemonsArr.push(pokemons[arrIndex]);
      pokemons.splice(arrIndex, 1);
      generatePokemonCards();
      calculateCP();
    }
  }
});

chosenPokemonCards.addEventListener("click", (e) => {
  if (chosenPokemonCards.contains(e.target)) {
    let parentEl = e.target.closest("[data-index]");
    if (parentEl) {
      let arrIndex = parentEl.dataset.index;
      pokemons.push(chosenPokemonsArr[arrIndex]);
      chosenPokemonsArr.splice(arrIndex, 1);
      generatePokemonCards();
      calculateCP();
    }
  }
});

//////// Funktioner ////////

function generatePokemonCards() {
  let availablePokemons = pokemons.map((pokemon, index) => {
    return `
        <div class="pokemon-card" id="${pokemon.id}" data-index="${index}">
            <div class="pokemon-card__color" id="${pokemon.name}"></div>
            <div class="pokemon-card__info">
                <p class="pokemon-card__name">${pokemon.name}</p>
                <p class="pokemon-card__cp">${pokemon.cp}</p>
            </div>
        </div>`;
  });

  let chosenPokemons = chosenPokemonsArr.map((pokemon, index) => {
    return `
      <div class="pokemon-card" id="${pokemon.id}" data-index="${index}">
          <div class="pokemon-card__color" id="${pokemon.name}"></div>
          <div class="pokemon-card__info">
              <p class="pokemon-card__name">${pokemon.name}</p>
              <p class="pokemon-card__cp">${pokemon.cp}</p>
          </div>
      </div>`;
  });

  availablePokemonCards.innerHTML = availablePokemons.join("");
  chosenPokemonCards.innerHTML = chosenPokemons.join("");

  renderColor(pokemons);
  renderColor(chosenPokemonsArr);
}

generatePokemonCards();

//Räkna ut CP
function calculateCP() {
  let totalCP = 0;
  chosenPokemonsArr.forEach((pokemon) => {
    totalCP += pokemon.cp;
  });
  totalCPEl.textContent = totalCP;
}

//Rendera rätt färg för varje pokemon
function renderColor(pokemonArray) {
  pokemonArray.forEach((pokemon) => {
    document.getElementById(pokemon.name).style.backgroundColor = pokemon.color;
  });
}
