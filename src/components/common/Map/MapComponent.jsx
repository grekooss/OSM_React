import { useEffect, useState, useRef } from 'react';
import { API_URL, ROUTE_PLAY } from '../../../routes/Routes';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';

const parseCoordinates = (point) => {
  const matches = point.match(/POINT\(([^)]+)\)/);
  if (matches && matches[1]) {
    const [lon, lat] = matches[1].split(' ').map(Number);
    return [lat, lon];
  }
  return null;
};

const MapComponent = ({ center, zoom }) => {
  const [points, setPoints] = useState([]);

  const fetchPoints = () => {
    axios
      .get(`${API_URL}${ROUTE_PLAY}/`)
      .then((response) => {
        setPoints(
          response.data.map((point) => ({
            id: point.osm_id,
            position: parseCoordinates(point.way_center_point_wkt),
            sport: point.sport || 'Unknown Sport',
            leisure: point.leisure || 'Unknown Leisure',
            name: point.name || 'Unknown Name',
          })),
        );
      })
      .catch((error) => {
        console.error('Error fetching points:', error);
      });
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  const markerRefs = useRef([]);

  const handleMouseOver = (index) => {
    markerRefs.current[index].openPopup();
  };

  const handleMouseOut = (index) => {
    markerRefs.current[index].closePopup();
  };

  return (
    <div>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100vh', width: '100vw' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {points.map((point, index) => (
          <Marker
            key={index}
            position={point.position}
            ref={(ref) => (markerRefs.current[index] = ref)}
            eventHandlers={{
              mouseover: () => handleMouseOver(index),
              mouseout: () => handleMouseOut(index),
              click: () => handleMouseOver(index), // You can modify this if you want different behavior on click
            }}
          >
            <Popup>{point.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
