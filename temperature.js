const searchField = document.getElementById('search-field');
const apiKey = '7686a7f76505e701cb1585cf85fd8f35';

getLocation();
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => displayWeather(data))
}

const loadData = () => {
    if (searchField.value === '') {
        alert('Please Enter a city to get Weather info ...')
    } else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchField.value}&appid=${apiKey}&units=metric`)
            .then(res => res.json())
            .then(data => displayWeather(data))
        searchField.value = '';
    }
}
const setInnerText = (id, text) => document.getElementById(id).innerText = text;
const displayWeather = info => {
    // console.log(info);
    if (info.cod === "404") {
        alert("Your City isn't found");
    } else {
        setInnerText('city-name', info.name);
        setInnerText('temperature', info.main.temp);
        setInnerText('clouds', info.weather[0].main);
        document.getElementById('icon').src = `http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`;
    }
}