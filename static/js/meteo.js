var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.on("click", function(e) {
    console.log(e)

    var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)

    let latitudine = document.querySelector("#lat").value = e.latlng.lat
    let longitudine = document.querySelector("#lng").value = e.latlng.lng 
})


document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault()
    let latitudine = document.querySelector("#lat").value
    let longitudine = document.querySelector("#lng").value

    console.log(latitudine, longitudine)

    let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitudine}&longitude=${longitudine}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_10m`


    console.log(url)

    fetch(url).then(function (resp) {
        return resp.json()
    }).then(function (data) {
        console.log(data.hourly.time)
        console.log(data.hourly.temperature_2m)
    })
})