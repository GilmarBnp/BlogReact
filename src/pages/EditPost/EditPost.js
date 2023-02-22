import React from 'react'
import styles from './EditPost.module.css'

import { useState, useEffect } from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import { useFetchDocument } from '../../hooks/useFetchDocument'


const EditPost = () => {
  const { id } = useParams();
  
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError]= useState('');

 

  const {user} = useAuthValue();

  const { updateDocument, response} = useUpdateDocument('posts');

  const { document: post, loading, error } = useFetchDocument('posts', id)

  const navigate = useNavigate()
 
  useEffect(() => {
    if(post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);
      
      const textTags = post.tagsArray.join(', ');
      
      setTags(textTags)
    }  
  }, [post])

  const handleSubmit = (e)=>{
    
    e.preventDefault();
    
    setFormError('');

    //validate image url

    try {
      new URL(image);
    } catch (error) {
      setFormError('A imagem precisa ser uma URL.')
      return
    }

    //Editar o array de tags
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

    //checar todos os valores
    if(!title || !image || !tags || !body) {
      setFormError('Por favor preencha todos os campos!')
    }
    if(formError) return;

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      EditdBy: user.displayName,
    }
    updateDocument(id, data);

    //redirect to home page 
    navigate('/dashboard')
    
  }


  return (
    
    <div className={styles.edit_post}>
        <h2>Editar post</h2>
        <p>Edite o seu post como desejar</p>
        
        {post && (
           <>
           <form onSubmit={handleSubmit}>
         <label>
         <span>Título</span>
         <input type="text" 
                name="title"
                required
                placeholder='Escreva o título do seu post'
                onChange={(e) => setTitle(e.target.value)}
                value={title} />
         </label>
         <label>
         <span>URL da imagem:</span>
         <input type="text" 
                name="image"
                required
                placeholder='Insira uma mensagem que represente o seu post'
                onChange={(e) => setImage(e.target.value)}
                value={image} />
         </label>  
         <label>
         <p className={styles.preview_title}>Preview da imagem</p>
         <img src={post.image} alt={post.title} className={styles.image}/>
         </label>
          
         <label>
            <span>Conteúdo:</span>
             <textarea name="body" 
                       required
                       placeholder='Escreva sua mensagem'
                       onChange={(e) => setBody(e.target.value)}
                       value={body}>
 
             </textarea>
         </label>
         <label>
         <span>Tags:</span>
         <input type="text" 
                name="tags"
                required
                placeholder='Insira as tags separadas por vírgula'
                onChange={(e) => setTags(e.target.value)}
                value={tags} />
         </label>
             {!response.loading && <button  className='btn'>Atualizar</button>}
             {response.loading && (
             <button className='btn' disabled>
               Aguarde...
             </button>
             )} 
             {(response.error || formError) && (<p className={styles.error}>{
              response.error || formError}</p>)}
         </form>
           </>
        )} 
    </div>
  )

  }
   





export default EditPost