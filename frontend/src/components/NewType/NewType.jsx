import { TextField } from "@mui/material";
import { useState } from "react";
import { useApi } from "../../hooks/api";
import Btn from "../btn/Btn";
import Message from "../message/Message";

import "./style.scss";

export const NewType = () => {

    const api = useApi();
    
    const [type, setType] = useState("");
    const [callback, setCallback] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(type)
        const api_response = await api.createType(type);
        console.log(api_response)
        setCallback(api_response.message);
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            {
                callback.type &&
                <Message message={callback.message} type={callback.type} />
            }

            <h1>Criar Novo Tipo:</h1>
            <TextField 
                onChange={(e) => setType(e.target.value)}
                label="Tipo"
                type="text"
            />
            <Btn color={"dashboard"} action="Criar" />
        </form>
    )
}