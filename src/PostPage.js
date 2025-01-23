import React, { useContext } from 'react'
import { useParams,Link } from 'react-router-dom'
import DataContext from './context/DataContext';

const PostPage = () => {
  const {posts, handleDelete} = useContext(DataContext)
  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  return (
    <main className="PostPage">
            <article className="post">
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        <button className="deleteButton" onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                        <Link to={`/edit/${post.id}`}>
                            <button className="editButton">Edit Post</button>
                        </Link>
                    </>
                }
                {!post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    
  )
}

export default PostPage