import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Login from "./pages/login/Login"
import Home from "./pages/home/Home"
import Retreat from "./pages/retreat/Retreat";
import { ReturnProduct } from "./pages/ReturnProduct";
import { ProductPage } from "./pages/ProductPage";

function App() {


  return (
    <div className={"app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="painel" >
              <Route index element={<Home />} />
              <Route path="retirar" element={<Retreat />} />
              <Route path="devolver" element={<ReturnProduct />} />
              <Route path="produto">
                <Route index element={<ProductPage />} />
              </Route>
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
