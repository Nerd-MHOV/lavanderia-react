import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import TableMinimizable from "../../components/TableMinimizable";
import "./style.scss";
import Btn from "../../components/btn/Btn"
import { useEffect, useRef } from "react";
import { useApi } from "../../hooks/api";
import { useState } from "react";
import ModalFingerPrint from "../../components/ModalFingerPrint/ModalFingerPrint";
import { Fingerprint, PersonPin } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { useFingerPrint } from "../../hooks/fingerprint_api";
import Message from "../../components/message/Message";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

//Padrão tabela
function createData(name, department, lastRetreat, products) {
    return {
        name,
        department,
        lastRetreat,
        products,
    };
}



const titleHeader = ["NOME", "DEPARTAMENTO", "ÚLTIMA RETIRADA"];
const titleHeaderDeparment = ["DEPARTAMENTO", "ÚLTIMA RETIRADA"];
const titleBody = ["Data", "Tipo", "Produto", "Oficio", "Tamanho", "Devolver"];
const titleBodyDepartment = ["Data", "Responsavel", "Tipo", "Produto", "Oficio", "Tamanho", "Devolver"];

const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];


export const ReturnProduct = () => {

    const auth = useContext(AuthContext)
    const api = useApi();
    const fingerPrint = useFingerPrint();

    const [callback, setCallback] = useState([]);

    const [outputs, setOutputs] = useState([]);
    const [rowCollaborator, setRowCollaborator] = useState([]);
    const [rowDepartment, setRowDepartment] = useState([]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fingerIcon, setFingerIcon] = useState(true);
    const [retreatSubmiting, setRetreatSubmiting] = useState(false);

    const [modalTitle, setModalTitle] = useState('');
    const [modalResponsible, setModalResponsible] = useState('');
    const [valueGood, setValueGood] = useState(0);
    const [errorGood, setErrorGood] = useState(false);
    const [textGood, setTextGood] = useState('');
    const [valueBad, setValueBad] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [errorObs, setErrorObs] = useState(false);
    const [textObs, setTextObs] = useState('');
    const [contentObs, setContentObs] = useState('');


    const [fingerCollaborator, setFingerCollaborator] = useState();
    const [outputId, setOutputId] = useState();
    const [visibleObsReturn, setVisibleObsReturn] = useState(false);

    const fingerResponseRef = useRef();
    const modalRetGoodRef = useRef();
    const modalRetBadRef = useRef();

    useEffect(() => {
        getDebtors()
    }, [])

    useEffect(() => {
        if (callback.type) {
            setTimeout(() => {
                setCallback([])
            }, 5000)
        }
    }, [callback])


    
    const getDebtors = async () => {
        const api_response = await api.debitCollaborator();
        makeLines(api_response)
        console.log("chamou")
    }

    const makeLines = async (outputsapi) => {
        let lastFind = "2021-10-28T09:38:26.940Z";
        let arrLines = await outputsapi.map(el => {
            let arrLinesProducts = el.debit.map(prod => {
                if (lastFind < prod.updatedAt) {
                    lastFind = prod.updatedAt;
                }
                let dateUpdated = new Date(prod.updatedAt)
                return {
                    id: prod.id,
                    dateRetreat: ((dateUpdated.getDate() + " " + meses[(dateUpdated.getMonth())] + " " + dateUpdated.getFullYear())),
                    type: prod.product.type.type,
                    product: prod.product.product,
                    service: prod.product.service.service,
                    size: prod.product.size,
                    returnProduct: <Btn color={"blue"} action="Devolver" onClick={() => handleDevoluct(prod)} />
                }
            })

            lastFind = new Date(lastFind)
            return {
                name: el.collaborator,
                department: el.department !== null ? el.department.department : "Null",
                lastRetreat: ((lastFind.getDate() + " " + meses[(lastFind.getMonth())] + " " + lastFind.getFullYear())),
                products: arrLinesProducts,
            }
        })
        setRowCollaborator(() => {
            return arrLines.filter(line => line.name !== "SETOR")
        });



        const outputsDepartment = outputsapi.filter(output => output.id === 0)

        let departmentOnly = outputsDepartment[0].debit.map(el => el.product.department)
        departmentOnly = departmentOnly.filter((item, index, self) => index === self.findIndex((s) =>
            s.id === item.id
        ))
        let arrLinesDepartment = departmentOnly.map(el => {
            let lastFind = "2021-10-28T09:38:26.940Z";

            let arrLinesProducts = outputsDepartment[0].debit.filter((prod) => {
                if (prod.product.department.id !== el.id) {
                    return false;
                }
                return true;
            }).map(prod => {

                if (lastFind < prod.updatedAt) {
                    lastFind = prod.updatedAt;
                }
                let dateUpdated = new Date(prod.updatedAt)
                return {
                    id: prod.id,
                    dateRetreat: ((dateUpdated.getDate() + " " + meses[(dateUpdated.getMonth())] + " " + dateUpdated.getFullYear())),
                    responsible: prod.responsible.collaborator,
                    type: prod.product.type.type,
                    product: prod.product.product,
                    service: prod.product.service.service,
                    size: prod.product.size,
                    returnProduct: <Btn color={"blue"} action="Devolver" onClick={() => handleDevoluct(prod, true)} />
                }
            })

            lastFind = new Date(lastFind)
            return {
                name: el.department,
                lastRetreat: ((lastFind.getDate() + " " + meses[(lastFind.getMonth())] + " " + lastFind.getFullYear())),
                products: arrLinesProducts,
            }
        })




        setRowDepartment(arrLinesDepartment)

    }

    const findPrint = async () => {
        const find1 = await fingerPrint.find().then(async (find1) => {
            fingerResponseRef.current.innerHTML = find1.msg;
            const find2 = await fingerPrint.find2().then(async (find2) => {
                if (find2.status === "201") {
                    fingerResponseRef.current.innerHTML = "Digital não encontrada, Tente novamente!"
                    setTimeout(() => {
                        findPrint();
                    }, 2000)
                    return
                }
                const api_find_response = await api.fingerFind(find2.position).then((api_find_response) => {
                    setFingerCollaborator(api_find_response.id)
                    setFingerIcon(false);
                    setRetreatSubmiting(true);
                    fingerResponseRef.current.innerHTML = api_find_response.collaborator;

                }).catch((err) => {
                    fingerResponseRef.current.innerHTML = "Digital não encontrada, Tente novamente!"
                    setTimeout(() => {
                        findPrint();

                    }, 2000)
                });

            })
        }).catch((err) => {
            console.log(err)
            fingerResponseRef.current.innerHTML = "Verifique se o leitor esta ligado!";
        })
    }



    const handleDevoluct = async (product, isSetor = false) => {
        setModalTitle(`${product.amount} unid. de ${product.product.type.type} ${product.product.product} ${product.product.service.service}`);
        setModalResponsible(product.responsible.collaborator)
        setValueGood(product.amount)
        setValueBad(0)
        setOutputId(product.id)
        setMaxValue(product.amount)
        setIsModalVisible(true);
        setRetreatSubmiting(false);
        setFingerIcon(true);
        setVisibleObsReturn(false);
        findPrint()
    }

    const handleChangeGood = (e, max) => {
        //resset
        setErrorGood(false)
        setTextGood('')

        let good = e.target.value
        let bad = valueBad
        let total = Number(good) + Number(bad)

        if (total > max) {
            setErrorGood(true)
            setTextGood("A devolução não pode ser maior que o retirado!")
        }

        if (total == 0) {
            setErrorGood(true)
            setTextGood("Devolva ao menos 1 item!")
        }

        if (good < 0) {
            e.target.value = 0
        }
        setValueGood(good)
        setMaxValue(total)
    }

    const handleChangeBad = (e, max) => {
        //resset
        setErrorGood(false)
        setTextGood('')

        let bad = e.target.value
        let good = valueGood
        let total = Number(good) + Number(bad)

        if (total > max) {
            setErrorGood(true)
            setTextGood("A devolução não pode ser maior que o retirado!")
        }

        if (total == 0) {
            setErrorGood(true)
            setTextGood("Devolva ao menos 1 item!")
        }

        if (bad > 0) {
            if (visibleObsReturn !== true) {
                setErrorObs(true)
                setVisibleObsReturn(true);
            }
        } else {
            setErrorObs(false)
            setVisibleObsReturn(false);
        }

        if (bad < 0) {
            e.target.value = 0
        }
        setValueBad(bad)
        setMaxValue(total)
    }

    const handleChangeObs = async (e) => {
        let text = e.target.value
        setErrorObs(false)
        setTextObs('')
        setContentObs(text)
        if (text == "") {
            setErrorObs(true);
            setTextObs("Você precisa descrever o estado do item!")
        }
    }


    const handleSubmiting = async () => {

        if (errorGood === true || errorObs === true) {
            return;
        }

        try {



            const api_response = await api.returnFinger(
                outputId,
                fingerCollaborator,
                auth.userLogin,
                maxValue,
                valueBad,
                contentObs,
            )

            console.log(api_response);
            setCallback(api_response.message)
            if (api_response.message.type == "success") {
                setIsModalVisible(false);
                getDebtors();
                window.scrollTo(0,0);
            }





        } catch (err) {
            setCallback({
                type: "error",
                message: "Erro no Servidor, tente novamente!"
            })
        }
    }


    return (
        <div className="returnProduct">


            <Sidebar />
            <div className="returnProductBx">
                <Navbar />
                {isModalVisible &&
                    <ModalFingerPrint onClose={() => setIsModalVisible(false) } >
                        {
                            callback.type &&
                            <Message message={callback.message} type={callback.type} />
                        }
                        <h2>{modalTitle}</h2>
                        <div className="devoluctionContent">
                            <h4><b>Retirado por:</b> {modalResponsible}</h4>
                        </div>

                        <h3 style={{marginBottom: "15px"}}>Devolver:</h3>

                        <TextField
                            error={errorGood}
                            helperText={textGood}
                            defaultValue={valueGood}
                            onChange={(e) => handleChangeGood(e, maxValue)}
                            ref={modalRetGoodRef}
                            label="Em perfeito estado"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ color: "green", marginBottom: "15px" }}
                        />
                        <br />

                        <TextField
                            error={errorGood}
                            helperText={textGood}
                            defaultValue={valueBad}
                            onChange={(e) => handleChangeBad(e, maxValue)}
                            ref={modalRetBadRef}
                            label="Danificados"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <br />

                        {
                            visibleObsReturn &&
                            <TextField
                                error={errorObs}
                                helperText={textObs}
                                onChange={(e) => handleChangeObs(e)}
                                label="Descrição do item danificado"
                                type="text"
                                defaultValue={contentObs}
                                placeholder="Descreva o defeito do(s) item(s)!"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />}

                        {
                            fingerIcon ?
                                <Fingerprint className="icon" style={{ width: "25%", height: "25%" }} />
                                : <PersonPin className="icon" style={{ width: "25%", height: "25%" }} />
                        }
                        <h3 style={{marginBottom: "15px"}} ref={fingerResponseRef}>Carregando...</h3>
                        {
                            retreatSubmiting &&
                            <Btn style={{marginBottom: "15px"}} action={"Devolver"} color="green" onClick={handleSubmiting} />
                        }
                        <br style={{marginBottom: '15px'}}/>
                    </ModalFingerPrint>
                }

                <div className="p20">
                    <div className="containerBx">

                        {
                            callback.type &&
                            <Message message={callback.message} type={callback.type} />
                        }

                        <div className="titleContainerBx">Por Colaborador</div>
                        <hr className="hrTitleBx" />
                        <TableMinimizable
                            rowsHeader={rowCollaborator}
                            titleHeader={titleHeader}
                            titleBody={titleBody}
                        />
                    </div>

                    <div className="containerBx mt20">

                        <div className="titleContainerBx">Por Departamento</div>
                        <hr className="hrTitleBx" />
                        <TableMinimizable
                            rowsHeader={rowDepartment}
                            titleHeader={titleHeaderDeparment}
                            titleBody={titleBodyDepartment}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}