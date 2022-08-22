import "./retreat.scss";
import Sidebar from "../../componets/sidebar/Sidebar"
import Navbar from "../../componets/navbar/Navbar"
import { CardPainel } from "../../componets/cardPainel/CardPainel";
import { Engineering, PersonSearch, PlaylistAddCircle } from "@mui/icons-material"


const Retreat = () => {
    return (
        <div className="retreat">
            <Sidebar />
            <div className="retreatBx">
                <Navbar />
                <div className="container">
                    <div className="top">
                        <CardPainel title="Departamento" image={<Engineering />} type="select" />
                        <CardPainel title="Colaborador" image={<PersonSearch />} type="select" />
                        <CardPainel title="Retiradas" image={<PlaylistAddCircle />} type="number" />
                    </div>
                    <div className="bottom">
                        <div className="table">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Retreat