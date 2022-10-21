import "./retreat.scss";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { CardPainel } from "../../components/cardPainel/CardPainel"
import { Engineering, PersonSearch, PlaylistAddCircle } from "@mui/icons-material"
import { TableRetreat } from "../../components/tableRetreat/TableRetreat"
import Btn from "../../components/btn/Btn"
import { useApi } from "../../hooks/api";
import { useState } from "react";
import { useEffect } from "react";


const Retreat = () => {
    const api = useApi();
    const [departments, setDepartments] = useState([])
    const [collaborators, setCollaborators] = useState([])
    const [count, setCount] = useState(0)
    const ldepart = [];
    let lcollab = [];


    useEffect(() => {
        getDepartments()
    }, [])

    const getDepartments = async () => {
        const api_response = await api.department();
        setDepartments(api_response)
    }

    departments.filter(async el => {
        await ldepart.push({ value: el.id, label: el.department })
    })

    const handleMore = async () => {
        setCount(count + 1)
    }

    const handleLess = async () => {
        if( count !== 0 && count !== 0) {
            setCount(count - 1)
        }
    }


    const handleDepartment = async (e) => {
        console.log(e.value)
        await departments.filter(async el => {
            if (el.id === e.value) {
                lcollab = el.collaborator;
            }
        })
        setCollaborators(()=>{
            return lcollab.map(e=>{
                return {value: e.id, label: e.collaborator}
            })
        })

        console.log(collaborators)
    };



    return (
        <div className="retreat">
            <Sidebar />
            <div className="retreatBx">
                <Navbar />
                <div className="container">
                    <div className={`top ${(count) ? 'tableOn' : ''}`}>
                        <CardPainel onChange={handleDepartment} options={ldepart} title="Departamento" image={<Engineering />} type="select" />
                        <CardPainel options={collaborators} title="Colaborador" image={<PersonSearch />} type="select" />
                        <CardPainel more={handleMore} less={handleLess} num={count} title="Retiradas" image={<PlaylistAddCircle />} type="number" />
                    </div>
                    {(!!count) && <div className="bottom">
                        <div className="table">
                            <CardPainel title="Responsavel" type="select" image={<PersonSearch />} noHover={true} />
                            <TableRetreat />
                            <div className="button">
                                <Btn action={"Retirar"} color="dashboard" />
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Retreat