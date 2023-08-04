import { useEffect, useState } from 'react';
import axios from 'axios';
import TacosSection from './TacosSection';
import MenudosSection from './MenudosSection';
import BebidasSection from './BebidasSection';
import OrderToConfirm from './OrderToConfirm';
import { useNavigate } from 'react-router-dom';

const DisplayOrders = () => {
  const API_URL = process.env.REACT_APP_URL;

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addProductsToOrder, setAddProductsToOrder] = useState(false);
  const [tableNumberToAddProducts, setTableNumberToAddProducts] =
    useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get(`${API_URL}/orders`)
        .then((response) => {
          const sortedOrders = response.data.sort((a, b) => a.mesa - b.mesa);
          // Step 1: Filter orders with table number less than 50
          const filteredOrders = sortedOrders.filter(
            (order) => order.mesa < 50
          );

          // Step 2: Set the filtered orders to the state
          setOrders(filteredOrders);
          setLoading(false); // Set loading to false after orders are fetched
        })
        .catch((error) => {
          console.log(error);
          setLoading(false); // Set loading to false after orders are fetched
        });
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <img
            src="https://thumbs.gfycat.com/AnimatedImpureAmericancicada-max-1mb.gif"
            alt="loading gift"
            className="block"
            style={{ display: 'block' }}
          />
          <p className="text-xl block">Cargando Ordenes...</p>
        </div>
      </div>
    );
  }

  const handleAddProductsToOrder = (orderID, tableNum) => {
    navigate('/addProductToOrder', { state: { orderID, tableNum } });
  };

  return (
    <div className="container mx-auto px-4 py-8 h-screen">
      <p className="text-xl font-bold mb-4 text-center">Ordenes Activas</p>
      {orders.length === 0 ? (
        <h1 className="text-center text-2xl font-bold my-auto">
          Agregar Ordenes
        </h1>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-black p-4 flex flex-col justify-between"
            >
              {/* <p className="font-bold mb-2">Order ID: {order._id}</p> */}

              {order.mesa < 1 ? (
                <p className="font-bold">Para llevar</p>
              ) : (
                <p className="font-bold mb-2">Mesa: {order.mesa} </p>
              )}

              <p className="font-semibold mb-2">Mesero: {order.mesero}</p>
              <div className="mb-2">
                <table>
                  <thead>
                    <tr>
                      {/* <th>Quantity</th>
                      <th>Food</th>
                      <th>Extra</th>
                      <th>Note</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {order.alimentos.map((alimento) => (
                      <li key={alimento._id} className="list-none mb-1">
                        {alimento.cantidad} x {alimento.nombre} {alimento.extra}{' '}
                        {alimento.nota}
                      </li>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <p className="mb-2">Total: {order.total}</p>
                <div className=" flex justify-around">
                  {/* <button className=" border p-1 border-solid border-green-500 bg-green-500 hover:bg-green-700 rounded-md">
                    Imprimir Ticket
                  </button> */}
                  <button
                    className=" border p-1 border-solid border-green-500 bg-green-500 hover:bg-green-700 rounded-md ml-1"
                    onClick={() =>
                      handleAddProductsToOrder(order._id, order.mesa)
                    }
                  >
                    Agregar mas productos
                  </button>
                </div>
                {/* <div>
                  {addProductsToOrder &&
                  tableNumberToAddProducts === order.mesa ? (
                    <>
                      <MenudosSection />
                      <TacosSection />
                      <BebidasSection />
                    </>
                  ) : (
                    <></>
                  )}
                </div> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayOrders;
