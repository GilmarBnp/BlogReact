import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { onAuthStateChanged} from 'firebase/auth';

//hooks
import { useState, useEffect} from 'react';
import { useAuthentication } from './hooks/useAuthetication'

//pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Search from './pages/Search/Search';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from  './pages/Dashboard/Dashboard'
import Post from './pages/Post/Post'
import EditPost from './pages/EditPost/EditPost';

//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';


//context
import{ AuthProvider} from './context/AuthContext'



function App() {
  
  const [user, setUser]=useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])

  if(loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
      <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />}>Home</Route>
          <Route path='/register' element={!user ? <Register /> : <Navigate to='/'/>}>Registrar</Route>
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/'/> }>Login</Route>
          <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to='/login'/>}>Criar post</Route>
          <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='/login'/>}>Dashboard</Route>
          <Route path='/about' element={<About />}>About</Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/posts/:id' element={<Post />}></Route>
          <Route path='/posts/edit/:id' element={<EditPost />}></Route>
        </Routes>
      </div>
      <Footer />
      </BrowserRouter>
      </AuthProvider>
    </div>
    
  );
}

export default App;
