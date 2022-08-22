import "./navbar.scss"
import {ContactSupport, Menu} from "@mui/icons-material";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";

const Navbar = () => {

    const { dispatch } = useContext(SidebarContext)
    
    return (
        <div className="navbar">
            <div className="menu" onClick={() => dispatch({type:"TOGGLE"})} ><Menu /></div>
            <div className="support"><ContactSupport /></div>
        </div>
    )
}

export default Navbar