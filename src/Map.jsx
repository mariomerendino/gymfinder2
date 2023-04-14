import React, { useEffect, useState } from "react";

const Map = ({ coords }) => {
  const [map, setMap] = useState(null);
  const [gyms, setgyms] = useState([]);

  const GoogleMapsApis = window?.google?.maps;

  const setupMap = () => {};

  useEffect(() => {
    // Create a new Google Maps instance
    const googleMap = new GoogleMapsApis.Map(document.getElementById("map"), {
      center: { lat: coords.latitude, lng: coords.longitude },
      zoom: 15,
    });

    // Find the nearest gyms using the Places API
    const placesService = new GoogleMapsApis.places.PlacesService(googleMap);
    placesService.nearbySearch(
      {
        location: {
          lat: coords.latitude,
          lng: coords.longitude,
        },
        radius: 1000,
        name: ["gym"],
      },
      (results, status) => {
        console.log(status);
        if (status === "OK") {
          setgyms(results.slice(0, 10));
        }
      }
    );

    // Center the map on the user's location
    googleMap.setCenter({
      lat: coords.latitude,
      lng: coords.longitude,
    });
    setMap(googleMap);
  }, []);

  useEffect(() => {
    // Create markers for each gym
    gyms.forEach((gym) => {
      const marker = new GoogleMapsApis.Marker({
        position: gym.geometry.location,
        map: map,
        title: gym.name,
      });
      var infowindow = new google.maps.InfoWindow({
        content: gym.name,
      });
      marker.addListener("click", function () {
        infowindow.open(map, marker);
      });
    });
  }, [gyms, map]);

  return <div id="map" style={{ height: "500px" }}></div>;
};

export default Map;
