import React, { useState } from 'react';
import { signUp } from "./api";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


function Register(details){

    const { name, surname, email, password, terms} = details;

    let history = useHistory();

    const [nameInput, setFirstName] = useState(name);
    const [surInput, setLastName] = useState(surname);
    const [emailInput, setEmail] = useState(email);
    const [passwordInput, setPassword] = useState(password);
    const [termsInput, setTerms] = useState(terms);

    async function onSubmit(e) {
        e.preventDefault()
        let result = await signUp({
            name: nameInput,
            surname: surInput,
            email: emailInput,
            password: passwordInput,
            terms: termsInput
        });

        if(result.status === 201){
            history.push("/testkitchen")
        }
        else if(result.status === 0){
            toast.error('🦄 please input all boxes', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if(result.status === 1){
            toast.error('🦄 Please agree to the Terms and Conditions', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else{
            console.log('ERORR')
            toast.error('🦄 Email already included!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    
    return (
        <div className='registerMain'>
            <div className="column registerAesth">
                <h1>
                    Register Yourself
                </h1>
                <p>
                    Before connecting with other wonderful roommees, <br />
                    help us to know more about you first!
                </p>
            </div>

            <div className="column registerForm">
                <form>
                    <input
                        type="text"
                        placeholder="First Name"
                        name="name"
                        value={nameInput}
                        onChange={event => {
                            setFirstName(event.target.value);
                        }}
                    />
                    <br />
                    <br />
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="surname"
                        value={surInput}
                        onChange={event => {
                            setLastName(event.target.value);
                        }}
                    />
                    <br />
                    <br />
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={emailInput}
                        onChange={event => {
                            setEmail(event.target.value);
                        }}
                    />
                    <br />
                    <br />
                    <input
                        type="text"
                        placeholder="Password"
                        name="password"
                        value={passwordInput}
                        onChange={event => {
                            setPassword(event.target.value);
                        }}
                    />
                    <br />
                    <br />
                    <label>
                        <input
                            type="checkbox"
                            name="terms"
                            onChange={event => {
                                setTerms(event.target.checked);
                            }}
                        />
                        Agree to the terms and conditions 
                    </label>
                    <br />
                    <br />
                    <button onClick={onSubmit}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Register;