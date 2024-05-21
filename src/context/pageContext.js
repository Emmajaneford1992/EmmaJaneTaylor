import React, { createContext } from 'react';

const defaultPageContext = {
    currentPage: 'home',
    setCurrentPage: () => {
        console.warn("setCurrentPage is not provided");
    }
};

const PageContext = createContext(defaultPageContext);

export default PageContext;