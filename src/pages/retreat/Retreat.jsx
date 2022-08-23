import "./retreat.scss";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { CardPainel } from "../../components/cardPainel/CardPainel"
import { Engineering, PersonSearch, PlaylistAddCircle } from "@mui/icons-material"
import { TableRetreat } from "../../components/tableRetreat/TableRetreat"
import Btn from "../../components/btn/Btn"


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
                            <CardPainel title="Responsavel" type="select" image={<PersonSearch />} noHover={true} />
                            <TableRetreat />
                            <div className="button">
                                <Btn action={"Retirar"} color="dashboard" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Retreat