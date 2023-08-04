import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AddDish from './AddProduct';
import ProductCategory from './ProductCategory';
import { AiOutlineWarning } from 'react-icons/ai';

const AdministrarAlimentos = () => {
  const API_URL = process.env.REACT_APP_URL;

  const [reloadProducts, setReloadProducts] = useState(false);
  const [tacos, setTacos] = useState([]);
  const [menudos, setMenudos] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [extras, setExtras] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/tacos`)
      .then((response) => {
        console.log(response.data);
        setTacos(response.data); // Update the tacos state with the response data
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reloadProducts]);

  useEffect(() => {
    axios
      .get(`${API_URL}/menudos`)
      .then((response) => {
        console.log(response.data);
        setMenudos(response.data); // Update the tacos state with the response data
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reloadProducts]);
  useEffect(() => {
    axios
      .get(`${API_URL}/bebidas`)
      .then((response) => {
        console.log(response.data);
        setBebidas(response.data); // Update the tacos state with the response data
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reloadProducts]);

  useEffect(() => {
    axios
      .get(`${API_URL}/extras`)
      .then((response) => {
        console.log(response.data);
        setExtras(response.data); // Update the tacos state with the response data
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reloadProducts]);

  return (
    <>
      <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-md mb-4 flex justify-start items-center text-lg text-center">
        {/* Delete this div when no need to update name an price for apply changes */}
        <AiOutlineWarning className="inline mr-2 " />
        <h1 className="inline mr-2 ">
          {' '}
          Por el momento se necesita actualizar nombre y precio (puedes volver a
          escribir el mismo precio o nombre si es el mismo)
        </h1>
        <AiOutlineWarning className="inline mr-2 " />
      </div>
      <div className="flex justify-between">
        <ProductCategory
          categoryName={'Tacos'}
          data={tacos}
          reloadProducts={reloadProducts}
          setReloadProducts={setReloadProducts}
        />
        <ProductCategory
          categoryName={'Menudos'}
          data={menudos}
          reloadProducts={reloadProducts}
          setReloadProducts={setReloadProducts}
        />
        <ProductCategory
          categoryName={'Bebidas'}
          data={bebidas}
          reloadProducts={reloadProducts}
          setReloadProducts={setReloadProducts}
        />
        <ProductCategory
          categoryName={'Extras'}
          data={extras}
          reloadProducts={reloadProducts}
          setReloadProducts={setReloadProducts}
        />
      </div>
    </>
  );
};

export default AdministrarAlimentos;
