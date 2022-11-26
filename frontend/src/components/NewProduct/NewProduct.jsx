import { InputAdornment, TextField } from '@mui/material'
import serialize from 'form-serialize'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useApi } from '../../hooks/api'
import Btn from '../btn/Btn'
import Message from '../message/Message'
import './style.scss'

export const NewProduct =  ( {onSuccess = () => {}} ) => {

    const api = useApi();

    const [unitaryValue, setUnitaryValue] = useState('')
    const [departments, setDepartments] = useState([])
    const [types, setTypes] = useState([])
    const [services, setServices] = useState([])
    const [callback, setCallback] = useState([])

    useEffect(() => {
        getSelects();
    }, [])

    useEffect(() => {
        if (callback.type) {
            setTimeout(() => {
                setCallback([])
            }, 5000)
        }
    }, [callback])

    const getSelects = () => {
        getDepartments();
        getTypes();
        getServices();
    }

    const getDepartments = async () => {
        const api_response = await api.department();
        setDepartments(() => {
            return api_response.map(el => { return { value: el.id, label: el.department } })
        })

    }

    const getTypes = async () => {
        const api_response = await api.types();

        setTypes(() => {
            return api_response.map(el => { return { value: el.id, label: el.type } })
        })
    }

    const getServices = async () => {
        const api_response = await api.services();
        setServices(() => {
            return api_response.map(el => { return { value: el.id, label: el.service } })
        })

    }

    const handleChangeUnitaryValue = (e) => {
        let value = e.target.value

        value = value.replace(/[^0-9]/g, '')
        value = value.replace(/([0-9]{2})$/g, ",$1");
        if( value.length > 6 )
                value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        value = 'R$ ' + value

        setUnitaryValue(value)

    }

    const handleSubmiting = async (e) => {
        e.preventDefault();
        const responseForm = serialize(e.target, { hash: true })

        //Primeira Letra Maiuscula
        responseForm.product = responseForm.product[0].toUpperCase() + responseForm.product.substring(1);
        console.log(responseForm)

        if (
            !responseForm.department
            || !responseForm.type
            || !responseForm.service
            || !responseForm.product
            || !responseForm.size
            || !responseForm.unitary_value
        ) {
            setCallback({
                type: 'alert',
                message: 'Por favor, preencha todos os campos'
            })
            return;
        }

        const response = await api.createProduct(
            responseForm.department,
            responseForm.type,
            responseForm.service,
            responseForm.product,
            responseForm.size,
            responseForm.unitary_value,
        )

        console.log(response)
        setCallback(response.message)

        if( response.message.type === 'success'){
            onSuccess();
        }
            

    }

    return (
        <form className="form" onSubmit={handleSubmiting}>
            {
                callback.type &&
                <Message message={callback.message} type={callback.type} />
            }
            <Select placeholder="Departamento" options={departments} name="department" />
            <Select placeholder="Tipo" options={types} name="type" />
            <Select placeholder="Oficio" options={services} name="service" />
            <TextField
                label='Product'
                placeholder='Camiseta'
                name='product'
            />
            <TextField
                label='Tamanho'
                placeholder='GG'
                name='size'
            />
            <TextField
                label='Valor Unitario'
                placeholder='R$ 10,00'
                // InputProps={{
                //     startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                //   }}
                onChange={handleChangeUnitaryValue}
                value={unitaryValue}
                name='unitary_value'
            />




            <Btn color={"dashboard"} action="Criar" className="btn" />
        </form>
    )
}
