import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css';

import { useAuthentication } from '../hooks/useAuthetication';

import { useAuthValue } from '../context/AuthContext';


const Navbar = () => {
 
  const {user} = useAuthValue();
  const {logout} = useAuthentication();
  return (
    <nav className={styles.navbar}>
        <h2>Mini<span className={styles.brand_span}>Blog </span></h2> 
        <ul className={styles.links_list}>
            <li className={styles.brand}>
             
              <NavLink to='/' 
              className={({isActive})=> (isActive ? styles.active : '') }>
                Home</NavLink>
              {!user && (
             <>
                <NavLink to='/register' 
                className={({isActive})=> (isActive ? styles.active : '') }>
                  Registrar</NavLink>

                <NavLink to='/login' 
                className={({isActive})=> (isActive ? styles.active : '') }>
                  Login</NavLink>
             </>
              )}
              {user && (
                <>
               
                <NavLink to='/posts/create' 
                className={({isActive})=> (isActive ? styles.active : '') }>
                  Criar post</NavLink>
              
                <NavLink to='/dashboard' 
                className={({isActive})=> (isActive ? styles.active : '') }>
                  Dashboard</NavLink>
                </>

              )}
              <NavLink to='/about' 
              className={({isActive})=> (isActive ? styles.active : '') }>
                Sobre</NavLink>  
            
              
            </li>

            {user && (
              <li className={styles.brand}>
                <button onClick={logout}>Sair</button>
              </li>
            )}
        </ul>  
    </nav>
  )
}

export default Navbar