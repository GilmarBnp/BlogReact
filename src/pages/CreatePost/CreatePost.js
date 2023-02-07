import React from 'react'
import styles from './CreatePost.module.css'

import { useState } from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useInsertDocument } from '../../hooks/useInsertDocument'

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError]= useState('');


  const {user} = useAuthValue();

  const { insertDocument, response} = useInsertDocument('posts');

  const navigate = useNavigate()
 

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

    //criar o array de tags
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

    //checar todos os valores
    if(!title || !image || !tags || !body) {
      setFormError('Por favor preencha todos os campos!')
    }
    if(formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    //redirect to home page
    navigate('/')
    
  }


  return (
    
    <div className={styles.create_post}>
        <h2>Criar post</h2>
        <p>Crie seu post e compartilhe suas ideias</p>
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
            {!response.loading && <button  className='btn'>Enviar</button>}
            {response.loading && (
            <button className='btn' disabled>
              Aguarde...
            </button>
            )} 
            {(response.error || formError) && (<p className={styles.error}>{
             response.error || formError}</p>)}
        </form>
    </div>
  )

  }
   





export default CreatePost