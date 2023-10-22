import MapComponent from '../../common/Map/MapComponent';

const Home = () => {
  const mapCenter = [52.3, 21.12];
  const mapZoom = 10;
  return <MapComponent center={mapCenter} zoom={mapZoom} />;
};

export default Home;
