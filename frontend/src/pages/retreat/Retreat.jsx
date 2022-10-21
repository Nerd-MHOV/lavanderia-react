import "./retreat.scss";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { CardPainel } from "../../components/cardPainel/CardPainel"
import { Engineering, PersonSearch, PlaylistAddCircle } from "@mui/icons-material"
import { TableRetreat } from "../../components/tableRetreat/TableRetreat"
import Btn from "../../components/btn/Btn"
import { useApi } from "../../hooks/api";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { createData } from "./lineTables";
import serialize from 'form-serialize';



const Retreat = () => {
    const api = useApi();
    const [departments, setDepartments] = useState([])
    const [collaborators, setCollaborators] = useState([])
    const [collaborator, setCollaborator] = useState()
    const [count, setCount] = useState(0)
    const [rowsCollaborator, setRowsCollaborator] = useState([])
    const [selDepartment, setSelDepartment] = useState(false);
    const [products, setProducts] = useState([]);
    const [types, setTypes] = useState([]);
    const typesRef = useRef([]);
    const servicesRef = useRef([]);
    const productsRef = useRef([]);
    const sizesRef = useRef([]);
    const ldepart = [];
    let lcollab = [];
    const headersCollaborator = ["Tipo", "Oficio", "Produto", "Tamanho", "Quantidade"]


    useEffect(() => {
        getDepartments()
        getProducts()
    }, [])

    const getDepartments = async () => {
        const api_response = await api.department();
        setDepartments(api_response)
    }

    const getProducts = async () => {
        const api_response = await api.product();
        await setProducts(api_response)
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
        values = values.map(el => { return {value: el.service.id, label: el.service.service}})
        return values.filter((otherValue, index, self) => 
                index === self.findIndex((t) => (t.value === otherValue.value && t.label === otherValue.label)))
    }

    const getNameProducts = async (type, service) => {
       return await products.filter( product => product.type.id === type && product.service.id === service)
    }

    const getSize = async (type, service, productName) => {
        return await products.filter( product => product.type.id === type && product.service.id === service && product.product === productName)
    }


    departments.filter(async el => {
        await ldepart.push({ value: el.id, label: el.department })
    })

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
        return(
            [
                createData(count,
                    <Select ref={el => typesRef.current[count] = el} name={`products-[types][]`} options={types} onChange={(e) => handleTypes(e, count)} />,
                    <Select ref={el => servicesRef.current[count] = el} name={`products-[services][]`} options={[]} onChange={(e) => handleServices(e, count)} />,
                    <Select ref={el => productsRef.current[count] = el} name={`products-[products][]`} options={[]} onChange={(e) => handleProducts(e, count)} />,
                    <Select ref={el => sizesRef.current[count] = el} name={`products-[sizes][]`}/>,
                    <input name={`products-[qunatities][]`} type={"number"} min={1} defaultValue={1} />)
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


    const handleDepartment = async (e) => {
        await departments.filter(async el => {
            if (el.id === e.value) {
                lcollab = el.collaborator;
            }
        })


        let returnCollaborators = lcollab.map(e => ({ value: e.id, label: e.collaborator }))
        returnCollaborators.unshift({ value: 0, label: 'SETOR' })
        setCollaborators(returnCollaborators)
        setSelDepartment(true);

        //segurança de idiota
        setCount(0);
        setRowsCollaborator([]);
        setCollaborator(null)
    };

    const handleCollaborator = async (e) => {
        setCollaborator(e)
        await getTypes();
        //segurança de idiota
        setCount(0);
        setRowsCollaborator([]);
    }

    const handleTypes = async (e, index) => {
        let dinamicServices = []
        await getServices(e.value).then( res => {
            dinamicServices = res
        })
        setOptionsServices(index, dinamicServices)
    }

    const handleServices = async (e, index) => {
        let selectedService = e;
        let selectedType = typesRef.current[index].getValue()[0]
        let optionsProducts = [];

        await getNameProducts(selectedType.value, selectedService.value).then( response => {
            optionsProducts = response.map(el => {
                return ({value: el.id, label: el.product})
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
        await getSize(selectedType.value, selectedService.value, selectedProduct.label).then( response => {
            console.log(selectedType.value, selectedService.value, selectedProduct.label)
            optionsSize = response.map(el => {
                return ({value: el.id, label: el.size})
            })
        })


        setOptionsSizes(index, optionsSize)
        console.log(optionsSize)
        

    }

    const handleSubmiting = async (e) => {
        e.preventDefault();
        const responseForm = serialize(e.target, {hash: true})
        console.log(responseForm)
        // enviar

        //const api_response = api.retreat(responseForm);

    }

    return (
        <div className="retreat">
            <Sidebar />
            <div className="retreatBx">
                <Navbar />
                <div className="container">
                    <form onSubmit={handleSubmiting}> 
                    <div className={`top ${(count) ? 'tableOn' : ''}`}>
                        <CardPainel
                            onChange={handleDepartment}
                            options={ldepart}
                            title="Departamento"
                            image={<Engineering />}
                            type="select"
                            name="department"
                        />
                        <div style={{ pointerEvents: selDepartment ? 'all' : 'none' }}>
                            <CardPainel
                                style={{ pointerEvents: selDepartment ? 'all' : 'none' }}
                                onChange={handleCollaborator}
                                value={collaborator}
                                options={collaborators}
                                title="Colaborador"
                                image={<PersonSearch />}
                                type="select"
                                name="collaborator"
                            />
                        </div>
                        <div style={{ pointerEvents: selDepartment ? 'all' : 'none' }}>
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
                            {
                                (collaborator.value === 0) &&
                                <CardPainel
                                    options={collaborators.slice(1)}
                                    title="Responsavel"
                                    type="select"
                                    image={<PersonSearch />}
                                    noHover={true}
                                    name="responsible"
                                />
                            }
                            <TableRetreat headers={headersCollaborator} rows={rowsCollaborator} />
                            <div className="button">

                                <Btn action={"Retirar"} color="dashboard" />
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