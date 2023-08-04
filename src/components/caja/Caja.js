import React, { useState } from 'react';
import { BsFillGridFill, BsPencilFill, BsDatabaseAdd } from 'react-icons/bs';
import DisplayOrdersCaja from './DysplayOrdenesCaja';
import AdministrarAlimentos from './AdministrarAlimentos';
import AddDish from './AddProduct';
import ProductCategory from './ProductCategory';

const Caja = () => {
  const [selectedComponent, setSelectedComponent] = useState('orders');

  const handleSidebarItemClick = (component) => {
    setSelectedComponent(component);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'orders':
        return <DisplayOrdersCaja />;
      case 'alimentos':
        return <AdministrarAlimentos />;
      case 'agregar':
        return <AddDish />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex justify-start">
        <aside className="w-1/8 bg-gray-200 p-4 h-screen">
          <ul>
            <div
              className={`flex items-center justify-start hover:bg-slate-300 rounded-md cursor-pointer ${
                selectedComponent === 'orders' ? 'bg-slate-300' : ''
              }`}
              onClick={() => handleSidebarItemClick('orders')}
            >
              <BsFillGridFill className="mx-3 " />
              <li className="py-2">Ordenes</li>
            </div>
            <div
              className={`flex items-center justify-start hover:bg-slate-300 rounded-md cursor-pointer ${
                selectedComponent === 'alimentos' ? 'bg-slate-300' : ''
              }`}
              onClick={() => handleSidebarItemClick('alimentos')}
            >
              <BsPencilFill className="mx-3" />
              <li className="py-2">Administrar Alimentos</li>
            </div>
            <div
              className={`flex items-center justify-start hover:bg-slate-300 rounded-md cursor-pointer ${
                selectedComponent === 'agregar' ? 'bg-slate-300' : ''
              }`}
              onClick={() => handleSidebarItemClick('agregar')}
            >
              <BsDatabaseAdd className="mx-3" />
              <li className="py-2">Agregar Producto</li>
            </div>
          </ul>
        </aside>
        <div>{renderComponent()}</div>
      </div>
    </>
  );
};

export default Caja;
