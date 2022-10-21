import "./sidebar.module.scss"
import Logo from "../../assets/images/GP.png"
import Link from "next/link";
import { useRouter } from "next/router"

import {
    AssignmentTurnedIn, Checkroom,
    Dashboard, Engineering, Error,
    Inventory, Logout, ShoppingBag, Tune, Menu
} from "@mui/icons-material";
import { useContext, useEffect } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import { AuthContext } from "../../context/authContext";


const Sidebar = () => {

    const { activeSidebar } = useContext(SidebarContext);
    const { dispatch } = useContext(SidebarContext);

    const router = useRouter()
    const pathname = router.asPath;

    const auth = useContext(AuthContext)

    useEffect(() => {
        const token = localStorage.getItem('authToken')
    }, [])

    async function handleLogout() {
        await auth.logout(token)
    }

    return (
        <div className={activeSidebar ? "sidebar active" : "sidebar"}>
                <div className="navigation">
                    <span className="btnMenu" onClick={() => dispatch({type:"TOGGLE"})}><Menu /></span>
                    <ul>
                        <li>
                            <Link href="/outro" className="link" >
                                <a>
                                <span className="icon logo_peraltas">
                                    <img src={Logo} alt=""/>
                                </span>
                                <span className="title">Controle Lavanderia</span>
                                </a>
                            </Link>
                        </li>
                        <li className={(pathname === "/painel") ? "hovered" : ""} >
                            <Link href="/painel" className="link" >
                                <a>
                                <span className="icon"><Dashboard /></span>
                                <span className="title">Home</span>
                                </a>
                            </Link>
                        </li>
                        <li className={(pathname === "/painel/retirar") ? "hovered" : ""} >
                            <Link href="/painel/retirar" className="link" >
                                <a>
                                <span className="icon"><ShoppingBag /></span>
                                <span className="title">Retirar</span>
                                </a>
                            </Link>
                        </li>
                        <li className={(pathname === "/painel/devolver") ? "hovered" : ""} >
                            <Link href="/painel/devolver" className="link" >
                                <a>
                                <span className="icon"><AssignmentTurnedIn /></span>
                                <span className="title">Devolver</span>
                                </a>
                            </Link>
                        </li>
                        <li className={(pathname === "/painel/produto") ? "hovered" : ""}>
                            <Link href="/painel/produto" className="link" >
                                <a>
                                <span className="icon"><Checkroom /></span>
                                <span className="title">Produto</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/painel/departamento" className="link" >
                                <a>
                                <span className="icon"><Engineering /></span>
                                <span className="title">Departamento</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/painel/danificados" className="link" >
                                <a>
                                <span className="icon"><Error /></span>
                                <span className="title">Danificados</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/painel/estoque" className="link" >
                                <a>
                                <span className="icon"><Inventory /></span>
                                <span className="title">Estoque</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/painel/controle" className="link" >
                                <a>
                                <span className="icon"><Tune /></span>
                                <span className="title">Painel</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/login" className="link" onClick={handleLogout} >
                                <a>
                                <span className="icon"><Logout /></span>
                                <span className="title">Sair</span>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
        </div>
    )
}

export default Sidebar
