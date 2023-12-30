import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Register.css"
function SignUp() {
    const [isAuth, setIsAuth] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleClick = () => {
        createUserWithEmailAndPassword(auth, email, password).then((data) => {
            setIsAuth(data.user.email)
            localStorage.setItem("email", data.user.email)
        }).catch(err => alert(err.message))
    }

    useEffect(() => {
        setIsAuth(localStorage.getItem('email'))
    }, [])

    return (
        <div className="">
                <div className="d-flex justify-content-center align-items-center h-100vh">
                    <div className="d-flex w-50 ">
                        <div className="w-50">
                            <img src="./dropbox.jpg" className="images" alt="" />
                        </div>
                        <div class="w-50 ">

                            <h1 className="text-center mb-1">
                                <img className="logo" src="https://static-00.iconduck.com/assets.00/dropbox-icon-2048x2048-rjt8u5st.png" alt="" />
                                Register
                            </h1>
                            <div className="p-3 bg-light rounded">
                                <div class=" input-container form-floating mb-3">

                                    <input type="email" onChange={e => setEmail(e.target.value)} required id="floatingInput" />

                                    <label for="floatingInput">Email address</label>
                                </div>
                                <div class="  input-container form-floating">
                                    <input type="password" onChange={e => setPassword(e.target.value)} required id="floatingPassword" />
                                    <label for="floatingPassword">Password</label>
                                </div>
                                <div class=" input-container form-floating">
                                    <input type="password" onChange={e => setPassword(e.target.value)} required id="floatingPassword" />
                                    <label for="floatingPassword">Repeat password</label>
                                </div>
                                <div class="d-grid gap-2 mt-4">
                                    <button class="btn btn-primary" type="button" onClick={handleClick}>Sign In</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
        </div>
    );
}
export default SignUp;
