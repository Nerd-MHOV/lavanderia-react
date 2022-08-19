import "./navbar.scss"
import {ContactSupport, Menu} from "@mui/icons-material";

const Navbar = () => {
    
    return (
        <div className="navbar">
            <div className="menu"><Menu /></div>
            <div className="support"><ContactSupport /></div>
        </div>
    )
}

export default Navbar