import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./style.scss"

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    { field: 'type', headerName: 'Tipo', width: 200 },
    { field: 'product', headerName: 'Produto', width: 200 },
    { field: 'service', headerName: 'Service', width: 200 },
    { field: 'size', headerName: 'Tamanho', width: 100 },
    { field: 'unitaryValue', headerName: 'Unidade', width: 80 },
    { field: 'department', headerName: 'Departamento', width: 150 },
    
];


const rows = [
    {
        id: 1,
        type: 'Toalha de Banho',
        product: 'Lisa / Marrom',
        service: 'Brotas Eco Resort',
        size: 'unico',
        unitaryValue: 'R$ 70,00',
        department: 'Governança',
    },
    {
        id: 2,
        type: 'Toalha de Banho 2',
        product: 'Lisa / Marrom 2',
        service: 'Brotas Eco Resort 2',
        size: 'unico 2',
        unitaryValue: 'R$ 70,00 2',
        department: 'Governança 2',
    },
    {
        id: 3,
        type: 'Toalha de Banho 2',
        product: 'Lisa / Marrom 2',
        service: 'Brotas Eco Resort 2',
        size: 'unico 2',
        unitaryValue: 'R$ 70,00 2',
        department: 'Governança 2',
    },
    {
        id: 4,
        type: 'Toalha de Banho 2',
        product: 'Lisa / Marrom 2',
        service: 'Brotas Eco Resort 2',
        size: 'unico 2',
        unitaryValue: 'R$ 70,00 2',
        department: 'Governança 2',
    }
];

export const ProductPage = () => {
    return (
        <div className="productPage">
            <Sidebar />
            <div className="productPageBx">
                <Navbar />
                <div className="p20">
                    <div className="containerBx">
                        <div style={{ width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                autoHeight
                                checkboxSelection
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}