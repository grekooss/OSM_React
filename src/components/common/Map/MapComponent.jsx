import { useEffect, useState } from 'react';
import { API_URL, ROUTE_PLAY } from '../../../routes/Routes';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';

const MapComponent = ({ center, zoom }) => {
  const [points, setPoints] = useState([]);
  const [editingPoint, setEditingPoint] = useState(null);
  const [editedSport, setEditedSport] = useState('');
  const [editedLeisure, setEditedLeisure] = useState('');

  const fetchPoints = () => {
    axios
      .get(`${API_URL}${ROUTE_PLAY}/`)
      .then((response) => {
        setPoints(
          response.data.map((point) => ({
            id: point.osm_id,
            position: point.way_center_point_wkt
              .match(/POINT\(([^)]+)\)/)[1]
              .split(' ')
              .map((coord) => parseFloat(coord)),
            sport: point.sport || 'Unknown Sport',
            leisure: point.leisure || 'Unknown Leisure',
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

  const handleEditClick = (point) => {
    setEditingPoint(point.id);
    setEditedSport(point.sport);
    setEditedLeisure(point.leisure);
  };

  const handleSaveClick = () => {
    const updatedPoints = points.map((point) =>
      point.id === editingPoint
        ? { ...point, sport: editedSport, leisure: editedLeisure }
        : point,
    );

    axios
      .put(`${API_URL}${ROUTE_PLAY}/${editingPoint}`, {
        sport: editedSport,
        leisure: editedLeisure,
      })
      .then((response) => {
        console.log('Point updated successfully:', response.data);
        setPoints(updatedPoints);
      })
      .catch((error) => {
        console.error('Error updating point:', error);
      });

    setEditingPoint(null);
  };

  const handleCancelClick = () => {
    setEditingPoint(null);
  };

  const handleDeleteClick = (pointId) => {
    axios
      .delete(`${API_URL}${ROUTE_PLAY}/${pointId}`)
      .then((response) => {
        console.log('Point deleted successfully:', response.data);
        setPoints((prevPoints) =>
          prevPoints.filter((point) => point.id !== pointId),
        );
      })
      .catch((error) => {
        console.error('Error deleting point:', error);
      });
  };

  return (
    <div>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {points.map((point, index) => (
          <Marker key={index} position={point.position}>
            <Popup>
              {editingPoint === point.id ? (
                <div>
                  <label>
                    Sport:
                    <input
                      type="text"
                      value={editedSport}
                      onChange={(e) => setEditedSport(e.target.value)}
                    />
                  </label>
                  <br />
                  <label>
                    Leisure:
                    <input
                      type="text"
                      value={editedLeisure}
                      onChange={(e) => setEditedLeisure(e.target.value)}
                    />
                  </label>
                  <br />
                  <button onClick={handleSaveClick}>Save</button>
                  <button onClick={handleCancelClick}>Cancel</button>
                </div>
              ) : (
                <div>
                  <p>{`Sport: ${point.sport}`}</p>
                  <p>{`Leisure: ${point.leisure}`}</p>
                  <button onClick={() => handleEditClick(point)}>
                    Edit Point
                  </button>
                  <button onClick={() => handleDeleteClick(point.id)}>
                    Delete Point
                  </button>
                </div>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
