import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Login from "./pages/login/Login"
import Home from "./pages/home/Home"
import Retreat from "./pages/retreat/Retreat";
import { ReturnProduct } from "./pages/ReturnProduct";

function App() {


  return (
    <div className={"app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="painel" >
              <Route index element={<Home />} />
              <Route path="/painel/retirar" element={<Retreat />} />
              <Route path="/painel/devolver" element={<ReturnProduct />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
