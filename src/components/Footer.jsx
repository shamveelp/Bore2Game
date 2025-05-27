import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="text-2xl font-bold">
          <span>Bore2</span>
          <span>Game</span>
        </div>
        <p className="mt-2 text-center text-sm">
          © {new Date().getFullYear()} Bore2Game. All rights reserved.
        </p>
        <div className="mt-4 flex space-x-6">
          <a href="#" className="hover:text-yellow-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-yellow-300 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-yellow-300 transition-colors">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;