import React from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

const PostPage = ({ handleDelete }) => {
    const { post } = useOutletContext();
    const navigate = useNavigate();
    
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