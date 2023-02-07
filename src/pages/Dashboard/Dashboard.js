import React from 'react'
import styles from './Dashboard.module.css';

import { Link } from 'react-router-dom'

import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from './../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

export const Dashboard = () => {
  const { user } = useAuthValue();
  
  const uid = user.uid;

  const {documents: posts, loading, error}= useFetchDocuments('posts', null, uid);

  const { deleteDocument }= useDeleteDocument('posts');

  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className={styles.dashboard}>
        <h2>Dashboard</h2>
        <p><span>{user.displayName}</span> Gerencie os seus posts</p>
        {posts && posts.length === 0 ? (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to='/posts/create' className='btn btn-dark'>Criar primeiro post</Link>
          </div>
        ) : (
          <>
           <div className={styles.post_header}>
           <span></span>
            <span>Ações</span>
              
          </div>

          {posts && posts.map((post) => 
          <div key={post.id} className={styles.post_row}> 
            <img src={post.image} alt={post.title} className={styles.image} />
           <p>{post.title}</p>
          
          <div>
            <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ver</Link>
            <Link to={`/posts/edit/${post.id}`} className='btn btn-outline'>Editar</Link>
            <button onClick={() => deleteDocument(post.id)} className='btn btn-outline btn-danger'>Excluir</button>
          </div>
          </div>)}
          </>
         
        )};
      
    </div>
  );
};

export default Dashboard
