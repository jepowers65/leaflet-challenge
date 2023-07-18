let map = null;
let earthquake = null;
// Create a function that will run for each feature in the features array.

function createFeatures(earthquakeData) {
  // Give each feature a popup describing the place and time of the earthquakes
  function onEachFeature(feature, layer) {
    layer.bindPopup(
      `<h3>Where: ${feature.properties.place}</h3><hr><p>Time: ${new Date(
        feature.properties.time
      )}</p><hr><p>Magnitude: ${
        feature.properties.mag
      }</p><hr><p>Number of "Felt" Reports: ${feature.properties.felt}`
    );
  }
  earthquake = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
  });
  createMap(earthquake);
}

// Create Map

function createMap(earthquakes) {
  let streetstylemap = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: "outdoors-v11",
      accessToken: API_KEY,
    }
  );
  map = L.map("map", {
    center: [39.8282, -98.5795],
    zoom: 11,
    layers: [streetstylemap, earthquakes],
  });
  console.log(map);
}

d3.json(
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
).then(function (data) {
  console.log(data);
  createFeatures(data);
});
