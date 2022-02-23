import { API_KEY, BASE_URL, IMG_URL, language } from "./api/index.js";

const contentElement = document.querySelector(".content");
const buttonFindMovie = document.querySelector(".text button");

function generateId(numberMax) {
  return Math.floor(Math.random() * numberMax + 1);
}

async function getMovieRandom() {
  const id = generateId(100000);

  try {
    const response = await fetch(`${BASE_URL}${id}?${API_KEY}&${language}`);
    const movie = await response.json();

    if (response.ok) {
      renderMovie(movie);
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    showMessageMovieNotFund();
    console.log(error);
  }
}

function checkMovieHasAnImage(movie) {
  const { backdrop_path, poster_path } = movie;

  if (!backdrop_path && !poster_path) {
    throw new Error("Can't show this movie, because the image is missing");
  }
}

function renderMovie(movie) {
  const { original_title, overview, backdrop_path, poster_path } = movie;

  checkMovieHasAnImage(movie);

  const movieImage = `${IMG_URL}${poster_path || backdrop_path}`;

  const html = `
    <div class="movie">
      <div class="movie-image">
        <img src=${movieImage}
          alt=${original_title}
          title=${original_title}
        />
      </div>
      <div class="info">
        <strong class="movie-title">${original_title}</strong>
        <p class="movie-description">
          ${overview || "Filme sem descrição."}
        </p>
      </div>
    </div>
  `;

  contentElement.innerHTML = html;
}

function showMessageMovieNotFund() {
  const html = `
    <div class="error">
      <img src="https://img.freepik.com/fotos-gratis/desenvolvedor-de-software-pensando-enquanto-toca-a-barba-enquanto-digita-no-laptop-sentado-na-mesa-com-varias-telas-analisando-o-codigo-administrador-de-banco-de-dados-focado-trabalhando-com-codificacao-de-equipe-em-segundo-plano_482257-33556.jpg?w=996" alt="Developer"/>
      <strong>
        Ops, hoje não é dia de assistir filme.
        Bora codar! 🚀
      </strong>
    </div>
  `;

  contentElement.innerHTML = html;
}

buttonFindMovie.addEventListener("click", getMovieRandom);
