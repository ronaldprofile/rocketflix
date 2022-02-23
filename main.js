import { API_KEY, BASE_URL, IMG_URL, language } from "./api/index.js";

const contentElement = document.querySelector(".content");
const buttonFindMovie = document.querySelector(".text button");

function generateId(numberMax) {
  return Math.floor(Math.random() * numberMax + 1);
}

async function getMovieRandom() {
  try {
    const id = generateId(100000);
    const response = await fetch(`${BASE_URL}${id}?${API_KEY}&${language}`);
    const movie = await response.json();

    const poster_path = movie.poster_path;
    const movieImage = `${IMG_URL}${poster_path}`;

    if (response.ok) {
      renderMovie(movie, movieImage);
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    showMessageMovieNotFund();
    console.log(error);
  }
}

function renderMovie(movie, movieImage) {
  const html = `
    <div class="movie">
      <div class="movie-image">
        <img src=${movieImage}
          alt=${movie.original_title}
          title=${movie.original_title}
        />
      </div>
      <div class="info">
        <strong class="movie-title">${movie.original_title}</strong>
        <p class="movie-description">${movie.overview}</p>
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
