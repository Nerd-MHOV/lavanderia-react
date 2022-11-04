import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./style.scss"

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from "react";
import { useApi } from "../../hooks/api";
import { useState } from "react";
import Btn from "../../components/btn/Btn";
import ModalFingerPrint from "../../components/ModalFingerPrint/ModalFingerPrint";
import { NewType } from "../../components/NewType/NewType";



export const ProductPage = () => {

    const api = useApi();

    const [rowsProducts, setRowsProducts] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalNewType, setModalNewType] = useState(false);
    const [modalNewService, setModalNewService] = useState(false);
    const [modalNewProduct, setModalNewProduct] = useState(false);



    const columns = [
        { field: 'type', headerName: 'Tipo', width: 200 },
        { field: 'product', headerName: 'Produto', width: 200 },
        { field: 'service', headerName: 'Oficio', width: 200 },
        { field: 'size', headerName: 'Tamanho', width: 100 },
        { field: 'unitaryValue', headerName: 'Unidade', width: 80 },
        { field: 'department', headerName: 'Departamento', width: 150 },
        
    ];

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        const api_response = await api.product();
        makeLines(api_response)
    }

    const makeLines = async (productapi) => {
        const arrLines = await productapi.map(el => {
            return {
                id: el.id,
                type: el.type.type,
                product: el.product,
                service: el.service.service,
                size: el.size,
                unitaryValue: el.unitary_value,
                department: el.department.department
            }
        })

        console.log("ARRLINES", arrLines)
        setRowsProducts(arrLines);
    }

    const createModal = (type) => {
        //resset
        setModalNewProduct(false);
        setModalNewService(false);
        setModalNewType(false);

        if(type === "type") {
            setModalNewType(true)
        }

        if(type === "service") {
            setModalNewType(true)
        }

        if(type === "product") {
            setModalNewProduct(true)
        }


        setIsVisibleModal(true);
    }

    return (
        <div className="productPage">
            <Sidebar />
            <div className="productPageBx">
                <Navbar />

                { 
                    isVisibleModal && 
                    <ModalFingerPrint onClose={() => setIsVisibleModal(false)} >
                        {
                            modalNewType && <NewType />
                        }
                    </ModalFingerPrint>

                }

                <div className="p20">
                    <div className="containerBx">
                        <div style={{ width: '100%', height: '73vh' }}>
                            <DataGrid
                                rows={rowsProducts}
                                columns={columns}
                                // autoHeight
                                checkboxSelection
                            />
                        </div>

                        <div className="buttons">
                            <Btn color={'dashboard'} action={"Novo Tipo"} onClick={() => createModal("type")} />
                            <Btn color={'dashboard'} action={"Novo Oficio"}  onClick={() => createModal("service")} />
                            <Btn color={'dashboard'} action={"Novo Produto"} onClick={() => createModal("product")}  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}