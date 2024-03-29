import React, { useState } from 'react';
import './ForgotPassword.css';
import Input from '../../Components/Input/Input';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [OTPValue, setOTPValue] = useState('');
    const [OTPValid, setOTPValid] = useState('formControl width-100 px-3 py-2');
    const [validation, setValidation] = useState(false);
    const [passwordLength, setPasswordLength] = useState(false);
    const [specialCharacter, setSpecialCharacter] = useState(false);
    const [upperCase, setUpperCase] = useState(false);
    const [lowerCase, setLowerrCase] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [passwordOnChange, setPasswordOnChange] = useState(false);
    const [resendOTP, setResendOTP] = useState(false);

    const [OTPsentInEmail, setOTPsentInEmail] = useState(false);
    const [passwordChangedSuccessfully, setpasswordChangedSuccessfully] = useState(false);

    const emailValidation = () => {
        let finalValue = document.getElementById('exampleInputEmail1').value;
        setEmailValue(finalValue);
        let contains = finalValue.includes("@gmail.com");
        contains ? setValidation(false) : setValidation(true);
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

    const changePage = (e) => {
        e.preventDefault();
        setEmailValue('');
        setPasswordValue('');
        setPasswordLength(false);
        setSpecialCharacter(false);
        setLowerrCase(false);
        setUpperCase(false);
        navigate("/login");
    }

    const getOTP = async () => {
        let email = emailValue;
        setResendOTP(true);
        setOTPsentInEmail(true);

        if (email === "") {
            Swal.fire("Enter proper email!");
        } else {
            const response = await fetch('https://weather-forecast-server-zuts.onrender.com/api/generateOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email
                })
            });

            if (response.status === 200) {
                // The user is authenticated.
                console.log(response.json());

            } else {
                // The user is not authenticated.
                console.log(response.json())
            }
        }
    }
    const verifyOTP = async () => {
        let email = emailValue;
        let otp = OTPValue;

        if (email === "") {
            Swal.fire("Enter proper email!");
        } else {
            const response = await fetch('https://weather-forecast-server-zuts.onrender.com/api/verifyOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    otp
                })
            });

            if (response.status === 200) {
                // The user is authenticated.
                console.log(response.json());
                setOTPValid('OTPValid width-100 px-3 py-2');
            } else {
                // The user is not authenticated.
                console.log(response.json())
                setOTPValid('OTPNotValid width-100 px-3 py-2');
            }
        }
    }

    const changePassword = async ()=>{
        let email = emailValue;
        let otpToken = OTPValue;
        let password = passwordValue;

        if (email === "" && password === "") {
            Swal.fire("Enter proper email and password!");
        } else {
            const response = await fetch('https://weather-forecast-server-zuts.onrender.com/api/forgotPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    otpToken,
                    password
                })
            });

            if (response.status === 200) {
                // The user is authenticated.
                console.log(response.json());
                setEmailValue('');
                setOTPValue('');
                setPasswordValue('');
                setpasswordChangedSuccessfully(true);
                setTimeout(()=>{
                    navigate("/login");
                },3000)
            } else {
                // The user is not authenticated.
                console.log(response.json())
            }
        }
    }

    return (
        <div className='height-100vh width-100 d-flex justify-content-center align-items-center'>
            <div className='common-bg-card p-3 p-lg-5 width-36'>

                {passwordChangedSuccessfully ? <h3 className='text-success'>Password changed Successfully <br />Redirecting to Login Page</h3>:<></>}

                <h1 className='text-center'>Forgot Password</h1>
                <div className='d-flex justify-content-center align-items-end flex-row'>
                    <Input onChange={emailValidation}
                        value={emailValue}
                        type='email'
                        className={validation ? 'emailNotValid width-100 px-3 py-2' : 'formControl width-100 px-3 py-2'}
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp" >{['Email Address', '']}</Input>
                    <button onClick={getOTP} className='common-button-bg-card text-white px-3 py-2 mt-4 ms-2'>{resendOTP ? "Resend" : "GetOTP"}</button>
                </div>
                {validation ? <p className='listStyle text-danger mt-1'>Enter valid Email address</p> : <></>}
                {/* {login ? <p className='m-0'>Enter your Email</p>:<></>} */}

                {OTPsentInEmail ? <div className='d-flex justify-content-center align-items-end flex-row'>
                    <Input onChange={(e) => setOTPValue(e.target.value)}
                        value={OTPValue}
                        type='text'
                        className={OTPValid}
                        id="exampleInputOTP"
                        aria-describedby="emailHelp" >{['OTP', '']}</Input>
                    <button onClick={verifyOTP} className='common-button-bg-card text-white px-3 py-2 mt-4 ms-2'>Verify</button>
                </div> : <></>}

                {OTPValid === 'OTPValid width-100 px-3 py-2' ?
                    < >
                        <Input onClick={() => visibility ? setVisibility(false) : setVisibility(true)}
                            onChange={passwordValidation}
                            value={passwordValue}
                            type={visibility ? 'text' : 'password'}
                            className='formControl width-100 px-3 py-2'
                            id="exampleInputPassword1"
                            aria-describedby="passwordHelp" >{visibility ? ['Password', 'visibility'] : ['Password', 'visibility_off']}</Input>
                        {/* {login ? <p className='m-0'>Enter your Passaword</p>:<></>} */}

                        {passwordOnChange ? <div>
                            <p className={passwordLength ? 'm-0 text-danger' : 'm-0 text-success'}>Minimum 8 characters</p>
                            <p className={upperCase ? 'm-0 text-danger' : 'm-0 text-success'}>At least one uppercase letter</p>
                            <p className={lowerCase ? 'm-0 text-danger' : 'm-0 text-success'}>At least one lowercase letter</p>
                            <p className={specialCharacter ? 'm-0 text-danger' : 'm-0 text-success'}>At least one special character</p>
                        </div> : <></>}

                        {/* {emailPasswordIsValid ? <></> : <p className='m-0 text-danger'>Email and Password Incorrect</p>} */}
                        <button onClick={changePassword} className='common-button-bg-card text-white width-100 px-3 py-2 mt-4'>Change Passaword</button>
                    </> : <></>}

                <div className='ForgetPassword-SignUp d-flex flex-row justify-content-center align-items-center mt-3'>
                    <p className='m-0'>Login page</p>
                    <a className='p-0 mx-1' href='/' onClick={changePage}>Login</a>
                </div>
            </div>
        </div>
    )
}
