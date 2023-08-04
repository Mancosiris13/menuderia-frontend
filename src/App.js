import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useReactToPrint } from 'react-to-print';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Routes,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import Roles from './components/Roles';
import Ordenes from './components/ordenes/Ordenes';
import Caja from './components/caja/Caja';
import AddProductsToExistingOrder from './components/ordenes/AddProductsToExistingOrders';
import DisplayOnlyTacos from './components/caja/tacos/DisplayOnlyTacos';
import DisplayOnlyMenudos from './components/caja/menudos/DisplayOnlyMenudos';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Roles />} />
          <Route path="/ordenes" element={<Ordenes />} />
          <Route path="/caja" element={<Caja />} />
          <Route path="/tacos" element={<DisplayOnlyTacos />} />
          <Route path="/menudos" element={<DisplayOnlyMenudos />} />
          <Route
            path="/addProductToOrder"
            element={<AddProductsToExistingOrder />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
