const baseUrl = 'https://api.weatherapi.com/v1'
const apiKey = 'f61ff078d25448c3b0a131547221405'
const select = document.querySelector("#days");
const search = document.querySelector("#search");
const city = document.querySelector("#city");
const root = document.querySelector('#root')
const type = 'forecast.json'


const fetchWeather = (query, selectVal) => {
    fetch(`${baseUrl}/${type}?key=${apiKey}&q=${query}&days=${selectVal}&aqi=true`)
    .then((response) => response.json())
    .then((data) => {
        data.forecast.forecastday.forEach(item => {
            const div = document.createElement("div");
            const h2 = document.createElement("h2");
            const img = document.createElement("img");
            const div2 = document.createElement("div");
            const span = document.createElement("span");
            const sunrise = document.createElement("div");
            const sunset = document.createElement("div");
            const date = document.createElement("div");
            div.classList.add("weather-container");
            div2.classList.add("weather-description");
            h2.innerText = data.location.name;
            img.src = item.day.condition.icon;
            div2.innerText = item.day.condition.text;
            span.innerText = item.day.avgtemp_c + ' ℃';
            sunrise.innerText = 'Sunrise: ' + item.astro.sunrise;
            sunset.innerText = 'Sunset: ' + item.astro.sunset;
            date.innerText = "Forecast for " + item.date.split("-").reverse().join(".")
            div.append(h2)
            div.append(date)
            div.append(img)
            div.append(div2)
            div.append(span)
            div.append(sunrise)
            div.append(sunset)
            root.append(div)
        })
    })
}


search.addEventListener("click", function (e) {
    e.preventDefault();

    const query = city.value.length == 0 ? 'auto:ip' : city.value

    root.innerText = ''

    fetchWeather(query, select.value)

})

fetchWeather('auto:ip', select.value)

// http://api.weatherapi.com/v1/forecast.json?key=f61ff078d25448c3b0a131547221405&q=London&days=1&aqi=yes&alerts=no
// http://api.weatherapi.com/v1/forecast.json?key=f61ff078d25448c3b0a131547221405&q=London&days=1&aqi=yes&alerts=no
