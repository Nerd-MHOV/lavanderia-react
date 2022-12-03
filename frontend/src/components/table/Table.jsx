import './table.scss'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useApi } from '../../hooks/api';
import { useEffect, useState } from 'react';

const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];



const List = () => {

    const api = useApi();
    const [rows, setRows] = useState([])

    async function getOutputs() {
        await api.findOutputLog().then(response => {

            let rowsResponse = [];
            response.splice(0, 5).map(arr => {
                let dateUpdated = new Date(arr.updatedAt)
                
                rowsResponse.push({
                    id: arr.id,
                    type: arr.product.type.type,
                    product: arr.product.product,
                    service: arr.product.service.service,
                    size: arr.product.size,
                    amount: arr.amount,
                    name: arr.responsible.collaborator,
                    department: arr.responsible.department.department,
                    date: ((dateUpdated.getDate() + " " + meses[(dateUpdated.getMonth())] + " " + dateUpdated.getFullYear()))
                })
            })

            setRows(rowsResponse)

            return rowsResponse
        }).catch(err => console.log(err))
    }


    useEffect(() => {
        getOutputs()
    } ,[])

    console.log(rows)
    

    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">Tipo</TableCell>
                        <TableCell className="tableCell">Produto</TableCell>
                        <TableCell className="tableCell">Oficio</TableCell>
                        <TableCell className="tableCell">Tamanho</TableCell>
                        <TableCell className="tableCell">Quantidade</TableCell>
                        <TableCell className="tableCell">Colaborador</TableCell>
                        <TableCell className="tableCell">Departamento</TableCell>
                        <TableCell className="tableCell">Data</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className="tableCell">{row.type}</TableCell>
                            <TableCell className="tableCell">{row.product}</TableCell>
                            <TableCell className="tableCell">{row.service}</TableCell>
                            <TableCell className="tableCell">{row.size}</TableCell>
                            <TableCell className="tableCell">{row.amount}</TableCell>
                            <TableCell className="tableCell">{row.name}</TableCell>
                            <TableCell className="tableCell">{row.department}</TableCell>
                            <TableCell className="tableCell">{row.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default List