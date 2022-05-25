const baseUrl = 'https://api.weatherapi.com/v1'
const apiKey = 'f61ff078d25448c3b0a131547221405'
const select = document.querySelector("#days");
const search = document.querySelector("#search");
const city = document.querySelector("#city");
const root = document.querySelector('#root')


search.addEventListener("click", function (e) {
    e.preventDefault();
    const type = 'forecast.json'

    const query = city.value.length == 0 ? 'auto:ip' : city.value

    root.innerText = ''

    fetch(`${baseUrl}/${type}?key=${apiKey}&q=${query}&days=${select.value}&aqi=true`)
        .then((response) => response.json())
        .then((data) => {
            data.forecast.forecastday.forEach(item => {
                const div = document.createElement("div");
                const h2 = document.createElement("h2");
                const img = document.createElement("img");
                const div2 = document.createElement("div");
                const span = document.createElement("span");
                const sunrise = document.createElement("p");
                const sunset = document.createElement("p");
                div.classList.add("weather-container");
                div2.classList.add("weather-description");
                h2.innerText = data.location.name;
                img.src = item.day.condition.icon;
                div2.innerText = item.day.condition.text;
                span.innerText = item.day.avgtemp_c + ' ℃';
                sunrise.innerText = 'Sunrise: ' + item.astro.sunrise;
                sunset.innerText = 'Sunset: ' + item.astro.sunset;
                div.append(h2)
                div.append(img)
                div.append(div2)
                div.append(span)
                div.append(sunrise)
                div.append(sunset)
                root.append(div)
                console.log(sunset);
            })
        })

})

// http://api.weatherapi.com/v1/forecast.json?key=f61ff078d25448c3b0a131547221405&q=London&days=1&aqi=yes&alerts=no
