import React, { useState } from 'react';
import PageContext from './pageContext';

const PageProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState('home');

    return (
        <PageContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </PageContext.Provider>
    );
};

export default PageProvider;