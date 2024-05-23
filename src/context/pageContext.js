import React, { createContext } from 'react';

const defaultPageContext = {
    currentPage: 'skills',
    setCurrentPage: () => {
        console.warn("setCurrentPage is not provided");
    }
};

const PageContext = createContext(defaultPageContext);

export default PageContext;