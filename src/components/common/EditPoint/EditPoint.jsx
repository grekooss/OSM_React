import { useState } from 'react';
import axios from 'axios';
import { API_URL, ROUTE_PLAY } from '../../../routes/Routes';

const EditPoint = ({
  initialSport,
  initialLeisure,
  onSave,
  onCancel,
  pointId,
  onDelete,
}) => {
  const [sport, setSport] = useState(initialSport);
  const [leisure, setLeisure] = useState(initialLeisure);

  const handleSave = async () => {
    onSave(sport, leisure);

    try {
      await axios.patch(`${API_URL}${ROUTE_PLAY}/${pointId}`, {
        sport,
        leisure,
      });
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}${ROUTE_PLAY}/${pointId}`);
      onDelete();
    } catch (error) {
      console.error('Error deleting marker:', error);
    }
  };

  return (
    <div>
      <label>
        Sport:
        <input
          type="text"
          value={sport}
          onChange={(e) => setSport(e.target.value)}
        />
      </label>
      <br />
      <label>
        Leisure:
        <input
          type="text"
          value={leisure}
          onChange={(e) => setLeisure(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={handleDelete}>Delete Marker</button>
    </div>
  );
};

export default EditPoint;
