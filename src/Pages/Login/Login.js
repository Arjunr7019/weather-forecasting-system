import React, { useState } from 'react';
import './Login.css';
import Input from '../../Components/Input/Input';
import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';

export default function Login() {

    const [login, setlogin] = useState(false);
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [validation, setValidation] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [passwordLength, setPasswordLength] = useState(false);
    const [specialCharacter, setSpecialCharacter] = useState(false);
    const [upperCase, setUpperCase] = useState(false);
    const [lowerCase, setLowerrCase] = useState(false);
    const [passwordOnChange, setPasswordOnChange] = useState(false);


    const navigate = useNavigate();

    const emailValidation = () => {
        let finalValue = document.getElementById('exampleInputEmail1').value;
        setEmailValue(finalValue);
        let contains = finalValue.includes("@gmail.com");
        contains ? setValidation(false) : setValidation(true);
    }

    const forgotPassword = (e) => {
        e.preventDefault();
        navigate("/forgotPassword");
    }

    const onChangeNameValue = (e) => {
        setNameValue(e.target.value);
    }

    const loginButton = async () => {
        let email = emailValue;
        let password = passwordValue;
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (response.status === 200) {
            // The user is authenticated.
            navigate("/home");
            console.log(response.json());
            
        } else {
            // The user is not authenticated.
            console.log(response.json())
        }
       
    }
    const signUpButton = async () => {
        let name = nameValue;
        let email = emailValue;
        let password = passwordValue;

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        if (response.status === 200) {
            // The user is authenticated.
            navigate("/home");
            console.log(response.json())
        } else {
            // The user is not authenticated.
        }

    }

    // const isEmailRegistered = (email) => {
    //     return accounts.some(account => account.email === email);
    // }

    const createAccount = (e) => {
        e.preventDefault();
        setNameValue('');
        setEmailValue('');
        setPasswordValue('');
        login ? setlogin(false) : setlogin(true);
        setPasswordLength(false);
        setSpecialCharacter(false);
        setLowerrCase(false);
        setUpperCase(false);
        setPasswordOnChange(false);
    }

    const passwordValidation = (e) => {
        setPasswordOnChange(true);
        let finalPassword = e.target.value;
        setPasswordValue(finalPassword);
        e.target.value.length > 7 ? setPasswordLength(false) : setPasswordLength(true);

        const hasSpecialCharacter = /[^A-Za-z0-9]/;
        hasSpecialCharacter.test(finalPassword) ? setSpecialCharacter(false) : setSpecialCharacter(true);

        const hasUppercase = /[A-Z]/;
        hasUppercase.test(finalPassword) ? setUpperCase(false) : setUpperCase(true);

        const hasLowercase = /[a-z]/;
        hasLowercase.test(finalPassword) ? setLowerrCase(false) : setLowerrCase(true);
    }

    return (
        <div className='height-100vh width-100 d-flex justify-content-center align-items-center'>
            <div className='common-bg-card p-3 p-lg-5 width-36'>
                <h1 className='text-center'>{login ? 'Sign Up' : 'Login'}</h1>
                {login ? <Input type='name'
                    onChange={onChangeNameValue}
                    value={nameValue}
                    className='formControl width-100 px-3 py-2'
                    id="exampleInputName1"
                    aria-describedby="nameHelp" >{['Name', '']}</Input> : <></>}
                {/* {login ? <>{signEmailNull?<p className='m-0'>Enter your Name</p>:<></>}</>:<></>}     */}
                <Input onChange={emailValidation}
                    value={emailValue}
                    type='email'
                    className={validation ? 'emailNotValid width-100 px-3 py-2' : 'formControl width-100 px-3 py-2'}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp" >{['Email Address', '']}</Input>
                {validation ? <p className='listStyle text-danger mt-1'>Enter valid Email address</p> : <></>}
                {/* {login ? <p className='m-0'>Enter your Email</p>:<></>} */}
                <Input onClick={() => visibility ? setVisibility(false) : setVisibility(true)}
                    onChange={passwordValidation}
                    value={passwordValue}
                    type={visibility ? 'text' : 'password'}
                    className='formControl width-100 px-3 py-2'
                    id="exampleInputPassword1"
                    aria-describedby="passwordHelp" >{visibility ? ['Password', 'visibility'] : ['Password', 'visibility_off']}</Input>
                {/* {login ? <p className='m-0'>Enter your Passaword</p>:<></>} */}
                {login ? <div>
                    {passwordOnChange ? <div>
                        <p className={passwordLength ? 'm-0 text-danger' : 'm-0 text-success'}>Minimum 8 characters</p>
                        <p className={upperCase ? 'm-0 text-danger' : 'm-0 text-success'}>At least one uppercase letter</p>
                        <p className={lowerCase ? 'm-0 text-danger' : 'm-0 text-success'}>At least one lowercase letter</p>
                        <p className={specialCharacter ? 'm-0 text-danger' : 'm-0 text-success'}>At least one special character</p>
                    </div> : <></>}
                </div> : <></>}
                {/* {emailPasswordIsValid ? <></> : <p className='m-0 text-danger'>Email and Password Incorrect</p>} */}
                <button onClick={login ? signUpButton : loginButton} className='common-button-bg-card text-white width-100 px-3 py-2 mt-4'>{login ? 'Sign Up' : 'Login'}</button>
                {login ? <></> : <div className='ForgetPassword-SignUp d-flex flex-row justify-content-center align-items-center mt-3'>
                    <p className='m-0'>Forgot Password?</p>
                    <a className='p-0 mx-1' href='/' onClick={forgotPassword}>Reset</a>
                </div>}
                <div className={login ? 'ForgetPassword-SignUp d-flex flex-row justify-content-center align-items-center mt-3' : 'ForgetPassword-SignUp d-flex flex-row justify-content-center align-items-center'}>
                    <p className='m-0'>{login ? "Already have an account?" : "Don't have an account?"}</p>
                    <a className='p-0 mx-1' href='/' onClick={createAccount}>{login ? 'Login' : 'Sign Up'}</a>
                </div>
            </div>
        </div>
    )
}
