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
import { Link } from 'react-router-dom';

const Ordenes = () => {
  const API_URL = process.env.REACT_APP_URL;

  const [mesero, setMesero] = useState('');

  const [toggleNewOrder, setToggleNewOrder] = useState(false);

  const [mesaNumber, setMesaNumber] = useState(Number);
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
    tacosTicketPrinted: false,
    menudoTicketPrinted: false,

    total: 0,
  });

  const [cuentaTotal, setCuentaTotal] = useState(Number);

  const handleNewOrder = () => {
    setToggleNewOrder(!toggleNewOrder);
  };

  // const handleRefreshOrders = () => {
  //   window.location.reload();
  // };

  const handleAddDishToOrder = (nombre, precio, categoria, id) => {
    console.log(
      'se pidieron ',
      dishQuantity,
      nombre,
      extra,
      'en la mesa ',
      mesaNumber
    );
    console.log(nombre);
    console.log(precio);
    console.log(categoria);

    setOrder((prevOrder) => ({
      ...prevOrder,
      mesa: mesaNumber,
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
    console.log('orden confirmada');

    const updatedOrder = {
      ...order,
      mesero: mesero,
      mesa: mesaNumber,
      total: cuentaTotal,
    };

    axios
      .post(`${API_URL}/createOrder`, updatedOrder)
      .then((response) => {
        console.log(response.data);
        // Show success notification
        toast.success('Orden Confirmada Correctamente!', {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((e) => {
        console.log(e.response.data);
        // Show error notification
        toast.error(e.response.data, {
          position: toast.POSITION.TOP_CENTER,
        });
      });

    setToggleNewOrder(false);

    setOrder({
      mesa: 0, // provide a default value for mesa
      paraLlevar: false,
      alimentos: [], // initialize as an empty array
      mesero: '',
      tacosTicketPrinted: false,
      menudoTicketPrinted: false,

      total: 0,
    });
  };

  const handleParaLllevar = () => {
    setParaLlevar(!paraLlevar);
    setMesaNumber(Math.random);
  };
  useEffect(() => {
    console.log('order:', order);
  });

  return (
    <div>
      <div className=" mt-4 flex justify-around items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-md p-2 rounded-md "
          onClick={handleNewOrder}
        >
          Nueva Orden
        </button>
        <Link to={'/ordenes'}>
          <TbRefresh
            className=" text-3x cursor-pointer"
            // onClick={handleRefreshOrders}
          />
        </Link>
      </div>

      {toggleNewOrder && (
        <>
          <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row justify-around mt-8 space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/2 ">
                <label className="block mb-2 font-bold text-lg text-center">
                  Mesero:
                </label>
                <select
                  className="w-full border border-black p-2 bg-white rounded-md text-center"
                  onChange={(event) => setMesero(event.target.value)}
                  placeholder="Seleccionar Mesero"
                  value={mesero}
                >
                  <option value="">Seleccionar</option>
                  <option value="Eduardo">Eduardo</option>
                  <option value="Javier">Javier</option>
                  <option value="Valeria">Valeria</option>
                  <option value="Angel">Angel</option>
                  <option value="Chuy">Chuy</option>
                  <option value="Osiris">Osiris</option>
                </select>
              </div>
              <div className="w-full md:w-1/4 flex items-center text-center">
                <label className="block mr-2 text-center">Para llevar</label>
                <input
                  type="checkbox"
                  onChange={handleParaLllevar}
                  checked={paraLlevar}
                  className="h-6 w-6"
                />
              </div>
            </div>

            {!paraLlevar && (
              <>
                <div className="mt-4 ">
                  <label className="block mb-2 text-center font-bold text-lg">
                    Mesa:
                  </label>
                  <select
                    className="w-full border border-black p-2  bg-white rounded-md text-center"
                    onChange={(event) => setMesaNumber(event.target.value)}
                    value={mesaNumber}
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                  </select>
                </div>
              </>
            )}

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
          <OrderToConfirm
            order={order}
            mesero={mesero}
            paraLlevar={paraLlevar}
            mesaNumber={mesaNumber}
            cuentaTotal={cuentaTotal}
            setCuentaTotal={setCuentaTotal}
            handleDeleteDishFromOrder={handleDeleteDishFromOrder}
            handleConfirmOrder={handleConfirmOrder}
          />
        </>
      )}

      {!toggleNewOrder && (
        <div>
          <DisplayOrders />
        </div>
      )}
    </div>
  );
};

export default Ordenes;
