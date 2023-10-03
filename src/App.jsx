import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './pages/Header';
import Nav from './pages/Nav';
import Footer from './pages/Footer';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import PostPage from './pages/PostPage';
import About from './pages/About';
import Missing from './pages/Missing';

const App = () => {
    return (
        <>
            <Header />
            <Nav />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/post'>
                    <Route index element={<NewPost />} />
                    <Route path=':id' element={<PostPage />} />
                </Route>
                <Route path='/about' element={<About />} />
                <Route path='*' element={<Missing />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;