import React from 'react';
import './SearchBarInput.css';

export default function SearchBarInput({ onClick,onKeyPress,onChange, value, type, className, id, ariadescribedby, children }) {
    return (
        <>
            <div className='labelActionSearchBar width-100 d-flex flex-column justify-content-center align-items-start'>
                <input onChange={onChange} onKeyPress={onKeyPress} value={value} type={type} className={className[0]} id={id} aria-describedby={ariadescribedby} />
                <label htmlFor={id} className={className[1]} >{children[0]}</label>
                <span onClick={onClick} className="material-symbols-outlined">
                    {children[1]}
                </span>
            </div>
        </>
    )
}
