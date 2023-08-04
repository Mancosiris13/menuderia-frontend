import React from 'react';
import { Link } from 'react-router-dom';

const Roles = () => {
  const roles = [
    { rol: 'Tacos', path: '/tacos' },
    { rol: 'Menudos', path: '/menudos' },
    { rol: 'Caja', path: '/caja' },
    { rol: 'Mesero', path: '/ordenes' },
  ];

  return (
    <div className="bg-gray-100 p-4">
      <div className="grid grid-cols-1 gap-4 max-h-8">
        {roles.map((role) => (
          <Link to={role.path} key={role.path}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg p-4 rounded-md w-full">
              {role.rol}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Roles;
