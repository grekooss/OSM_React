import { useState } from 'react';
import { Popup } from 'react-leaflet';

const CustomPopup = ({ point, onSave, onCancel, onDelete }) => {
  const [editedSport, setEditedSport] = useState(point.sport);
  const [editedLeisure, setEditedLeisure] = useState(point.leisure);

  const handleSaveClick = () => {
    onSave(editedSport, editedLeisure);
  };

  return (
    <Popup>
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
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </Popup>
  );
};

export default CustomPopup;
