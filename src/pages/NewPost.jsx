import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewPost = ({
    handleSubmit, postTitle, setPostTitle, postBody, setPostBody
}) => {
    const navigate = useNavigate();

    return (
        <main className='NewPost'>
            <button id='backbutton' onClick={() => navigate('/posts')}>&larr; Back</button>
            <h2>New Post</h2>
            <form className='newPostForm' onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input
                    id='postTitle'
                    type='text'
                    required
                    value={postTitle}
                    onChange={e => setPostTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post:</label>
                <textarea
                    id='postBody'
                    required
                    value={postBody}
                    onChange={e => setPostBody(e.target.value)}
                />
                <button type='submit'>Submit</button>
            </form>
        </main>
    );
};

export default NewPost;