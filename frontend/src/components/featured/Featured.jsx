import { KeyboardArrowDown, KeyboardArrowUp, MoreVert } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import { useApi } from '../../hooks/api'
import './featured.scss'

const Featured = () => {


    const api = useApi();
    const [amountCollabortors, setAmountCollaborators] = useState(0);
    const [withFingerPrint, setWithFingerPrint] = useState(0);
    const [withoutFingerPrint, setWithoutFingerPrint] = useState(0);
    const [percent, setPercent] = useState(0);

    async function getCollaborators() {
        await api.collaborator().then( response => {
            setAmountCollaborators(response.length)

            setWithFingerPrint((response.filter(arr => !!arr.fingerprint)).length)
            setWithoutFingerPrint((response.filter(arr => !arr.fingerprint)).length)
        }).catch((err) => {console.log(err)})
    }


    useEffect(() => {
        getCollaborators()
    }, [])

    useEffect(() => {
        let getPercent = (withFingerPrint / amountCollabortors) * 100;

        setPercent(getPercent.toFixed(1))
    }, [withFingerPrint])

    return (
        <div className='featured'>
            <div className="top">
                <h1 className="title">Digitais Cadastradas</h1>
                {/* <MoreVert fontSize='medium' /> */}
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={percent} text={percent+"%"} strokeWidth={5} />
                </div>
                <p className="title">Total de Colaboradores</p>
                <p className="amount">{amountCollabortors}</p>
                <p className="desc">
                    Previsto somente, colaboradores cadastrados no sistema.
                </p>
                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Faltam</div>
                        <div className="itemResult negative">
                            <KeyboardArrowDown fontSize='small' />
                            <div className="resultAmount">{withoutFingerPrint}</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Cadastrados</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUp fontSize='small' />
                            <div className="resultAmount">{withFingerPrint}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured