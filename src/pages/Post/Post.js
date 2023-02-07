import styles from './Post.module.css'

//hooks
import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument';

const Post = () => {
    

    const { id } = useParams();
    const { document: post, loading } = useFetchDocument("posts", id);
   
  return (
    <div className= {styles.posts_container}>
     {loading && <p>Carregando post...</p>}    
     {post && (
         <>
         <h2>{post.title}</h2>
         <img className={styles.img} src={post.image} alt={post.title} />
         <div>    
           <p className={styles.body}>{post.body}</p>   
         </div>  
            <h3>Esse post trata sobre:</h3>
           <div className={styles.tag}>
           {post.tagsArray.map((tag) => (
              <p key={tag}><span>#</span>{tag}</p>
            ))}
           </div>
            </>
        )}

    </div>
  )
}

export default Post