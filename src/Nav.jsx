import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import DataContext from "./context/DataContext.jsx";

const Nav = () => {
    const { search, setSearch } = useContext(DataContext);

    return (
        <nav className='Nav'>
            <form className='searchForm' onSubmit={e => e.preventDefault()}>
                <label htmlFor='search'>Search posts</label>
                <input
                    id='search'
                    type='text'
                    placeholder='Search posts'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </form>
            <ul>
                <li><Link to='/posts'>Home</Link></li>
                <li><Link to='/posts/new'>New Post</Link></li>
                <li><Link to='/about'>About</Link></li>
            </ul>
        </nav>
    );
};

export default Nav;