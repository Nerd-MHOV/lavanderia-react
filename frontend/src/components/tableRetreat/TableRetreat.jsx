import "./tableRetreat.scss"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#222f3e",
        color: theme.palette.common.white,
        fontSize: 16,
        fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



export const TableRetreat = ({rows, headers}) => {
    return (
        <div className="tableRetreat">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                headers.map((header) => (
                                    <StyledTableCell key={header} align={header === "Quantidade" ? "center" : "left"}>
                                        {header}
                                    </StyledTableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.idRetreat}>
                                <StyledTableCell component="th" scope="row">
                                    {row.type}
                                </StyledTableCell>
                                <StyledTableCell>{row.service}</StyledTableCell>
                                <StyledTableCell>{row.product}</StyledTableCell>
                                <StyledTableCell>{row.size}</StyledTableCell>
                                <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}