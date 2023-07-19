let map = null;

d3.json(
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
).then(function (data) {
  console.log(data);
  createFeatures(data.features);
});
function createFeatures(Data) {
  // Create a function that will run for each feature in the features array.
  function onEachFeature(Data) {
    // Give each feature a popup describing the place and time of the earthquakes
    function onEachFeature(feature, layer) {
      layer.bindPopup(
        "<h3> Where: " +
          feature.properties.place +
          "</h3><hr><p>" +
          new Date(feature.properties.time) +
          "</p>" +
          "<br><h2> Magnitude: " +
          feature.properties.mag +
          "</h2>"
      );
    }
  }
}
// Create a GeoJSON layer containing the features array on the earthquakeData object
function createCircleMarker(feature, latlng) {
  let options = {
    radius: markerSize(feature.properties.mag),
    fillColor: chooseColor(feature.geometry.coordinates[2]),
    fillOpacity: 0.7,
    color: "black",
    stroke: true,
    weight: 0.5,
  };
  return L.circleMarker(latlng, options);
}
let earthquakes = L.geoJSON(Data, {
  onEachFeature: onEachFeature,
  // Point to layer used to alter markers
  pointToLayer: createCircleMarker,
});

// Add legend
let legend = L.control({ position: "bottomright" });

legend.onAdd = function (map) {
  let div = L.DomUtil.create("div", "info legend"),
    grades = [1.0, 2.5, 4.0, 5.5, 8.0],
    labels = [];

  // loop through density intervals
  for (let i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' +
      chooseColor(grades[i] + 1) +
      '"></i> ' +
      grades[i] +
      (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
  }
  return div;
};

// Create Map
function createMap(earthquakes) {
  // Define outdoors and graymap layers
  let streetstylemap = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: "outdoors-v10",
      accessToken: API_KEY,
    }
  ).addTo(map);

  let graymap = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: "light-v10",
      accessToken: API_KEY,
    }
  );

  // Define a baseMaps object to hold our base layers
  let baseMaps = {
    "Street Map": streetstylemap,
    "Gray Map": graymap,
  };

  // Create overlay object to hold our overlay layer
  let overlayMaps = {
    Earthquakes: earthquakes,
  };
  // Create our map, giving it the streetmap and earthquakes layers to display on load
  let Map = L.map("map", {
    center: [39.8282, -98.5795],
    zoom: 4,
    layers: [streetstylemap, earthquakes],
  });
  // Add the layer control to the map
  L.control
    .layers(baseMaps, overlayMaps, {
      collapsed: false,
    })
    .addTo(Map);
  legend.addTo(Map);
}
