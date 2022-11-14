import { Fingerprint, PersonPin } from "@mui/icons-material"
import { useEffect, useRef, useState } from "react"
import { useApi } from "../../hooks/api"
import { useFingerPrint } from "../../hooks/fingerprint_api"
import Btn from "../btn/Btn"


export const RegisterFingerprint = ({ params }) => {

    const api = useApi();
    const fingerPrint = useFingerPrint();

    const [fingerIcon, setFingerIcon] = useState(true)
    const [fingerSubmit, setFingerSubmit] = useState(true);
    const [fingerSubmitRegister, setFingerSubmitRegister] = useState(true);
    const responseRef = useRef();





    const getPositionFinger = async () => {
        let position = await api.fingerPosition();
        return position.num
    }


    const registerPrint = async () => {
        const verifyFingerCollaborator = await api.collaboratorPk(params.row.id)
        if (verifyFingerCollaborator.fingerprint !== 0) {
            setFingerSubmit(true);
            setFingerSubmitRegister(false);
            return;
        }
        responseRef.current.innerHTML = "Carregando..."
        setFingerSubmit(false);
        setFingerIcon(true)
        const register = await fingerPrint.register().then(async (res1) => {
            responseRef.current.innerHTML = res1.msg;
            console.log(res1.msg)
            const register2 = await fingerPrint.register2().then(async res2 => {
                responseRef.current.innerHTML = res2.msg;
                console.log(res2.msg)

                const register3 = await fingerPrint.register3().then(async res3 => {
                    let positionFinger = await getPositionFinger();
                    responseRef.current.innerHTML = res3.msg;
                    console.log(res3.msg)

                    const register4 = await fingerPrint.register4(positionFinger).then(async res4 => {
                        responseRef.current.innerHTML = res4.msg;
                        console.log('position', positionFinger)
                        console.log(res4.msg)

                        try {
                            if (res4.msg === "Erro, tente novamente") {
                                throw "Erro, tente novamente"
                            }
                            if (res4.msg === "Digital Cadastrada!") {
                                api.fingerRemoveNum(positionFinger);
                                setFingerSubmitRegister(false);
                            }
                            let api_mensalista = params.row.type === "mensalista" ? true : false
                            setFingerSubmit(true)
                            await api.collaboratorUpdate(params.row.id, params.row.id_department, params.row.name, params.row.cpf, api_mensalista, params.row.status, positionFinger)
                        } catch (error) {
                            console.log("err4", error)
                        }


                        console.log(res4)
                    }).catch((err) => {
                        console.log("err3", err)
                        responseRef.current.innerHTML = "Tente novamente"
                        setTimeout(() => {
                            registerPrint();
                        }, 200)
                    })
                }).catch((err) => {
                    console.log("err2", err)
                    responseRef.current.innerHTML = "Tente novamente"
                    setTimeout(() => {
                        registerPrint();
                    }, 200)
                })
            }).catch((err) => {
                console.log(err)
                responseRef.current.innerHTML = "Tente novamente"
                setTimeout(() => {
                    registerPrint();
                }, 200)
            })
        }).catch((err) => {
            console.log("err1", err)
            responseRef.current.innerHTML = "Verifique se o leitor esta ligado!";
            setTimeout(() => {
                registerPrint();
            }, 200)
        })
    }

    const findFinger = async () => {
        setFingerIcon(true)
        setFingerSubmit(false)
        responseRef.current.innerHTML = "Carregando..."
        const find1 = await fingerPrint.find().then(async (find1) => {
            responseRef.current.innerHTML = find1.msg;
            const find2 = await fingerPrint.find2().then(async (find2) => {
                if (find2.status === "201") {
                    responseRef.current.innerHTML = "Digital não encontrada, Tente novamente!"
                    setTimeout(() => {
                        findFinger();
                    }, 2000)
                    return
                }
                const api_find_response = await api.fingerFind(find2.position).then((api_find_response) => {
                    setFingerIcon(false);
                    responseRef.current.innerHTML = api_find_response.collaborator;

                }).catch((err) => {
                    responseRef.current.innerHTML = "Digital não encontrada, Tente novamente!"
                    setTimeout(() => {
                        findFinger();

                    }, 2000)
                });

            })
        }).catch((err) => {
            console.log(err)
            responseRef.current.innerHTML = "Verifique se o leitor esta ligado!";
        })
    }


    const handleRegisterFinger = async () => {
        registerPrint();
    }


    return (
        <div className="registerFingerpring" style={{ display: 'flex', flexDirection: 'column', marginBottom: "15px" }}>
            <h2>Cadastrar</h2>
            <h5>Siga os Passos:</h5>
            {
                fingerIcon ?
                    <Fingerprint className="icon" />
                    : <PersonPin className="icon" />
            }
            <h3 ref={responseRef}> </h3>
            {
                fingerSubmit &&
                <>{
                    fingerSubmitRegister 
                    ? <Btn action={"Cadastrar"} color="green" onClick={handleRegisterFinger} style={{ maxWidth: '300px' }} />
                    : <Btn action={"Testar"} color="green" onClick={findFinger} style={{ maxWidth: '300px' }} />
                }</>

            }
        </div>
    )
}