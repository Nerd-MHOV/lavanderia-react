import { InputAdornment, TextField } from '@mui/material'
import serialize from 'form-serialize'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useApi } from '../../hooks/api'
import Btn from '../btn/Btn'
import Message from '../message/Message'
import './style.scss'

const types = [
    { value: true, label: 'mensalista' },
    { value: false, label: 'diarista' }
]

export const NewCollaborator = ({ onSuccess = () => { } }) => {

    const api = useApi();

    const [departments, setDepartments] = useState([])
    const [callback, setCallback] = useState([])
    const [cpf, setCpf] = useState('')
    const [name, setName] = useState('')

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
    }

    const getDepartments = async () => {
        const api_response = await api.department();
        setDepartments(() => {
            return api_response.map(el => { return { value: el.id, label: el.department } })
        })

    }

    const handleSubmiting = async (e) => {
        e.preventDefault();
        const responseForm = serialize(e.target, { hash: true })


        if (
            !responseForm.department
            || !responseForm.collaborator
            || !responseForm.type
            || responseForm.cpf.length < 14
        ) {
            setCallback({
                type: 'alert',
                message: 'Por favor, preencha todos os campos'
            })
            return;
        }


        const response = await api.createCollaborator(
            responseForm.department,
            responseForm.collaborator,
            responseForm.cpf,
            responseForm.type
        )

        console.log(response)
        setCallback(response.message)

        if (response.message.type === 'success') {
            onSuccess();
        }


    }

    function handleChangeCpf(e) {
        let value = e.target.value

        value = value.replace(/[^0-9]/g, '')
        // value = value.replace(/([0-9]{3})$/g, ".");
        value = value.replace(/^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/);

        value = value.replace(/\D/g, ""); //Remove tudo o que não é dígito

        if(value.length > 11) {
            return;
        }

        value = value.replace(/(\d{3})(\d)/, "$1.$2"); 
        value = value.replace(/(\d{3})(\d)/, "$1.$2"); 
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); 

        setCpf(value)
    }

    function handleChangeName(e) {
        let value = e.target.value
        value = value.toUpperCase()
        setName(value)
    }

    return (
        <form className="form" onSubmit={handleSubmiting}>
            {
                callback.type &&
                <Message message={callback.message} type={callback.type} />
            }
            <Select placeholder="Departamento" options={departments} name="department" />
            <Select placeholder="Tipo" options={types} name="type" />
            <TextField
                label='Colaborador'
                placeholder='Matheus Henrique'
                name='collaborator'
                onChange={handleChangeName}
                value={name}
            />
            <TextField
                label='C.P.F.'
                placeholder='000.000.000-00'
                onChange={handleChangeCpf}
                value={cpf}
                name='cpf'
            />




            <Btn color={"dashboard"} action="Criar" className="btn" />
        </form>
    )
}
