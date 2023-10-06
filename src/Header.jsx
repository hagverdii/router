import React from 'react';

const Header = ({ title, width }) => {
    return (
        <header className='Header'>
            <h1>{ title }</h1>
            {width < 900 ? <h3>{'<900'}</h3> : <h3>{'>900'}</h3>}
        </header>
    );
};

export default Header;