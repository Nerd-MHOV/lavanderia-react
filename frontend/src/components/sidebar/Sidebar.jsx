import "./sidebar.scss"
import Logo from "../../assets/images/GP.png"
import {Link} from "react-router-dom";
import {
    AssignmentTurnedIn, Checkroom,
    Dashboard, Engineering, Error,
    Inventory, Logout, ShoppingBag, Tune, Menu
} from "@mui/icons-material";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";

const Sidebar = () => {

    const { activeSidebar } = useContext(SidebarContext);
    const { dispatch } = useContext(SidebarContext);
    const pathname = window.location.pathname


    return (
        <div className={activeSidebar ? "sidebar active" : "sidebar"}>
                <div className="navigation">
                    <span className="btnMenu" onClick={() => dispatch({type:"TOGGLE"})}><Menu /></span>
                    <ul>
                        <li>
                            <Link to="/" className="link" >
                                <span className="icon logo_peraltas">
                                    <img src={Logo} alt=""/>
                                </span>
                                <span className="title">Controle Lavanderia</span>
                            </Link>
                        </li>
                        <li className={(pathname === "/painel") ? "hovered" : ""} >
                            <Link to="/painel" className="link" >
                                <span className="icon"><Dashboard /></span>
                                <span className="title">Home</span>
                            </Link>
                        </li>
                        <li className={(pathname === "/painel/retirar") ? "hovered" : ""} >
                            <Link to="/painel/retirar" className="link" >
                                <span className="icon"><ShoppingBag /></span>
                                <span className="title">Retirar</span>
                            </Link>
                        </li>
                        <li className={(pathname === "/painel/devolver") ? "hovered" : ""} >
                            <Link to="/painel/devolver" className="link" >
                                <span className="icon"><AssignmentTurnedIn /></span>
                                <span className="title">Devolver</span>
                            </Link>
                        </li>
                        <li className={(pathname === "/painel/produto") ? "hovered" : ""}>
                            <Link to="/painel/produto" className="link" >
                                <span className="icon"><Checkroom /></span>
                                <span className="title">Produto</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="link" >
                                <span className="icon"><Engineering /></span>
                                <span className="title">Departamento</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="link" >
                                <span className="icon"><Error /></span>
                                <span className="title">Danificados</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="link" >
                                <span className="icon"><Inventory /></span>
                                <span className="title">Estoque</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="link" >
                                <span className="icon"><Tune /></span>
                                <span className="title">Painel</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="link" >
                                <span className="icon"><Logout /></span>
                                <span className="title">Sair</span>
                            </Link>
                        </li>
                    </ul>
                </div>
        </div>
    )
}

export default Sidebar