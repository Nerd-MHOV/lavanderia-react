import "./cardPainel.scss"
import React from 'react'
import Select from 'react-select'
import { ArrowLeft, ArrowRight } from '@mui/icons-material'

export const CardPainel = ({title, image, type}) => {

    const options = [
        { value: '1', label: 'camareira'},
        { value: '2', label: 'monitoria'},
        { value: '3', label: 'outro'},
    ]

    return(
        <div className="cardPainel">
            <div className="title">{title}</div>
            <div className="action">
                {
                    (type === "select") 
                    ?<Select className="select" options={options} />
                    : <div className="numberBox">
                        <ArrowLeft />
                        <div className="numberr">0</div>
                        <ArrowRight />
                      </div>
                }
            </div>
            <div className="image">{image}</div>
        </div>
    )
}