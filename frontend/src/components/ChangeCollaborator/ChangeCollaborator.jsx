import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/api";



const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];


export const ChangeCollaborator = ({ params }) => {

    const api = useApi();
    const [rowsTable, setRowsTable] = useState([]);


    const columns = [
        { field: 'type', headerName: 'Tipo'},
        { field: 'product', headerName: 'Produto', width: 150},
        { field: 'service', headerName: 'Oficio', width: 150},
        { field: 'size', headerName: 'Tamanho'},
        { field: 'date', headerName: 'Data'},
        { field: 'validate', headerName: 'Validade', renderCell: (params) => 
            <strong>
                <button />
            </strong>
        },
    ];
    

    const getCollaborator = async (id) => {
        const response = await api.retreatCollaborator(id)
        if(response.debit)
            makeLines(response.debit)

        console.log(response.debit)
    }

    const makeLines = async (arrayLine) => {
        const arrLines = await arrayLine.map(el => {
            let dateUpdated = new Date(el.product.updatedAt)
            
            return {
                id: el.id,
                type: el.product.type.type,
                product: el.product.product,
                service: el.product.service.service,
                date: ((dateUpdated.getDate() + " " + meses[(dateUpdated.getMonth())] + " " + dateUpdated.getFullYear())),
                validate: el.product.validate,
            }
        })

        console.log("ARRLINES", arrLines)
        setRowsTable(arrLines);
    }


    useEffect(() => {

        getCollaborator(params.id);
    }, [])


    return (
        <div className="change_collaborator" style={{width: '98%'}}>
            <div className="changes">
                
            </div>
            <div className="retreats" >
                <h3>Retiradas:</h3>
                <br />
                {
                    rowsTable ?
                    <div style={{ width: '100%' }}>
                    <DataGrid
                        rows={rowsTable}
                        columns={columns}
                        autoHeight
                        checkboxSelection
                    />
                </div>
                : <h4>Nem uma pendencias... </h4>
                }
            </div>

            <br />
        </div>
    )
}