import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DisplayNewTacosAddedToOrders from './DisplayNewTacosAddedToOrders';

import '../PrintableOrder.css';

const DisplayOnlyTacos = () => {
  const API_URL = process.env.REACT_APP_URL;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(orders);
  const [orderToPrint, setOrderToPrint] = useState(null); // State para almacenar la orden que se quiere imprimir

  const [tacosTicketPrinted, setTacosTicketPrinted] = useState(false);
  console.log(tacosTicketPrinted);

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get(`${API_URL}/orders`)
        .then((response) => {
          const orders = response.data;
          // Step 1: Filter orders with table number less than 50
          const filteredOrders = orders.filter((order) => order.mesa < 50);

          // Step 2: Set the filtered orders to the state
          setOrders(filteredOrders);
          setLoading(false); // Set loading to false after orders are fetched
        })
        .catch((error) => {
          console.error(error);
          setLoading(false); // Set loading to false after orders are fetched
        });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="text-center">
  //         <img
  //           src="https://thumbs.gfycat.com/AnimatedImpureAmericancicada-max-1mb.gif"
  //           alt="loading gift"
  //           className="block"
  //           style={{ display: 'block' }}
  //         />
  //         <p className="text-xl block">Cargando Ordenes...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // Function to trigger printing
  const handlePrint = (orderID) => {
    const orderToPrintData = orders.find((order) => order._id === orderID);
    printOrder(orderToPrintData);
  };

  // Buscar la orden específica que se quiere imprimir
  const orderToPrintData = orders.find((order) => order._id === orderToPrint);

  // Lógica para imprimir la orden (abrir ventana emergente)
  const printOrder = (order) => {
    if (!order) return;

    const printContent = generatePrintContent(order); // Genera el contenido que deseas imprimir
    const printWindow = window.open('', '_blank', 'width=500,height=800'); // Abre una ventana emergente

    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print(); // Ejecuta el comando de impresión en la ventana emergente
    } else {
      console.error(
        'No se pudo abrir la ventana emergente. Verifica la configuración de tu navegador.'
      );
    }
  };

  // Genera el contenido HTML que deseas imprimir
  const generatePrintContent = (order) => {
    // Puedes personalizar esta parte para diseñar el formato que deseas imprimir
    const mesaLabel = order.mesa < 1 ? 'Para Llevar' : `Mesa: ${order.mesa}`;
    const content = `
      <html>
        <style>
          /* Aquí puedes agregar estilos de impresión */
          .no-bullet {
            list-style-type: none; /* Quita los puntos de la lista */
            padding-left: 0; /* Quita el padding izquierdo para que no haya espacios */
          }
          .order-div {
            border: 1px solid black; /* Agrega un borde de color negro al div */
            padding: 10px; /* Añade un espacio interno para que el contenido no esté pegado al borde */
            margin-bottom: 20px; /* Agrega margen inferior para separar las órdenes */
            width: 6cm;
          }
        </style>
        <body>
          <div class="order-div">
          <p>${mesaLabel}</p>
            <p>Mesero: ${order.mesero}</p>
            <ul class="no-bullet">
              ${order.alimentos
                .filter(
                  (alimento) =>
                    alimento.categoria === 'Tacos' &&
                    Math.abs(
                      new Date(alimento.createdAt).getTime() -
                        new Date(order.createdAt).getTime()
                    ) <= 1500
                )
                .map(
                  (alimento) =>
                    `<li>x${alimento.cantidad} ${alimento.nombre} ${alimento.extra}, ${alimento.nota}</li>`
                )
                .join('')}
              -<li></li>-
            </ul>
          </div>
        </body>
      </html>
    `;
    return content;
  };

  // Llamada a la función de impresión cuando se actualice el state orderToPrint
  useEffect(() => {
    printOrder(orderToPrintData);
  }, [orderToPrintData]);

  const handleUpdateTacosTicket = (OrderID) => {
    setTacosTicketPrinted(!tacosTicketPrinted);

    axios
      .patch(`${API_URL}/updateTickets/${OrderID}`, {
        tacosTicketPrinted,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Check if there are any tacos in any of the orders

  return (
    <>
      <div className="container">
        <h1 className="text-center text-2xl font-bold mb-4">Tacos</h1>
        {orders.length <= 0 && (
          <h1 className="text-center text-2xl font-bold mb-4 text-red-700">
            Iniciar Ordenes
          </h1>
        )}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {orders
            .filter((order) =>
              order.alimentos.some(
                (alimento) =>
                  alimento.categoria === 'Tacos' &&
                  Math.abs(
                    new Date(alimento.createdAt).getTime() -
                      new Date(order.createdAt).getTime()
                  ) <= 1500
              )
            )
            .map((order) => (
              <div
                key={order._id}
                style={{ flex: '1' }}
                className={`border border-black m-2 printable-content p-1 ${
                  order.tacosTicketPrinted ? 'bg-blue-200' : ''
                }`}
              >
                <div className="md:flex-row m-1 flex justify-between">
                  <div>
                    <p className="mb-2 md:mb-0 font-bold">
                      Mesa: {order.mesa < 1 ? 'Para Llevar' : order.mesa}
                    </p>
                    <p>Mesero: {order.mesero}</p>
                  </div>
                  <div className="flex justify-between items-center text-xl">
                    <p className="inline mr-1">Ticket Impreso:</p>
                    <input
                      type="checkbox"
                      onChange={() => handleUpdateTacosTicket(order._id)}
                      className="inline text-xl cursor-pointer"
                      checked={order.tacosTicketPrinted}
                    ></input>
                  </div>
                </div>
                {order.alimentos.map((alimento) => {
                  const alimentoCreatedAt = new Date(
                    alimento.createdAt
                  ).getTime();
                  const orderCreatedAt = new Date(order.createdAt).getTime();
                  const timeDifference = Math.abs(
                    alimentoCreatedAt - orderCreatedAt
                  );

                  // Check if 'alimentoCreatedAt' is within 1000 milliseconds (1 second) of 'orderCreatedAt'
                  if (
                    timeDifference <= 1500 &&
                    alimento.categoria === 'Tacos'
                  ) {
                    return (
                      <p key={alimento._id} className="mb-1">
                        x{alimento.cantidad} {alimento.nombre} {alimento.extra},{' '}
                        {alimento.nota}
                      </p>
                    );
                  }

                  return null; // If not within the range or not matching 'categoria', return null (nothing will be rendered)
                })}
                <button
                  className="border border-green-700 rounded-md bg-green-600 p-1"
                  onClick={() => handlePrint(order._id)}
                >
                  Imprimir Tacos Mesa:{' '}
                  {order.mesa < 1 ? 'Para Llevar' : order.mesa}
                </button>
              </div>
            ))}
        </div>
        <DisplayNewTacosAddedToOrders />
      </div>
    </>
  );
};

export default DisplayOnlyTacos;
