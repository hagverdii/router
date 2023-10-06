import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from "../context/DataContext.jsx";
import {format} from "date-fns";
import axios from "axios";

const NewPost = () => {
    const navigate = useNavigate();
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const { posts, setPosts } = useContext(DataContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length-1].id + 1 : 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = { id, title: postTitle, datetime, body: postBody };
        try {
            const response = await axios.post('http:/localhost:3500/posts', newPost);
            const allPosts = [...posts, response.data];
            setPosts(allPosts);
            setPostTitle('');
            setPostBody('');
            navigate('/posts');
        } catch (err) {
            console.log(err.message);
        }
    }

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