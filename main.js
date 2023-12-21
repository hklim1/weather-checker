// `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state code},${country code}&limit=5&appid=9198b1a70c315993356d114d15306376`

async function requestWeatherData() {
    const cityInput = document.getElementById("city-form")
    const cityValue = cityInput.value
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=5&appid=9198b1a70c315993356d114d15306376`, {
    method: "GET"
    })
    if(res.ok){
        const data = await res.json()
        const lat = data[0]['lat']
        const lon = data[0]['lon']
        const res2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9198b1a70c315993356d114d15306376`, {
            method: "GET"
        })
            if(res2.ok){
                const data2 = await res2.json()
                return data2
                } else window.alert('Bad Request')
    } else window.alert('Bad Request. Please try a larger city.')
}


const submitButton = document.getElementById("submit-button")

submitButton.addEventListener('click', () => convert())

const body = document.body

async function convert() {

    let data3 = await requestWeatherData()
    
    let currentTempP = document.getElementById("currentP");
    let lowTempHeading = document.getElementById("lowTempH");
    let highTempHeading = document.getElementById("highTempH");
    let forecastHeading = document.getElementById("forecastH");
    let humidityHeading = document.getElementById("humidityH");

    const currentTemp = (data3.main.temp - 273.15) * 9/5 + 32
    const highTemp = (data3.main.temp_max - 273.15) * 9/5 + 32
    const lowTemp = (data3.main.temp_min - 273.15) * 9/5 + 32
    const forecast = data3.weather[0].main
    const humidity = data3.main.humidity

    console.log(data3)
    if (forecast == "Clouds"){
        body.style.backgroundImage = "url('./images/clouds.webp')"
        body.style.backgroundSize = "90%";
    }
    if (forecast == "Clear"){
        body.style.backgroundImage = "url('./images/sunny-background.jpeg')"
        body.style.backgroundSize = "cover";
    }
    if (forecast == "Rain"){
        body.style.backgroundImage = "url('./images/rainy.avif')"
        body.style.backgroundSize = "cover";
    }
    if (forecast == "Mist"){
        body.style.backgroundImage = "url('./images/mist.avif')"
        body.style.backgroundSize = "cover";
    }

    console.log(currentTemp)
    let currentTempInsert = document.createElement("p")
    currentTempInsert.textContent = `${currentTemp.toFixed(2)} °F`
    currentTempInsert.style.color = '#b0c4b1'
    currentTempInsert.style.display = 'flex'
    currentTempInsert.style.justifyContent = 'center'
    currentTempInsert.style.alignItems = 'center'
    currentTempInsert.style.fontSize = 'x-large'
    currentTempInsert.style.padding = '15px'
    currentTempInsert.style.paddingTop = '25px'
    currentTempP.appendChild(currentTempInsert)

    let lowTempInsert = document.createElement("p")
    lowTempInsert.textContent = `${lowTemp.toFixed(2)} °F`
    lowTempHeading.appendChild(lowTempInsert)

    let highTempInsert = document.createElement("p")
    highTempInsert.textContent = `${highTemp.toFixed(2)} °F`
    highTempHeading.appendChild(highTempInsert)

    let forecastInsert = document.createElement("p")
    forecastInsert.textContent = `${forecast}`
    forecastInsert.style.paddingLeft = '8px'
    forecastHeading.appendChild(forecastInsert)

    let humidityInsert = document.createElement("p")
    humidityInsert.textContent = `${humidity}`
    humidityInsert.style.paddingLeft = '8px'
    humidityHeading.appendChild(humidityInsert)
 }