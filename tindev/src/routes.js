import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/login.js';
import Main from './pages/main.js';

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Main,
    })
);