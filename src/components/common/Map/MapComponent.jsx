import { useState, useRef } from 'react';
import { API_URL, ROUTE_PLAY } from '../../../routes/Routes';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import EditPoint from '../EditPoint/EditPoint';
import NewPoint from '../NewPoint/NewPoint';
import MapIcon from '../MapIcon/MapIcon';
import axios from 'axios';

import mapIconSoccer from '../../../../public/vite.svg';
import mapIconSkateboard from '../../../../public/vite.svg';

const MapComponent = ({ center, zoom }) => {
  const [points, setPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);

  console.log(points);

  const fetchPoints = (sportParam) => {
    const params = sportParam ? { sport: sportParam } : {};
    axios
      .get(`${API_URL}${ROUTE_PLAY}/`, { params })
      .then((response) => {
        setPoints(
          response.data.map((point) => ({
            id: point.id,
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

  const parseCoordinates = (point) => {
    const matches = point.match(/POINT\(([^)]+)\)/);
    if (matches && matches[1]) {
      const [lon, lat] = matches[1].split(' ').map(Number);
      return [lat, lon];
    }
    return null;
  };

  const markerRefs = useRef([]);

  const handleMouseOver = (index) => {
    markerRefs.current[index].openPopup();
  };

  const handleMouseOut = (index) => {
    markerRefs.current[index].closePopup();
  };

  const handleEdit = (index) => {
    setSelectedPoint(points[index]);
  };

  const handleSaveEdit = (newSport, newLeisure) => {
    const updatedPoints = points.map((point) =>
      point.id === selectedPoint.id
        ? {
            ...point,
            sport: newSport || 'Unknown Sport',
            leisure: newLeisure || 'Unknown Leisure',
          }
        : point,
    );

    setPoints(updatedPoints);
    setSelectedPoint(null);
  };

  const handleCancelEdit = () => {
    setSelectedPoint(null);
  };

  const handleDeletePoint = () => {
    setPoints((prevPoints) =>
      prevPoints.filter((point) => point.id !== selectedPoint.id),
    );
    setSelectedPoint(null);
  };

  const handleAddPoint = (newPoint) => {
    setPoints((prevPoints) => [...prevPoints, newPoint]);
  };

  const handleIconClick = (sportParam) => {
    fetchPoints(sportParam);
  };

  return (
    <div>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100vh', width: '100vw' }}
      >
        <NewPoint onAddPoint={handleAddPoint} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapIcon
          iconSrc={mapIconSoccer}
          onClick={() => handleIconClick('soccer')}
          sportParam="soccer"
          posRight={'40px'}
        />
        <MapIcon
          iconSrc={mapIconSkateboard}
          onClick={() => handleIconClick('skateboard')}
          sportParam="skateboard"
          posRight={'80px'}
        />
        {points.map((point, index) => (
          <Marker
            key={index}
            position={point.position}
            ref={(ref) => (markerRefs.current[index] = ref)}
            eventHandlers={{
              mouseover: () => handleMouseOver(index),
              mouseout: () => handleMouseOut(index),
              click: () => handleEdit(index),
            }}
          >
            <Popup>
              <div>
                <p>{point.name}</p>
                <p>Sport: {point.sport}</p>
                <p>Leisure: {point.leisure}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        {selectedPoint && (
          <Marker position={selectedPoint.position}>
            <Popup>
              <div>
                <p>{selectedPoint.name}</p>
                <EditPoint
                  initialSport={selectedPoint.sport}
                  initialLeisure={selectedPoint.leisure}
                  onSave={(newSport, newLeisure) =>
                    handleSaveEdit(newSport, newLeisure)
                  }
                  onCancel={handleCancelEdit}
                  pointId={selectedPoint.id}
                  onDelete={handleDeletePoint}
                />
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
