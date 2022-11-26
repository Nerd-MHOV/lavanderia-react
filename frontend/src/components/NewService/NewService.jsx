import { TextField } from "@mui/material";
import { useState } from "react";
import { useApi } from "../../hooks/api";
import Btn from "../btn/Btn";
import Message from "../message/Message";

import "./style.scss";

export const NewService = () => {

    const api = useApi();
    
    const [service, setService] = useState("");
    const [callback, setCallback] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(service)
        const api_response = await api.createService(service);
        console.log(api_response)
        setCallback(api_response.message);
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            {
                callback.type &&
                <Message message={callback.message} type={callback.type} />
            }

            <h1>Criar Novo Oficio:</h1>
            <TextField 
                onChange={(e) => setService(e.target.value)}
                label="Oficio"
                type="text"
            />
            <Btn color={"dashboard"} action="Criar" />
        </form>
    )
}