import { useState } from "react";

import "./login.scss"
import Logo from "../../assets/images/GrupoperaltasCompleto.png"
import { Link, Navigate } from "react-router-dom";
import Btn from "../../components/btn/Btn";
import Message from "../../components/message/Message";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const Login = () => {

    const [user, setUser] = useState('')
    const [passwd, setPasswd] = useState('')
    const [callback, setCallback] = useState([])
    const auth = useContext(AuthContext)
    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await auth.login(user, passwd).then((response) => {
                console.log("aqui", response)
                if(response) {
                    setCallback(response)
                } else {
                    setCallback({
                        type: "error",
                        message: "SERVIDOR FORA DO AR"
                    })
                }
            }).catch((err) => {
                console.log(err)
            })

        } catch (err) {
            console.log(err)
        }

    }

    if (auth.userLogin) {
        return <Navigate to="/painel" />
    }



    return (
        <div className="login">
            <div className="loginBox">
                <form>
                    <div className="logo">
                        <img src={Logo} alt="" />
                    </div>

                    {
                        callback.type &&
                        <Message message={callback.message} type={callback.type} />
                    }

                    <label>
                        <span className="field">Usuario:</span>
                        <input onChange={e => setUser(e.target.value)} type="text" name="user" placeholder="Informe seu usuario..." />
                    </label>
                    <label>
                        <span className="field">Senha:</span>
                        <input onChange={e => setPasswd(e.target.value)} autoComplete="" type="password" name="passwd" placeholder="Informe sua senha..." />
                    </label>
                    <div className="formAction">
                        {/* Recuperar Senha */}
                        <Link to="/" className={"link"}></Link>
                        {/* _______________ */}
                        <Btn action={"Logar-se"} color={"green"} onClick={handleLogin} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login