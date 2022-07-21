import React from 'react';
import { useAuthentication } from '../utils/authentication';

import LoginStack from './loginStack';
import LogoutStack from './logoutStack';


const MainStack = () => {

  const { user } = useAuthentication();

  return user ? <LoginStack /> : <LogoutStack />;

};

export default MainStack;