(function() {
    const lat = document.querySelector('#lat').value || 27.4827347;
    const lng = document.querySelector('#lng').value || -109.9304027;
    const mapa = L.map('mapa').setView([lat, lng ], 14);
    let marker;

    //Utilizar provider y geocoder 
    const geocodeService = L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);


    //el pin
    marker = new L.marker([lat, lng], {
        draggable:true,
        autoPan: true,
    })
    .addTo(mapa)

    //detectar el movimiento del pin
    marker.on('moveend', function(e){
        marker = e.target 
        const position = marker.getLatLng()
        mapa.panTo(new L.latLng(position.lat, position.lng))

        //obtener la calle donde esta el pin 
        geocodeService.reverse().latlng(position, 14).run(function(error, result){
            marker.bindPopup(result.address.LongLabel)

            //llenar los campos ocultos
            document.querySelector('.calle').value = result?.address?.Address ?? '';
            document.querySelector('#street').value = result?.address?.Address ?? '';
            document.querySelector('#lat').value = result?.latlng?.lat ?? ''
            document.querySelector('#lng').value = result?.latlng?.lng ?? ''
        })
    })
})()