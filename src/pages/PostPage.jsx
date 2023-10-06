import React, {useContext} from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import axios from "axios";
import DataContext from "../context/DataContext.jsx";

const PostPage = () => {
    const { post } = useOutletContext();
    const navigate = useNavigate();
    const { posts, setPosts } = useContext(DataContext);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3500/posts/${id}`);
            const postsList = posts.filter(post => post.id !== id);
            setPosts(postsList);
            navigate('/posts');
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <main className='PostPage'>
            <article className='post'>
                {post && 
                    <>
                        <button id='backbutton' onClick={() => navigate('/posts')}>&larr; Back</button>
                        <h2>{post.title}</h2>
                        <p className='postDate'>{post.datetime}</p>
                        <p className='postBody'>{post.body}</p>
                        <Link to={`/posts/${post.id}/edit`}><button style={{backgroundColor: 'green', marginRight: '.5rem'}}>Edit post</button></Link>
                        <button onClick={() => handleDelete(post.id)}>Delete post</button>
                    </>
                }
                {!post && 
                    <>
                        <h2>Post not found</h2>
                        <Link to='/posts'>Visit homepage</Link>
                    </>
                }
            </article>
        </main>
    );
};

export default PostPage;