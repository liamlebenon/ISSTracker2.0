// Set up map
const map = L.map('mapid').setView([0, 0], 3);
const attribution = 
'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map)

// Helper for rounding data
const roundToTwo = (number) => {
    return Math.round(number * 100) / 100
}

// Set up marker
const issIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/International_Space_Station.svg/1200px-International_Space_Station.svg.png',
    iconSize: [75, 45],
    iconAnchor: [25, 16]
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);

// Get ISS location
let firstLoad = true;

const getISS = async () => {
    const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
    const json = await response.json();
    const { latitude, longitude, velocity, altitude } = json;
    
    marker.setLatLng([latitude, longitude]);

    if (firstLoad) {
        map.setView([latitude, longitude], 6);
        firstLoad = false;
    }
    // Return ISS details to user
    document.getElementById('lat').textContent = roundToTwo(latitude);
    document.getElementById('long').textContent = roundToTwo(longitude);
    document.getElementById('vel').textContent = roundToTwo(velocity);
    document.getElementById('alt').textContent = roundToTwo(altitude);
};

getISS();
setInterval(getISS, 4000);