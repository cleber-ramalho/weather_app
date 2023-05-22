
// Variáveis e seleções de elementos

const apiKey = 'b797d2f71f672f607ce4293770523278';
const apiUnsplash = "https://source.unsplash.com/1366x768/?";

const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const cityElement = document.querySelector('#city');
const temperatureElement = document.querySelector('#temperature span');
const descriptionElement = document.querySelector('#description');
const countryFlagElement = document.querySelector('#country-flag');
const weatherIconElement = document.querySelector('#weather-icon');
const humidityElement = document.querySelector('#humidity span');
const windElement = document.querySelector('#wind span');

const weatherContainer = document.querySelector('#weather-data');

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");


// Funções


// Loader
const toggleLoader = () => {
    loader.classList.toggle("hide");
  };


const getWeatherData = async(city) => {
    toggleLoader();

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL)
    const data = await res.json();

    toggleLoader();

    return data;
};

// Tratamento de erro
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
  };
  
  const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");
  
    suggestionContainer.classList.add("hide");
  };

  

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    if (data.cod === "404") {
        showErrorMessage();
        return;
      }

    cityElement.innerText = data.name;
    temperatureElement.innerText = `${parseInt(data.main.temp)} °C`;
    humidityElement.innerText = `${data.main.humidity}%`;
    descriptionElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    windElement.innerText = `${parseInt(data.wind.speed)} km/h`;
    countryFlagElement.setAttribute('src', `https://flagsapi.com/${data.sys.country}/flat/48.png`);

    // Change bg image
    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

    weatherContainer.classList.remove('hide');
};


// Eventos


// Somente letras no input
cityInput.addEventListener('keypress', function(e) {
  const keyCode = (e.keyCode ? e.keyCode : e.wich);

  // 47 + até -58 são caracteres numéricos
  if(keyCode > 47 && keyCode < 58){
    e.preventDefault();
  }
  
})

// Botão Buscar
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});

// Iniciar busca com tecla Enter
cityInput.addEventListener('keyup', (e) => {
    if( e.code === 'Enter' ) {
        const city = e.target.value;

        showWeatherData(city);
    }
});

// Sugestões
suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const city = btn.getAttribute("id");
  
      showWeatherData(city);
    });
  });