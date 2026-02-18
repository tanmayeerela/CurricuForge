import React from 'react';
import { APP_NAME } from '../constants';
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white p-4 text-center mt-8 shadow-inner">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {currentYear} {APP_NAME}. All rights reserved.
        </p></div></footer>
  );};
export default Footer;