import MapComponent from '../../common/Map/MapComponent';

const Home = () => {
  const mapCenter = [51.8, 19.17];
  const mapZoom = 6;
  return <MapComponent center={mapCenter} zoom={mapZoom} />;
};

export default Home;
