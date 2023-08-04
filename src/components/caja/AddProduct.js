import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDish = () => {
  const API_URL = process.env.REACT_APP_URL;
  console.log(API_URL);

  const [nombre, setNombre] = useState(String);
  console.log('nombre', nombre);
  const [precio, setPrecio] = useState(Number);
  console.log('precio:', precio);
  const [categoria, setCategoria] = useState(String);
  console.log('categoria ', categoria);

  const handleAddProduct = () => {
    axios
      .post(`${API_URL}/createProduct`, {
        nombre,
        precio,
        categoria,
      })
      .then((response) => {
        toast.success('Producto Añadido Correctamente!', {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((e) => {
        toast.error(e.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
  return (
    <div className="items-center justify-center bg-white shadow-md p-6 rounded-lg w-scren ">
      <p className="text-3xl font-bold mb-4">Agregar Producto</p>
      <input
        placeholder="Nombre del Producto"
        className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:border-blue-600"
        onChange={(event) => setNombre(event.target.value)}
      />
      <input
        placeholder="Precio"
        className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:border-blue-600"
        onChange={(event) => setPrecio(event.target.value)}
      />
      <select
        className="border border-gray-300 w-full text-center font-semibold bg-slate-400 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-600"
        onChange={(event) => setCategoria(event.target.value)}
      >
        <option>Seleccionar Categoría</option>
        <option value="Tacos">Tacos</option>
        <option value="Menudos">Menudos</option>
        <option value="Bebidas">Bebidas</option>
        <option value="Extras">Extras</option>
      </select>
      <div className="flex justify-center items-center">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg "
          onClick={handleAddProduct}
        >
          Agregar Producto
        </button>
      </div>
    </div>
  );
};

export default AddDish;
