import React from 'react'
import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthetication';
import styles from './Login.module.css'

const Login = () => {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const {login, error: authError, loading} = useAuthentication();
  
    useEffect(() => {
    setEmail("test@test.com"); 
    });
    
    useEffect(() => {
        return () => setPassword("test123"); 
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
     
      const user = {
          email,
          password,
      };
      const res = await login(user);
  }

  useEffect(() => {    
    if(authError){
          setError(authError);
      }
  },[authError])

  return (
    <div className={styles.loginForm}>
       <h1>Entrar</h1>
        <p>Faça login para entrar no sistema</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>E-mail:</span>
                <input 
                type="email" 
                name="email" 
                required 
                placeholder='test@test.com'
                value={email}
                onChange={(e) => setEmail(e.target.value) }
                />
            </label>
            <label>
                <span>Senha:</span>
                <input 
                type="password" 
                name="password" 
                required 
                placeholder='test123'
                value={password}
                onChange={(e) => setPassword(e.target.value) }
                />
            </label>
            {!loading && <button  className='btn'>Entrar</button>}
            {loading && <button  className='btn' disabled>Aguarde...</button>}
            {error && <p className={styles.error}> {error} </p>}
        </form>
    </div>
  )
}

export default Login