const MapIcon = ({ posRight, iconSrc, onClick, sportParam }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        right: posRight,
        zIndex: 1000,
        cursor: 'pointer',
      }}
      onClick={() => onClick(sportParam)}
    >
      <img
        src={iconSrc}
        alt="Map Icon"
        style={{ width: '30px', height: '30px' }}
      />
    </div>
  );
};

export default MapIcon;
