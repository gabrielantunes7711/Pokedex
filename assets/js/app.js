const pokemonChoice = document.querySelector("form input").value;
const pokemonList = document.querySelector(".pokemon-list");
const pokemonCard = document.querySelector(".pokemon-card");
const url = `https://pokeapi.co/api/v2/pokemon/`;
for (let i = 1; i <= 50; i++) {
  fetch(url + i)
    .then((res) => res.json())
    .then((pokemon) => {
      const pokemonType = pokemon.types[0].type.name;
      const pokemonImage = pokemon.sprites.other.dream_world.front_default;
      pokemonList.innerHTML += `<a href="#" class="pokemon-card ${pokemonType}" data-pokemon-index="${i}" onclick="populateModal(this);modalToggle()">
        <span>#0${pokemon.id}</span>
        <img src="${pokemonImage}" alt="Pokemon" />
        <span>${pokemon.name}</span>
      </a>`;
    });
}

function populateModal(el) {
  const pokemonIndex = el.attributes[2].value;
  const pokemonNameModal = document.querySelector(".container-name-number h1");
  const pokemonNumberModal = document.querySelector(
    ".container-name-number span"
  );
  const pokemonImageModal = document.querySelector(".pokemon-image");
  const pokemonTypesModal = document.querySelector(".types");
  const pokemonMovesModal = document.querySelector(".moves");
  const pokemonWeightModal = document.querySelector(".weight");
  const pokemonHeightModal = document.querySelector(".height");
  const allStatModal = document.querySelectorAll(".stat span");
  const allStatValueModal = document.querySelectorAll("progress");

  fetch(url + pokemonIndex)
    .then((res) => res.json())
    .then((pokemon) => {
      const pokemonImageApi = pokemon.sprites.other.dream_world.front_default;
      const pokemonTypes = pokemon.types;
      const pokemonMoves = pokemon.moves;
      const pokemonStats = pokemon.stats;

      pokemonTypesModal.innerHTML = "";
      pokemonMovesModal.innerHTML = "";
      pokemonNameModal.innerHTML = `<img src="assets/img/arrow-white.svg" alt="Seta para a esquerda">${pokemon.name}`;
      pokemonNumberModal.innerHTML = `#0${pokemon.id}`;
      pokemonImageModal.innerHTML = `<img src="${pokemonImageApi}" alt="">`;
      pokemonWeightModal.innerHTML = `${pokemon.weight / 10} kg`;
      pokemonHeightModal.innerHTML = `${pokemon.height / 10} m`;

      for (const pokemonType of pokemonTypes) {
        pokemonTypesModal.innerHTML += `<strong class="type">${pokemonType.type.name}</strong>`;
      }

      for (let i = 0; i < 2; i++) {
        pokemonMovesModal.innerHTML += `<span>${pokemonMoves[i].move.name}</span>`;
      }
      for (let i = 0; i < 6; i++) {
        allStatModal[i].innerHTML = pokemonStats[i].base_stat;
        allStatValueModal[i].value = pokemonStats[i].base_stat;
      }
      pokemonColor(pokemonTypes);
    });

  fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}`)
    .then((res) => res.json())
    .then((pokemon) => {
      const descriptionModal = document.querySelector(".main-content p");

      descriptionModal.innerHTML = pokemon.flavor_text_entries[4].flavor_text;
    });
}

const colors = {
  bug: "145, 193, 47",
  dark: "90, 84, 101",
  dragon: "11, 109, 195",
  electric: "244, 210, 60",
  fairy: "236, 143, 230",
  fighting: "206, 65, 107",
  fire: "255, 157, 85",
  flying: "137, 170, 227",
  ghost: "82, 105, 173",
  grass: "99, 188, 90",
  ground: "217, 120, 69",
  ice: "115, 206, 192",
  normal: "145, 154, 162",
  poison: "181, 103, 206",
  psychic: "250, 113, 121",
  rock: "197, 183, 140",
  steal: "90, 142, 162",
  water: "80, 144, 214",
};

function pokemonColor(pokemonTypes) {
  const root = document.querySelector(":root");
  const firstPokemonType = pokemonTypes[0].type.name;

  root.style.setProperty("--main-color", `rgba(${colors[firstPokemonType]})`);
  root.style.setProperty(
    "--light-main-color",
    `rgba(${colors[firstPokemonType]},0.5)`
  );

  if (pokemonTypes.length > 1) {
    const secondPokemonType = pokemonTypes[1].type.name;
    root.style.setProperty(
      "--secondary-color",
      `rgba(${colors[secondPokemonType]})`
    );
  }
}

function modalToggle() {
  const modal = document.querySelector(".modal");
  const body = document.querySelector("body");

  if (body.style.overflow == "hidden") {
    body.style.overflow = "visible";
  } else {
    body.style.overflow = "hidden";
  }
  modal.classList.toggle("open");
}
