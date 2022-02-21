import { API_KEY, BASE_URL, IMG_URL, language } from "./api/index.js";

const contentElement = document.querySelector(".content");

async function test() {
  const response = await fetch(`${BASE_URL}/550?${API_KEY}`);
  const data = await response.json();

  console.log(data);
}

test();
