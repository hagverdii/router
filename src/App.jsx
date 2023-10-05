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
import axiosApi from './api/posts';
import EditPage from './pages/EditPage';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosApi.get('/posts');
                setPosts(response.data);
            } catch (err) {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);            
                } else {
                    console.log(err.message);
                }
            }
        }
        fetchPosts();
    }, []);

    useEffect(() => {
        const filteredResults = posts.filter(post => {
            return post.body.toLowerCase().includes(search.toLowerCase()) || post.title.toLowerCase().includes(search.toLowerCase());
        });
        setSearchResults(filteredResults.reverse());
    }, [posts, search]);

    const handleDelete = async (id) => {
        try {
            await axiosApi.delete(`/posts/${id}`);
            const postsList = posts.filter(post => post.id !== id);
            setPosts(postsList);
            navigate('/posts');
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        try {
            const response = await axiosApi.put(`/posts/${id}`, updatedPost);
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
            const response = await axiosApi.post('/posts', newPost);
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
            <Header title='React JS Blog' />
            <Nav search={search} setSearch={setSearch}/>
            <Routes>
                <Route path='/posts'>
                    <Route index element={<Home posts={searchResults} />} />
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