import React from 'react';
import './Input.css';

export default function Input({ onClick,onKeyPress,onChange, value, type, className, id, ariadescribedby, children }) {
    return (
        <>
            <div className='labelAction width-100 d-flex flex-column justify-content-center align-items-start'>
                <input onChange={onChange} onKeyPress={onKeyPress} value={value} type={type} className={className} id={id} aria-describedby={ariadescribedby} />
                <label htmlFor={id} className="formLabel" >{children[0]}</label>
                <span onClick={onClick} className="material-symbols-outlined">
                    {children[1]}
                </span>
            </div>
        </>
    )
}
