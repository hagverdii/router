import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

const PostsData = ({ posts }) => {
    const { id } = useParams();
    const post = posts.find(post => post.id.toString() === id);
    return (
        <Outlet context={{post}} />
    );
};

export default PostsData;