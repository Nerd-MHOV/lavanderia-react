import "./retreat.scss";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { CardPainel } from "../../components/cardPainel/CardPainel"
import { AccountCircle, Engineering, Fingerprint, PersonPin, PersonSearch, PlaylistAddCircle } from "@mui/icons-material"
import { TableRetreat } from "../../components/tableRetreat/TableRetreat"
import Btn from "../../components/btn/Btn"
import { useApi } from "../../hooks/api";
import { useState, useEffect, useRef, useContext } from "react";
import Select from "react-select";
import { createData } from "./lineTables";
import serialize from 'form-serialize';
import { AuthContext } from "../../context/authContext";
import Message from "../../components/message/Message";
import ModalFingerPrint from "../../components/ModalFingerPrint/ModalFingerPrint";
import { useFingerPrint } from "../../hooks/fingerprint_api";



const Retreat = () => {
    const auth = useContext(AuthContext);
    const api = useApi();
    const fingerPrint = useFingerPrint();
    const [departments, setDepartments] = useState([])
    const [collaborators, setCollaborators] = useState([])
    const [collaborator, setCollaborator] = useState()
    const [count, setCount] = useState(0)
    const [rowsCollaborator, setRowsCollaborator] = useState([])
    const [selFinality, setSelFinality] = useState(false);
    const [selCollaborator, setSelCollaborator] = useState(false);
    const [fingerIcon, setFingerIcon] = useState(true);
    const [products, setProducts] = useState([]);
    const [types, setTypes] = useState([]);
    const [callback, setCallback] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [contentForm, setContentForm] = useState([]);
    const [retreatSubmiting, setRetreatSubmiting] = useState(false);
    const [formCollaborator, setFormCollaborator] = useState([]);
    const typesRef = useRef([]);
    const servicesRef = useRef([]);
    const productsRef = useRef([]);
    const sizesRef = useRef([]);
    const responseRef = useRef();
    const ldepart = [];
    let lcollab = [];
    const headersCollaborator = ["Tipo", "Oficio", "Produto", "Tamanho", "Quantidade"]

    const finalityOptions = [{ value: 0, label: 'Setor' }, { value: 1, label: 'Colaborador' }]


    useEffect(() => {
        getProducts();
    }, [])

    useEffect(() => {
        if (callback.type) {
            setTimeout(() => {
                setCallback([])
            }, 5000)
        }
    }, [callback])


    const getProducts = async () => {
        const api_response = await api.product();
        await setProducts(api_response);
        getTypes();

    }

    const getTypes = async () => {
        await setTypes(() => {
            let values = products.map(el => { return { value: el.type.id, label: el.type.type } })
            // remover duplicadas    
            return values.filter((otherValue, index, self) =>
                index === self.findIndex((t) => (t.value === otherValue.value && t.label === otherValue.label))
            )
        })
    }

    const getServices = async (typeProduct) => {
        let values = products.filter(el => el.type.id === typeProduct)
        values = values.map(el => { return { value: el.service.id, label: el.service.service } })
        return values.filter((otherValue, index, self) =>
            index === self.findIndex((t) => (t.value === otherValue.value && t.label === otherValue.label)))
    }

    const getNameProducts = async (type, service) => {
        return await products.filter(product => product.type.id === type && product.service.id === service)
    }

    const getSize = async (type, service, productName) => {
        return await products.filter(product => product.type.id === type && product.service.id === service && product.product === productName)
    }

    const setOptionsServices = async (index, arr) => {
        await servicesRef.current[index].setValue([])
        const el = servicesRef.current[index].props.options;
        el.length = 0
        el.push(...arr)
    }

    const setOptionsProducts = async (index, arr) => {
        await productsRef.current[index].setValue([])
        const el = productsRef.current[index].props.options;
        el.length = 0
        el.push(...arr)
    }

    const setOptionsSizes = async (index, arr) => {
        await sizesRef.current[index].setValue([])
        const el = sizesRef.current[index].props.options;
        el.length = 0
        el.push(...arr)
    }

    const linePlus = () => {
        return (
            [
                createData(count,
                    <Select ref={el => typesRef.current[count] = el} name={`products[types][]`} options={types} onChange={(e) => handleTypes(e, count)} />,
                    <Select ref={el => servicesRef.current[count] = el} name={`products[services][]`} options={[]} onChange={(e) => handleServices(e, count)} />,
                    <Select ref={el => productsRef.current[count] = el} name={`products[products][]`} options={[]} onChange={(e) => handleProducts(e, count)} />,
                    <Select ref={el => sizesRef.current[count] = el} name={`products[sizes][]`} options={[]} />,
                    <input name={`products[quantities][]`} type={"number"} min={1} defaultValue={1} />)
            ]
        )
    }

    const handleMore = async () => {
        let line = await linePlus();
        await setRowsCollaborator(prev => [...prev, line[0]])
        await setCount(count + 1)
    }

    const handleLess = async () => {
        if (count !== 0 && count !== 1) {
            await setCount(count - 1)
            await setRowsCollaborator(prev => [...prev.slice(0, -1)])
        }
    }


    const handleTypes = async (e, index) => {
        let dinamicServices = []
        await getServices(e.value).then(res => {
            dinamicServices = res
        })

        setOptionsServices(index, dinamicServices)
        setOptionsSizes(index, [])
    }

    const handleServices = async (e, index) => {
        let selectedService = e;
        let selectedType = typesRef.current[index].getValue()[0]
        let optionsProducts = [];

        if (!selectedService.value) return;

        await getNameProducts(selectedType.value, selectedService.value).then(response => {
            optionsProducts = response.map(el => {
                return ({ value: el.id, label: el.product })
            })
        })

        optionsProducts = await optionsProducts.filter((otherValue, index, self) =>
            index === self.findIndex((t) => (t.label === otherValue.label))
        )

        setOptionsProducts(index, optionsProducts)
        console.log(optionsProducts);
    }

    const handleProducts = async (e, index) => {
        let selectedProduct = e;
        let selectedType = typesRef.current[index].getValue()[0]
        let selectedService = servicesRef.current[index].getValue()[0]
        let optionsSize = []

        if (!selectedProduct.label) return;

        console.log(selectedType.value, selectedService.value, selectedProduct.label)
        await getSize(selectedType.value, selectedService.value, selectedProduct.label).then(response => {
            optionsSize = response.map(el => {
                return ({ value: el.id, label: el.size })
            })
        })


        setOptionsSizes(index, optionsSize)
        console.log(optionsSize)


    }

    const handleSubmiting = async (e) => {
        e.preventDefault();
        const responseForm = serialize(e.target, { hash: true })
        console.log(responseForm)
        //verificações de formulario

        if (
            !responseForm.finality
            || !responseForm.num_retreat
            || responseForm.num_retreat <= 0
            || (!responseForm.products.products || responseForm.products.products.length !== Number(responseForm.num_retreat))
            || (!responseForm.products.sizes || responseForm.products.sizes.length !== Number(responseForm.num_retreat))
            || responseForm.products.quantities.includes('0')
        ) {
            const responseCallback = {
                message: {
                    type: "alert",
                    message: "Prencha todos os campos adequadamente!",
                }
            }
            setCallback(responseCallback.message)
            return;
        }


        setFingerIcon(true);
        setRetreatSubmiting(false);
        setIsModalVisible(true);

        findPrint(responseForm);
        
    }

    const findPrint = async (responseForm) => {
        const find1 = await fingerPrint.find().then(async (find1) => {
            responseRef.current.innerHTML = find1.msg;
            const find2 = await fingerPrint.find2().then(async (find2) => {
                if (find2.status === "201") {
                    responseRef.current.innerHTML = "Digital não encontrada, Tente novamente!"
                    setTimeout(() => {
                        findPrint(responseForm);
                    }, 2000)
                    return 
                }
                const api_find_response = await api.fingerFind(find2.position).then((api_find_response) => {
                    setContentForm(responseForm);
                    setFormCollaborator(api_find_response.id)
                    setFingerIcon(false);
                    setRetreatSubmiting(true);
                    responseRef.current.innerHTML = api_find_response.collaborator;

                }).catch((err) => {
                    responseRef.current.innerHTML = "Digital não encontrada, Tente novamente!"
                    setTimeout(() => {
                        findPrint(responseForm);

                    }, 2000)
                });

            })
        }).catch((err) => {
            console.log(err)
            responseRef.current.innerHTML = "Verifique se o leitor esta ligado!";
        })
    }

    const handleConfirmMember = async () => {
        setIsModalVisible(false)
        try{
            const api_response = await api.retreatFinger(contentForm, formCollaborator);
            setCallback(api_response.message)
            if(api_response.message.type == "success") {
                //segurança de idiota
                setCount(0);
                setRowsCollaborator([]);
                setCollaborator(null)
                setSelCollaborator(false);
    
            }
        }catch (err) {
            setCallback({
                type: "error",
                message: "Erro no Servidor, tente novamente!"
            })
        }

        
        window.scrollTo(0,0);

    }

    return (
        <div className="retreat">
            <Sidebar />
            <div className="retreatBx">
                <Navbar />
                <div className="container">

                    {isModalVisible &&
                        <ModalFingerPrint onClose={() => setIsModalVisible(false)} >
                            <h2>Siga os Passos</h2>
                            {
                                fingerIcon ?
                                    <Fingerprint className="icon" />
                                    : <PersonPin className="icon" />
                            }
                            <h3 ref={responseRef}>Carregando...</h3>
                            {
                                retreatSubmiting &&
                                <Btn action={"Confirmar"} color="green" onClick={handleConfirmMember} />
                            }
                        </ModalFingerPrint>
                    }

                    <form onSubmit={handleSubmiting}>
                        {
                            callback.type &&
                            <Message message={callback.message} type={callback.type} />
                        }
                        <div className={`top ${(count) ? 'tableOn' : ''}`}>

                            <div>
                                <CardPainel
                                    options={finalityOptions}
                                    title="Finalidade"
                                    onChange={() => { getTypes(); setSelFinality(true) }}
                                    type="select"
                                    image={<PersonSearch />}
                                    name="finality"
                                />
                            </div>
                            <div style={{ pointerEvents: selFinality ? 'all' : 'none' }}>
                                <CardPainel
                                    more={handleMore}
                                    less={handleLess}
                                    num={count}
                                    title="Retiradas"
                                    image={<PlaylistAddCircle />}
                                    type="number"
                                />
                            </div>

                        </div>
                        {(!!count) && <div className="bottom">
                            <div className="table">
                                <TableRetreat headers={headersCollaborator} rows={rowsCollaborator} />
                                <div className="button">

                                    <Btn action={"Retirar"} color="dashboard" />
                                    <input type="hidden" name="user_id" value={auth.userLogin} />
                                    <input type="hidden" name="num_retreat" value={count} />
                                </div>
                            </div>
                        </div>}
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Retreat