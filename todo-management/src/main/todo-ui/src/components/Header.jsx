import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { isUserLoggedIn, logout } from '../services/AuthService';

const Header = () => {

    const isAuth = isUserLoggedIn();

    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#e3f2fd' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to='/'>Todo</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {
                            isAuth && <li className="nav-item">
                                <NavLink className="nav-link" to='/todos'>Todos</NavLink>
                            </li>
                        }
                        {
                            !isAuth && <li className="nav-item">
                            <NavLink className="nav-link" to='/register'>Register</NavLink>
                        </li>
                        }
                        {
                            !isAuth && <li className="nav-item">
                            <NavLink className="nav-link" to='/login'>Login</NavLink>
                        </li>
                        }
                        {
                            isAuth && <li className="nav-item">
                            <NavLink className="nav-link" to="/login" onClick={handleLogout}>Logout</NavLink>
                        </li>
                        }
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Header