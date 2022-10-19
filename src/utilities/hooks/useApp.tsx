import React from 'react';
import { AppContext } from '../context/app.context';

const useApp = () => {
    return React.useContext(AppContext);
};

export default useApp;