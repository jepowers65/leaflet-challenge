// Initialize map
let map = L.map("map").setView([37.0902, -95.7129], 5);

// Add a tile layer to the map
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={access_token}",
  {
    attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/light-v11",
    tileSize: 512,
    zoomOffset: -1,
    access_token: API_KEY,
  }
).addTo(map);

// Retrieve the earthquake data
d3.json(
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
).then((data) => {
  // Process the data and create markers
  data.features.forEach((quake) => {
    const { geometry, properties } = quake;
    const { coordinates } = geometry;
    const [longitude, latitude, depth] = coordinates;

    // Create a circle marker
    L.circleMarker([latitude, longitude], {
      radius: properties.mag ** 2,
      fillColor: getColor(depth),
      fillOpacity: 0.8,
      color: "#000",
      weight: 1,
    })
      .bindPopup(
        `Magnitude: ${properties.mag}<br>Location: ${properties.place}<br>Depth: ${depth} km`
      )
      .addTo(map);
  });

  // Create a legend for depth colors
  var myColors = [
    "#80ff00",
    "#bfff00",
    "#ffff00",
    "#ffbf00",
    "#ff8000",
    "#ff4000",
  ];
  // https://gis.stackexchange.com/questions/133630/adding-leaflet-legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend");
    labels = [
      "<div style='background-color: lightgray'><strong>&nbsp&nbspDepth (km)&nbsp&nbsp</strong></div>",
    ];
    categories = ["-10-10", " 10-30", " 30-50", " 50-70", " 70-90", "+90"];
    for (var i = 0; i < categories.length; i++) {
      div.innerHTML += labels.push(
        '<li class="circle" style="background-color:' +
          myColors[i] +
          '">' +
          categories[i] +
          "</li> "
      );
    }
    div.innerHTML =
      '<ul style="list-style-type:none; text-align: center">' +
      labels.join("") +
      "</ul>";
    return div;
  };

  legend.addTo(map);
});

// Function to determine the color based on the depth
function getColor(depth) {
  return depth < 10
    ? "#80ff00"
    : depth < 30
    ? "#bfff00"
    : depth < 50
    ? "#ffff00"
    : depth < 70
    ? "#ffbf00"
    : depth < 90
    ? "#ff8000"
    : "ff4000";
}
