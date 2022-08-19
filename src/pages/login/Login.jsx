import "./login.scss"
import Logo from "../../assets/images/GrupoperaltasCompleto.png"
import {Link} from "react-router-dom";
import Btn from "../../componets/btn/Btn";
import Message from "../../componets/message/Message";

const Login = () => {
    return (
        <div className="login">
            <div className="loginBox">
                <form action="">
                    <div className="logo">
                        <img src={Logo} alt=""/>
                    </div>

                    <Message message={"Você saiu com sucesso, volte logo Matheus"} type={"success"}/>

                    <label>
                        <span className="field">Usuario:</span>
                        <input type="text" name="user" placeholder="Informe seu usuario..."/>
                    </label>
                    <label>
                        <span className="field">Senha:</span>
                        <input autoComplete="" type="password" name="passwd" placeholder="Informe sua senha..."/>
                    </label>
                    <div className="formAction">
                        <Link to="/" className={"link"}>Recuperar Senha</Link>
                        <Link to="/painel">
                            <Btn action={"Logar-se"} color={"green"}/>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login