import './App.css';
import { BrowserRouter } from 'react-router-dom';
import ReactRouter from './routes/ReactRouter';
import AppNavBar from './components/common/NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <BrowserRouter>
    <AppNavBar />
    <ReactRouter />
  </BrowserRouter>
);

export default App;
