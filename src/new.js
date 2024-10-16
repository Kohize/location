import 'babel-polyfill';
import { validateIp, getAddress, } from './helpers'
import icon from '../images/icon-location.svg';


const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');
const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
})

const mapArea = document.querySelector('.map');

const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13,
});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
L.marker([51.505, -0.09], { idon: markerIcon }).addTo(map);

function getData() {
    if (validateIp(ipInput.value)) {
        getAddress(ipInput.value)
            .then(data => setInfo(data))
    }

}

function handleKey(e) {
    if (e.key === 'Enter') {
        getData();
    }
}

function setInfo(mapData) {
    const { lat, lng, country, region, timezone } = mapData.location
    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = country + ' ' + region;
    timezoneInfo.innerText = timezone;
    ispInfo.innerText = mapData.isp;
    map.setView([lat, lng])
    L.marker([lat, lng], { icon: markerIcon }).addTo(map);

    addOffset(map);
}

document.addEventListener('DOMContentLoaded', () => {
    if (matchMedia('(max-width: 1023px)').matches)
        getAddress('102.22.22.1')
            .then(setInfo);
})
