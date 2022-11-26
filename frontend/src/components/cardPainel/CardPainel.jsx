import "./cardPainel.scss"
import React from 'react'
import Select from 'react-select'
import { ArrowLeft, ArrowRight } from '@mui/icons-material'

export const CardPainel = ({
    title,
    image,
    type,
    noHover = false,
    options,
    more,
    less,
    num,
    value,
    name,
    onChange = () => { return null }
}) => {


    return (
        <div className={noHover ? "cardPainel noHover" : "cardPainel"}>
            <div className="title">{title}</div>
            <div className="action">
                {
                    (type === "select")
                        ? <Select name={name} className="select" options={options} onChange={onChange} value={value} />
                        : <div className="numberBox">
                            <ArrowLeft onClick={less} />
                            <div className="numberr">{num}</div>
                            <ArrowRight onClick={more} />
                        </div>
                }
            </div>
            <div className="image">{image}</div>
        </div>
    )
}