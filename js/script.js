//fonte: http://dati.lazio.it/catalog/it/dataset/radioattivita-ambientale
var url = "http://dati.lazio.it/catalog/api/action/datastore_search?resource_id=0159166e-d5c2-400d-a539-c0d3c7d2d2f4";

$.getJSON(url, function(data){

    //implemento leaflet
	var mymap = L.map('mapid').setView([41.532575, 12.293965], 7);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 25,
		id: 'mapbox.streets',
        setMinZoom: 5
	}).addTo(mymap);

	//All'interno del json prendo i valori in base alla posizione dell'oggetto
    for (i = 0; i < data.result.records.length; i++){
		var json = data.result.records[i];
		var radioValue = [Object.values(json)[6]];
		var marValue = [Object.values(json)[8]];
		var activityValue = [Object.values(json)[4]];
        
        //Prendo solo i valori senza segno 
		if(radioValue == "K-40" && marValue == ""){
            //"Aggiusto" la scrittura delle coordinate, mantenendo il primo punto ed eliminando i successivi con il metido replace
            var indexFirstDotLat = json.Latitudine.indexOf(".");
            var indexFirstDotLong = json.Longitudine.indexOf(".");

            var latWithoutDot = json.Latitudine.replace(/\./g, '');
            var longWithoutDot = json.Longitudine.replace(/\./g, '');

            var latCorrect = [latWithoutDot.slice(0,indexFirstDotLat), ".", latWithoutDot.slice(indexFirstDotLat)].join('');
            var longCorrect = [longWithoutDot.slice(0,indexFirstDotLong), ".", longWithoutDot.slice(indexFirstDotLong)].join(''); 
            L.marker([latCorrect, longCorrect]).addTo(mymap).bindPopup("<b>Attività:</b><br/>"+activityValue);
		}
	}

	var popup = L.popup();
});