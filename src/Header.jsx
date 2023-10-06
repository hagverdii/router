import React from 'react';
import useWindowSize from "./hooks/useWindowSize.js";

const Header = ({ title }) => {
    const { width } = useWindowSize();
    return (
        <header className='Header'>
            <h1>{ title }</h1>
            <h4>{`Width: ${width}px`}</h4>
        </header>
    );
};

export default Header;