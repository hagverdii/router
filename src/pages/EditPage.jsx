import React, {useEffect, useContext, useState} from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import DataContext from "../context/DataContext.jsx";
import {format} from "date-fns";
import axios from "axios";

const EditPage = () => {
    const { post } = useOutletContext();
    const navigate = useNavigate();
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const { posts, setPosts } = useContext(DataContext);

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'dd/MM/yyyy - pp');
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        try {
            const response = await axios.put(`http://localhost:3500/posts/${id}`, updatedPost);
            setPosts(posts.map(post => post.id === id ? response.data : post));
            setEditTitle('');
            setEditBody('');
            navigate(`/posts/${id}`);
        } catch (err) {
            console.log(err.message);
        }
    }

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