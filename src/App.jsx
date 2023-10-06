import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import PostPage from './pages/PostPage';
import About from './pages/About';
import Missing from './pages/Missing';
import PostsData from './PostsData';
import axios from "axios";
import EditPage from './pages/EditPage';
import useWindowSize from "./hooks/useWindowSize.js";
import useAxiosFetch from "./hooks/useAxiosFetch.js";

const App = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const { width } = useWindowSize();
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');
    const navigate = useNavigate();

    useEffect(() => {
        setPosts(data);
    }, [data]);

    useEffect(() => {
        const filteredResults = posts.filter(post => {
            return post.body.toLowerCase().includes(search.toLowerCase()) || post.title.toLowerCase().includes(search.toLowerCase());
        });
        setSearchResults(filteredResults.reverse());
    }, [posts, search]);

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
        <div className='App'>
            <Header title='React JS Blog' width={width} />
            <Nav search={search} setSearch={setSearch}/>
            <Routes>
                <Route path='/posts'>
                    <Route index element={<Home
                        posts={searchResults}
                        fetchError={fetchError}
                        isLoading={isLoading} />} />
                    <Route path='new' element={<NewPost 
                        handleSubmit={handleSubmit} 
                        postTitle={postTitle} 
                        setPostTitle={setPostTitle} 
                        postBody={postBody} 
                        setPostBody={setPostBody} />} />
                    <Route path=':id' element={<PostsData posts={posts} />}>
                        <Route index element={<PostPage
                            handleDelete={handleDelete} />} />
                        <Route path='edit' element={<EditPage
                            handleEdit={handleEdit} 
                            editTitle={editTitle} 
                            setEditTitle={setEditTitle} 
                            editBody={editBody} 
                            setEditBody={setEditBody} />} />
                    </Route>
                </Route>
                <Route path='/about' element={<About />} />
                <Route path='*' element={<Missing />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;