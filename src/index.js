import icon from '../images/icon-location.svg'

const searchInput = document.querySelector('.search-bar__input');
const formButton = document.querySelector('.search-bar__btn');
const ip = document.getElementById('ip');
const location = document.getElementById('location');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');


async function getLocation() {
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_e3KTqDdySXyouOVm5F6bQ9f60INnf&ipAddress=${searchInput.value}`)
    const data = response.json();
    return data
}
const map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 13
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
})


function printLocationData() {
    getLocation()
        .then(value => {
            console.log(value);
            ip.textContent = value.ip;
            location.textContent = `${value.location.city} ${value.location.country}`;
            timezone.textContent = parseFloat(value.location.timezone);
            isp.textContent = value.isp;
            map.setView([value.location.lat, value.location.lng])
            L.marker([value.location.lat, value.location.lng], { icon: markerIcon }).addTo(map);
        })


    clearForm()
}


formButton.addEventListener('click', printLocationData);

function clearForm() {
    searchInput.value = '';
    searchInput.textContent = ''
}
