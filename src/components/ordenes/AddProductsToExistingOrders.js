import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import TacosSection from './TacosSection';
import MenudosSection from './MenudosSection';
import BebidasSection from './BebidasSection';
import ExtrasSection from './ExtrasSection';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DisplayOrders from './DisplayOrders';
import { TbRefresh } from 'react-icons/tb';
import OrderToConfirm from './OrderToConfirm';
import ConfirmAddProductsToExistingOrder from './ConfirmAddProductsToExistingOrder';

const AddProductsToExistingOrders = () => {
  const API_URL = process.env.REACT_APP_URL;

  const navigate = useNavigate();
  const location = useLocation();

  const { orderID, tableNum } = location.state;
  console.log(tableNum);

  const [mesero, setMesero] = useState('');

  const [toggleNewOrder, setToggleNewOrder] = useState(true);

  const [orderId, setOrderId] = useState(orderID);
  const [tableNumber, setTableNumber] = useState(tableNum);
  const [paraLlevar, setParaLlevar] = useState(false);
  console.log('para llevar:', paraLlevar);
  const [dishQuantity, setDishQuantity] = useState(Number);
  const [extra, setExtra] = useState('');
  const [nota, setNota] = useState('');
  const [order, setOrder] = useState({
    mesa: 0, // provide a default value for mesa
    paraLlevar: false,
    alimentos: [], // initialize as an empty array
    mesero: '',
    cuentaTotal: 0,
  });

  const [cuentaTotal, setCuentaTotal] = useState(Number); ///VERY IMPORTANT TO SEND WHEN HTTP REQUEST

  const handleReturn = () => {
    navigate('/ordenes');
  };

  const handleAddDishToOrder = (nombre, precio, categoria, id) => {
    console.log('se pidieron ', dishQuantity, nombre, extra, 'en la mesa ', id);
    console.log(nombre);
    console.log(precio);
    console.log(categoria);

    setOrder((prevOrder) => ({
      ...prevOrder,
      mesa: tableNumber,
      paraLlevar: paraLlevar,
      mesero: mesero,
      alimentos: [
        ...prevOrder.alimentos,
        {
          cantidad: dishQuantity,
          nombre: nombre,
          extra: extra,
          nota: nota,
          precio: precio,
          categoria: categoria,
        },
      ],
      total: cuentaTotal,
    }));

    setNota('');
    setExtra('');

    toast.success(
      `${dishQuantity} ${nombre} ${extra} ${nota} se agrego a la orden`,
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
  };

  const handleDeleteDishFromOrder = (index) => {
    console.log(index);
    setOrder((prevOrder) => {
      const updatedAlimentos = [...prevOrder.alimentos];
      updatedAlimentos.splice(index, 1);
      return {
        ...prevOrder,
        alimentos: updatedAlimentos,
      };
    });
  };

  const handleConfirmOrder = () => {
    console.log('productos agregados a la cuenta');

    const updatedOrder = {
      ...order,
      mesero: mesero,
      mesa: tableNumber,
      total: cuentaTotal,
    };

    axios
      .patch(`${API_URL}/addProductsToOrder/${orderID}`, updatedOrder)
      .then((response) => {
        console.log(response.data);
        // Show success notification
        toast.success('Productor Agregados Correctamente!', {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((e) => {
        console.log(e);
        // Show error notification
        toast.error(e, {
          position: toast.POSITION.TOP_CENTER,
        });
      });

    //////////////////POSTING NEW PRODUCTS TO EXISTING ORDER SO IT CAN HELP RENDER TACOS AND MENUDOS NEW TICKETS////////////////

    axios
      .post(`${API_URL}/postNewProductsToExistingOrder`, updatedOrder)
      .then((response) => {
        console.log(response.data);
        // Show success notification
        // toast.success('Orden Confirmada Correctamente!', {
        //   position: toast.POSITION.TOP_CENTER,
        // });
      })
      .catch((e) => {
        console.log('error posting new products added to existing order', e);
        // Show error notification
        // toast.error(e.response.data, {
        //   position: toast.POSITION.TOP_CENTER,
        // });
      });

    setToggleNewOrder(false);
  };

  const handleParaLllevar = () => {
    setParaLlevar(!paraLlevar);
    setTableNumber(Math.random);
  };
  useEffect(() => {
    console.log('order:', order);
  });

  return (
    <div className="px-4 py-2">
      {' '}
      {/* Add padding for overall content */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-md p-2 rounded-md"
          onClick={handleReturn}
        >
          Regresar
        </button>
        {/* You can add a mobile-friendly menu icon/button here */}
      </div>
      {toggleNewOrder && (
        <div>
          {tableNumber < 1 ? (
            <p className="mt-2 mb-4">Mesa: Para Llevar</p>
          ) : (
            <p className="mt-2 mb-4">Mesa: {tableNumber}</p>
          )}

          <div>
            <MenudosSection
              setDishQuantity={setDishQuantity}
              setExtra={setExtra}
              setNota={setNota}
              handleAddDishToOrder={handleAddDishToOrder}
            />

            <TacosSection
              setDishQuantity={setDishQuantity}
              setExtra={setExtra}
              setNota={setNota}
              handleAddDishToOrder={handleAddDishToOrder}
            />

            <BebidasSection
              setDishQuantity={setDishQuantity}
              handleAddDishToOrder={handleAddDishToOrder}
            />

            <ExtrasSection
              setDishQuantity={setDishQuantity}
              handleAddDishToOrder={handleAddDishToOrder}
            />
          </div>

          <ConfirmAddProductsToExistingOrder
            order={order}
            mesero={mesero}
            paraLlevar={paraLlevar}
            tableNumber={tableNumber}
            orderID={orderID}
            cuentaTotal={cuentaTotal}
            setCuentaTotal={setCuentaTotal}
            handleDeleteDishFromOrder={handleDeleteDishFromOrder}
            handleConfirmOrder={handleConfirmOrder}
          />
        </div>
      )}
    </div>
  );
};

export default AddProductsToExistingOrders;
