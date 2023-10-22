import { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import { API_URL, ROUTE_PLAY } from '../../../routes/Routes';

const NewPoint = ({ onAddPoint }) => {
  const [position, setPosition] = useState(null);

  const handleAddPoint = async () => {
    if (position) {
      // Wysyłanie nowego punktu przez axios
      try {
        const response = await axios.post(`${API_URL}${ROUTE_PLAY}/`, {
          amenity: null,
          landuse: null,
          leisure: 'pitch',
          sport: 'skateboard',
          name: 'Unknown Name',
          way_center_point_wkt: `POINT(${position[1]} ${position[0]})`,
        });

        const newPoint = {
          id: response.data.id,
          position,
          sport: 'skateboard',
          leisure: 'pitch',
          name: 'Unknown Name',
        };

        onAddPoint(newPoint);
        setPosition(null);
      } catch (error) {
        console.error('Błąd podczas wysyłania nowego punktu:', error);
      }
    }
  };

  useMapEvents({
    dblclick: (event) => {
      const { latlng } = event;
      setPosition([latlng.lat, latlng.lng]);
    },
  });

  return (
    <>
      {position && (
        <Marker position={position}>
          <Popup>
            <div>
              <p>Nowy punkt</p>
              <button onClick={handleAddPoint}>Dodaj punkt</button>
            </div>
          </Popup>
        </Marker>
      )}
    </>
  );
};

export default NewPoint;
