import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/api";
import Btn from "../btn/Btn";
import Message from "../message/Message";

import "./style.scss";

export const NewDepartment = () => {

    const api = useApi();
    
    const [department, setDepartment] = useState("");
    const [callback, setCallback] = useState([]);

    useEffect(()=>{
        if (callback.type) {
            setTimeout(() => {
                setCallback([])
            }, 5000)
        }
    },[callback])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(department)
        const api_response = await api.createDepartment(department);
        console.log(api_response)
        setCallback(api_response.message);
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            {
                callback.type &&
                <Message message={callback.message} type={callback.type} />
            }

            <h1>Criar Novo Departamento:</h1>
            <TextField 
                onChange={(e) => setDepartment(e.target.value)}
                label="Departamento"
                type="text"
            />
            <Btn color={"dashboard"} action="Criar" />
        </form>
    )
}