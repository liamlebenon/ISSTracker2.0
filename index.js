// Get location of ISS
const apiUrl = 'https://api.wheretheiss.at/v1/satellites/25544';
console.log(apiUrl)
const getISS = async (apiUrl) => {
    const response = await fetch(apiUrl);
    co
};

getISS();

const map = L.map('mapid').setView([51.505, -0.09], 13);