import { useContext } from 'react';
import PageContext from './pageContext';

const usePage = () => {
    return useContext(PageContext);
};

export default usePage;