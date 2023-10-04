import React from 'react';
import { Link } from 'react-router-dom';

const Missing = () => {
    return (
        <main className='Missing'>
            <h2>Page not found</h2>
            <Link to='/'>Visit homepage</Link>
        </main>
    );
};

export default Missing;