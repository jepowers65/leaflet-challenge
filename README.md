# Leaflet-challenge

![Alt text](1-Logo.png)
<br>

## Background

#### The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

#### The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

<br>

#### This project is a web application that uses Leaflet, a JavaScript library for interactive maps, to display real-time earthquake data from the United States Geological Survey (USGS). The application fetches earthquake data in GeoJSON format from the USGS API and visualizes it on an interactive map. Each earthquake is represented by a circle marker on the map, with the size of the marker indicating the magnitude of the earthquake and the color representing its depth. Clicking on a marker displays a popup with additional information about the earthquake, including the location, magnitude, and depth.

#### This project demonstrates the integration of Leaflet, D3, and JavaScript to create an interactive data visualization. It showcases the power and flexibility of Leaflet for building compelling map-based applications.

## Requirements

- Use USGS GeoJSON Feed data to visualize earthquakes on a map
- Represent magnitude of earthquakes by size and depth by color on the data markers
- Add popups with additional information about earthquakes when markers are clicked
- Create a legend to provide context for the map data
