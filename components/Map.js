import { StyleSheet, View } from 'react-native';
import React, { useRef, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import { MAPS_API_KEY } from "@env";
import { selectOrigin, selectDestination, setTravelTimeInfo } from '../slices/navSlice';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
const dispatch=useDispatch()
  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;
    
    const getTravelTime = async () => {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${MAPS_API_KEY}`);
        const data = await response.json();
        dispatch(setTravelTimeInfo(data.rows[0].elements[0]))
      } catch (error) {
        console.error('Error fetching travel time:', error);
      }
    };
    
    getTravelTime();
  }, [origin, destination, MAPS_API_KEY]);

  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      mapType='mutedStandard'
      initialRegion={{
        latitude: origin?.location.lat || 0,
        longitude: origin?.location.lng || 0,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={MAPS_API_KEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
