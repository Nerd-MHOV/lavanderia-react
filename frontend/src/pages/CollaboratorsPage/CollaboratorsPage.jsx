import { Check, Clear, RepeatOneSharp } from "@mui/icons-material"
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { useCallback, useEffect, useRef, useState } from "react"
import Btn from "../../components/btn/Btn"
import { ChangeCollaborator } from "../../components/ChangeCollaborator/ChangeCollaborator"
import ModalFingerPrint from "../../components/ModalFingerPrint/ModalFingerPrint"
import Navbar from "../../components/navbar/Navbar"
import { RegisterFingerprint } from "../../components/RegisterFingerprint/Registerfingerprint"
import Sidebar from "../../components/sidebar/Sidebar"
import { useApi } from "../../hooks/api"
import './style.scss'
import { useFakeMutation, computeMutation } from "./funcMutation"
import { makeLines, makeOptionsDepartments } from "./tableContent"
import { NewDepartment } from "../../components/NewDepartment/NewDepartment"
import { NewCollaborator } from "../../components/NewCollaborator/NewCollaborator"


export const CollaboratorsPage = () => {

    const api = useApi();

    const [rowsTable, setRowsTable] = useState([])
    const [paramsModal, setParamsModal] = useState([])
    const [paramsFinger, setParamsFinger] = useState([])
    const [optionsDepartments, setOptionsDepartments] = useState([])
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const [isVisibleNewModal, setIsVisibleNewModal] = useState(false)
    const [isModalFingerprint, setIsModalFingerprint] = useState(false)
    const [isModalNewDepartment, setIsModalNewDepartment] = useState(false)

    const mutateRow = useFakeMutation();
    const noButtonRef = useRef(null);
    const [promiseArguments, setPromiseArguments] = useState(null);

    const [snackbar, setSnackbar] = useState(null);

    const handleCloseSnackbar = () => setSnackbar(null);

    useEffect(() => {
        getCollaborators();
        getDepatments();
    }, [isVisibleModal, isVisibleNewModal])

    const columns = [
        { field: 'name', headerName: 'Nome', width: 400, editable: true },
        { 
            field: 'department', headerName: 'Departamento', width: 200,
            type: 'singleSelect', valueOptions: optionsDepartments, editable: true
         },
        {
            field: 'type', headerName: 'Tipo', width: 200,
            type: 'singleSelect', valueOptions: ['mensalista', 'diarista'], editable: true
        },
        {
            field: 'status', headerName: 'Status', width: 100,
            type: "boolean", editable: true,
            renderCell: (params) =>
                <strong>
                    {
                        params.row.status
                            ? <Check />
                            : <Clear />
                    }
                </strong>,

        },
        {
            field: 'fingerprint', headerName: 'Digital', editable: true, type: 'boolean',
            renderCell: (params) => 
            <strong>
                {
                    params.row.fingerprint
                    ? <Check />
                    : <Btn color={'orange'} action="+" onClick={() => handleRegisterFingerprint(params)} />
                }
            </strong>
        },
        {
            field: 'edit', headerName: 'Pendencias', renderCell: (params) =>
                <strong>
                    <Btn color={'darkBlue'} action="+" onClick={() => handleEditCollaborator(params)} />
                </strong>
        },
    ];


    const getCollaborators = async () => {
        const response = await api.collaborator();
        setRowsTable(await makeLines(response))
    }

    const getDepatments = async () => {
        const response = await api.department();
        setOptionsDepartments(await makeOptionsDepartments(response))
    }

    const handleEditCollaborator = (params) => {
        console.log(params)
        setParamsModal(params)
        setIsModalFingerprint(false);
        setIsVisibleModal(true);

    }

    const handleRegisterFingerprint = (params) => {
        let api_department = optionsDepartments.filter((el) => el.value === params.row.department)[0]
        params.row.id_department = api_department.id
        setParamsFinger(params)
        setIsModalFingerprint(true)
        setIsVisibleModal(true);
    }

    const processRowUpdate = useCallback(
        (newRow, oldRow) =>
            new Promise((resolve, reject) => {
                const mutation = computeMutation(newRow, oldRow);
                if (mutation) {
                    // Save the arguments to resolve or reject the promise later
                    setPromiseArguments({ resolve, reject, newRow, oldRow });
                } else {
                    resolve(oldRow); // Nothing was changed
                }
            }),
        [],
    );

    const handleNo = () => {
        const { oldRow, resolve } = promiseArguments;
        resolve(oldRow); // Resolve with the old row to not update the internal state
        setPromiseArguments(null);
    };

    const handleYes = async () => {
        const { newRow, oldRow, reject, resolve } = promiseArguments;

        try {
            // Make the HTTP request to save in the backend

            const response = await mutateRow(newRow);
            const oldRowResponse = await mutateRow(oldRow);

            let api_department = optionsDepartments.filter((el) => el.value === response.department)[0]
            let api_type = response.type === 'mensalista' ? true : false;
            let api_fingerprint = response.fingerprint === false ? 0 : response.fingerprint
            if(response.fingerprint === false) 
                api.fingerDeleteCollaborator(oldRowResponse.fingerprint)
            
            const api_response = await api.collaboratorUpdate( 
                response.id, api_department.id, response.name, response.cpf, api_type, response.status, api_fingerprint
                ).then((res) => {
                    console.log(res)
                    if(res.message.message === "Erro, tente novamente")
                        throw 'Erro no servidor, tente novamente'
                })
            setSnackbar({ children: 'Alteração feita', severity: 'success' });
            resolve(response);
            setPromiseArguments(null);
        } catch (error) {
            setSnackbar({ children: "Nome não pode ser vazio", severity: 'error' });
            reject(oldRow);
            setPromiseArguments(null);
        }
    };

    const handleEntered = () => {
        // The `autoFocus` is not used because, if used, the same Enter that saves
        // the cell triggers "No". Instead, we manually focus the "No" button once
        // the dialog is fully open.
        // noButtonRef.current?.focus();
    };

    const renderConfirmDialog = () => {
        if (!promiseArguments) {
            return null;
        }

        const { newRow, oldRow } = promiseArguments;
        const mutation = computeMutation(newRow, oldRow);

        return (
            <Dialog
                maxWidth="xs"
                TransitionProps={{ onEntered: handleEntered }}
                open={!!promiseArguments}
            >
                <DialogTitle>Você tem certeza ?</DialogTitle>
                <DialogContent dividers>
                    {`Apertar 'Sim' vai mudar o ${mutation}.`}
                </DialogContent>
                <DialogActions>
                    <Button ref={noButtonRef} onClick={handleNo}>
                        Não
                    </Button>
                    <Button onClick={handleYes}>Sim</Button>
                </DialogActions>
            </Dialog>
        );
    };

    async function handleNewDepartment() {
        setIsVisibleNewModal(true)
        setIsModalNewDepartment(true)
    };

    async function handleNewCollaborator() {
        setIsVisibleNewModal(true)
        setIsModalNewDepartment(false)
    };

    return (
        <div className="collaborators_page">
            <Sidebar />
            <div className="pageBx">
                <Navbar />

                {
                    isVisibleModal &&
                    <ModalFingerPrint onClose={() => setIsVisibleModal(false)} >
                        {
                            isModalFingerprint
                            ? <RegisterFingerprint params={paramsFinger} />
                            : <ChangeCollaborator params={paramsModal} />
                        }
                    </ModalFingerPrint>

                }

                {
                    isVisibleNewModal &&
                    <ModalFingerPrint onClose={() => setIsVisibleNewModal(false)}>
                        {
                            isModalNewDepartment 
                            ? <NewDepartment />
                            : <NewCollaborator />
                        }
                    </ModalFingerPrint>
                }


                <div className="p20">
                    <div className="containerBx">
                        <div style={{ width: '100%', height: '73vh' }}>
                            {renderConfirmDialog()}

                            <DataGrid
                                rows={rowsTable}
                                columns={columns}
                                // autoHeight
                                checkboxSelection
                                components={{
                                    Toolbar: GridToolbar,
                                }}
                                processRowUpdate={processRowUpdate}
                                experimentalFeatures={{ newEditingApi: true }}
                            />
                            {!!snackbar && (
                                <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
                                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                                </Snackbar>
                            )}
                        </div>

                        <div className="buttons">
                            <Btn color={'dashboard'} action={"Novo Departamento"} onClick={handleNewDepartment} />
                            <Btn color={'dashboard'} action={"Novo Colaborador"} onClick={handleNewCollaborator} />
                        </div>
                    </div>
                </div>



            </div>

        </div>

    )
}