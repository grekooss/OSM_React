import { Route, Routes } from 'react-router-dom';
import {
  ROUTE_HOME,
  ROUTE_PLAY_PAGE,
  ROUTE_BIKE_PAGE,
  ROUTE_ABOUT_PAGE,
} from './Routes';

import Home from '../components/pages/Home/Home';

const ReactRouter = () => {
  return (
    <Routes>
      <Route path={ROUTE_HOME} element={<Home />} />
      <Route path={ROUTE_PLAY_PAGE} element={<Home />} />
      <Route path={ROUTE_BIKE_PAGE} element={<Home />} />
      <Route path={ROUTE_ABOUT_PAGE} element={<Home />} />
    </Routes>
  );
};

export default ReactRouter;
