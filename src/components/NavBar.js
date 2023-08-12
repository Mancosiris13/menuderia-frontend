import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-white text-2xl font-bold mr-4 mb-2 md:mb-0 md:order-1">
          Menuderia Ornelas
        </div>
        <div className="md:order-2">
          <Link to={'/'}>
            <button className="border bg-white text-blue-700 px-4 py-2 rounded-md font-semibold md:ml-3">
              Menu Principal
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
