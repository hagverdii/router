import React, { useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

const EditPage = ({
    handleEdit, editBody, setEditBody, editTitle, setEditTitle
}) => {
    const { post } = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])

    return (
        <main className='NewPost'>
            {editTitle && <>
                <button id='backbutton' onClick={() => navigate(`/posts/${post.id}`)}>&larr; Back</button>
                <h2>Edit Post</h2>
                <form className='newPostForm' onSubmit={e => e.preventDefault()}>
                    <label htmlFor="postTitle">Title:</label>
                    <input
                        id='postTitle'
                        type='text'
                        required
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                    />
                    <label htmlFor="postBody">Post:</label>
                    <textarea
                        id='postBody'
                        required
                        value={editBody}
                        onChange={e => setEditBody(e.target.value)}
                    />
                    <button type='submit' onClick={() => handleEdit(post.id)}>Apply</button>
                </form>
            </>}
            {!editTitle && 
                <>
                    <h2>Post not found</h2>
                    <Link to='/'>Visit homepage</Link>
                </>
            } 
        </main>
    );
};

export default EditPage;