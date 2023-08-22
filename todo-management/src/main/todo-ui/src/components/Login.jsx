import React, { useState } from 'react'
import { loginUser, saveLoggedInUser, storeToken } from '../services/AuthService';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigator = useNavigate();

    async function handleLoginForm(e) {

        e.preventDefault();

        const login = {username, password}
        console.log(login);

        await loginUser(username, password).then((response) =>{
            console.log(response.data.user)
            const token = 'Basic ' + window.btoa(username + ":" + password);
            storeToken(token);
            saveLoggedInUser(username);
            navigator("/todos");

            window.location.reload(false);
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className="container my-4">
          <div className="row">
            <div className="col-xl-5 col-lg-5 col-md-6 d-flex flex-column mx-auto">
              <div className="card card-plain mt-8">
                <div className="card-header pb-0 text-left bg-transparent">
                  <h3 className="font-weight-bolder text-info text-gradient">Welcome back</h3>
                  <p className="mb-0">Enter your email and password to sign in</p>
                </div>
                <div className="card-body">
                  <form role="form">
                    <label>Username</label>
                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} aria-label="Email" aria-describedby="email-addon"/>
                    </div>
                    <label>Password</label>
                    <div className="mb-3">
                      <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Password" aria-describedby="password-addon"/>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="rememberMe" checked=""/>
                      <label className="form-check-label" for="rememberMe">Remember me</label>
                    </div>
                    <div className="text-center">
                      <button type="button" className="btn btn-info w-100 mt-4 mb-0" onClick={(e) => handleLoginForm(e)}>Sign in</button>
                    </div>
                  </form>
                </div>
                <div className="card-footer text-center pt-0 px-lg-2 px-1">
                  <p className="mb-4 text-sm mx-auto">
                    Don't have an account?
                    <Link to="/register" className="text-info text-gradient font-weight-bold">Sign up</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Login