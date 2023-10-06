import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useContext } from "react";
import DataContext from "./context/DataContext.jsx";

const PostsData = () => {
    const {posts} = useContext(DataContext);
    const { id } = useParams();
    const post = posts.find(post => post.id.toString() === id);

    return (
        <Outlet context={{post}} />
    );
};

export default PostsData;