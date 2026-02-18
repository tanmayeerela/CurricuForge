import React from 'react';
import { APP_NAME } from '../constants';
const Header: React.FC = () => {
return (
  <header className="bg-white shadow-md p-4 sticky top-0 z-10">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
        {APP_NAME}
        </h1><nav>
          {}
        </nav></div></header>
  );};
export default Header;