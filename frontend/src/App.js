import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Login from "./pages/login/Login"
import Home from "./pages/home/Home"
import Retreat from "./pages/retreat/Retreat";
import { ReturnProduct } from "./pages/ReturnProduct";
import { ProductPage } from "./pages/ProductPage";
import { PrivateRoute } from "./pages/PrivateRoute";
import RetreatLegacy from "./pages/retreatLegacy/RetreatLegacy";
import { CollaboratorsPage } from "./pages/CollaboratorsPage/CollaboratorsPage";


function App() {

  return (
    <div className={"app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="painel" >
              <Route index element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="retirar" element={<PrivateRoute><Retreat /></PrivateRoute>} />
              <Route path="retirarmanual" element={<PrivateRoute><RetreatLegacy /></PrivateRoute>} />
              <Route path="devolver" element={<PrivateRoute><ReturnProduct /></PrivateRoute>} />
              <Route path="produto" element={<PrivateRoute><ProductPage /></PrivateRoute>} />
              <Route path="colaborador" element={<PrivateRoute><CollaboratorsPage /></PrivateRoute>} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
