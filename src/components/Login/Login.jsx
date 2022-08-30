import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "../Login/Login.css"

const Login = () => {
    const access = localStorage.getItem("lemlemaccess")
    const refresh = localStorage.getItem("lemlemrefresh")
    const navigate = useNavigate();

    useEffect(() => {
        if (access) {
            navigate("/")
        }
    }, [access,navigate])

    const [credentials, setCredentials] = useState({
        emailOrPhone: "",
        password: ""
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setCredentials({
            ...credentials,
            [e.target.name]: value
        });
    };


    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response =
                await axios.post('https://lit-lowlands-45367.herokuapp.com/auth/login', credentials)
                    .then((res) => {
                        console.log(res);
                        let accessToken = res.headers['danilov-access'].split(" ")[1];
                        let refreshToken = res.headers['danilov-refresh'].split(" ")[1];
                        localStorage.setItem("lemlemaccess", accessToken);
                        localStorage.setItem("lemlemrefresh", refreshToken);
                        navigate('/')
                    })
                    .catch((err) => {
                        console.log(err);
                    })

        } catch (error) {
            console.log(error);
            // alert(error)
        }
    }

    return (
        <div className='auth'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <label>Email</label>
                    <input onChange={handleChange} type="email" name='emailOrPhone' />
                </div>
                <div className="input-box">
                    <label>Password</label>
                    <input onChange={handleChange} type="password" name='password' />
                </div>
                <button className='login-btn' type='submit'>
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login