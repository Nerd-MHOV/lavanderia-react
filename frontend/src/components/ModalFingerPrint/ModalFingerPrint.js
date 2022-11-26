import React from 'react'
import './style.scss';

const ModalFingerPrint = ({children, onClose = () => {}, id="modal"}) => {
    
    const handleOutsideClick = (e) => {
        if(e.target.id === id) onClose();
    }

    return <div id={id} className='modal' onClick={handleOutsideClick}>
        <div className='container'>
            <button className='close' onClick={onClose}/>
            <div className='content'>{children}</div>
        </div>
    </div>
}

export default ModalFingerPrint