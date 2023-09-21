let canvas = document.querySelector("canvas");

let chart



navigator.geolocation.getCurrentPosition(
    function (event)
    {
        let latitudineUtente = event.coords.latitude
        let longitudineUtente = event.coords.longitude
        console.log(latitudineUtente)
        console.log(longitudineUtente)
        console.log(event.coords.longitude)
        console.log("l'utente ha accettato")
        document.querySelector("#lat").value = latitudineUtente
        document.querySelector("#lng").value = longitudineUtente
        
        createMap(latitudineUtente,longitudineUtente)
    },
    function (event)
    {
        console.log("l'utente non ha accettato")
        createMap(20, -1)
    }
)

function createMap (lat, lng)
{
    var map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let marker = L.marker([lat,lng]).addTo(map);

    map.on("click", function(e) {
        console.log(e)

        var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)

        document.querySelector("#lat").value = e.latlng.lat
        document.querySelector("#lng").value = e.latlng.lng 
    })
}


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
        if(chart != undefined){
            chart.destroy()
        }
        console.log(data.hourly.time)
        console.log(data.hourly.temperature_2m)

        let dates = []
        let temp = []
        let humid = []

        let config = {
            type: 'line',
            data: 
            {
                labels: data.hourly.time,
                datasets: 
                [
                    {
                        label: 'Temperatura a 2m',
                        data: data.hourly.temperature_2m,
                        fill: false,
                        borderColor: 'rgb(255, 0, 0)',
                        tension: 0.1,
                        yAxisID: "y1"
                    },
                    {
                        label: 'Umidità a 2m',
                        data: data.hourly.relativehumidity_2m,
                        fill: false,
                        borderColor: 'rgb(0, 0, 255)',
                        tension: 0.1,
                        yAxisID: "y2"
                    }
                ]
            },
            options:
            {
                scales:
                {
                    y1:
                    {
                        type: "linear",
                        display: true,
                        position: "left"
                    },

                    y2:
                    {
                        type: 'linear',
                        display: true,
                        position: 'right',
                    }
                }
            }
          };
          canvas.classList.remove("d-none");

          chart = new Chart (canvas, config);

    })
})
