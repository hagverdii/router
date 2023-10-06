import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import PostPage from './pages/PostPage';
import About from './pages/About';
import Missing from './pages/Missing';
import PostsData from './PostsData';
import EditPage from './pages/EditPage';
import {DataContextProvider} from "./context/DataContext.jsx";

const App = () => {
    return (
        <div className='App'>
            <Header title='React JS Blog' />
            <DataContextProvider>
                <Nav />
                <Routes>
                    <Route path='/posts'>
                        <Route index element={<Home />} />
                        <Route path='new' element={<NewPost />} />
                        <Route path=':id' element={<PostsData />}>
                            <Route index element={<PostPage />} />
                            <Route path='edit' element={<EditPage />} />
                        </Route>
                    </Route>
                    <Route path='/about' element={<About />} />
                    <Route path='*' element={<Missing />} />
                </Routes>
            </DataContextProvider>
            <Footer />
        </div>
    );
};

export default App;