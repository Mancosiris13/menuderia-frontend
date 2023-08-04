import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsArrowUpRightSquareFill } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';
import { PiArchiveBoxFill } from 'react-icons/pi';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DisplayOrdersCaja = () => {
  const API_URL = process.env.REACT_APP_URL;

  const [orders, setOrders] = useState([]);
  const [showOrder, setShowOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

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
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleShowOrder = (order) => {
    console.log(order.mesa);
    setShowOrder(!showOrder);
    setSelectedOrder(order);
  };

  const printOrder = (order) => {
    if (!order) return;

    const printContent = generatePrintContent(order);
    const printWindow = window.open('', '_blank', 'width=500,height=800');

    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error(
        'No se pudo abrir la ventana emergente. Verifica la configuración de tu navegador.'
      );
    }
  };

  const generatePrintContent = (order) => {
    const mesaLabel = order.mesa < 1 ? 'Para Llevar' : `Mesa: ${order.mesa}`;
    const content = `
      <html>
        <style>
          .no-bullet {
            list-style-type: none;
            padding-left: 0;
          }
          .order-div {
            border: 1px solid black;
            padding: 10px;
            margin-bottom: 20px;
            width: 7cm;
            height: auto;
          }
          .total-class {
            font-weight: bold;
          }
          .bottom-div {
            height: 10px;
          }
        </style>
        <body>
          <div class="order-div">
            <p></p>
            <p>Menuderia Ornelas</p>
            <p>${mesaLabel}</p>
            <p>Mesero: ${order.mesero}</p>
            <!-- Using <p> elements -->
            ${order.alimentos
              .map(
                (alimento) =>
                  `<p>
                     <span>x${alimento.cantidad} ${alimento.nombre}</span>
                     <span>$${alimento.cantidad * alimento.precio}</span>
                   </p>`
              )
              .join('')}
            -
            <p class="total-class">Total: $${order.total}</p>
            -
            <p class="total-class">Gracias por su preferencia</p>-
            <div class="bottom-div"></div>
          </div>
        </body>
      </html>
    `;
    return content;
  };

  const handleArchiveOrder = (tableNumber) => {
    axios
      .patch(`${API_URL}/updateTableNumber/${tableNumber}`)
      .then((response) => {
        console.log(response);
        toast.success('Orden Archivada Correctamente!', {
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

    axios
      .patch(`${API_URL}/updateTableNumberOfNewProductsAdded/${tableNumber}`)
      .then((response) => {
        console.log(response);
        // toast.success('Orden Archivada Correctamente!', {
        //   position: toast.POSITION.TOP_CENTER,
        // });
      })
      .catch((e) => {
        console.log(e.response.data);
        // Show error notification
        // toast.error(e.response.data, {
        //   position: toast.POSITION.TOP_CENTER,
        // });
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 h-screen">
      <p className="text-xl font-bold mb-4 text-center">Ordenes Activas</p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {orders.map((order) => (
          <div key={order._id} style={{ flex: '1' }}>
            <div className="border border-black m-2 p-1 printable-content">
              <div className="flex-col md:flex-row m-1">
                <div className="flex justify-between">
                  <p className="mb-2 md:mb-0 font-bold">
                    Mesa: {order.mesa < 1 ? 'Para Llevar' : order.mesa}
                  </p>
                  <PiArchiveBoxFill
                    className="text-red-700 text-2xl cursor-pointer"
                    onClick={() => handleArchiveOrder(order.mesa)}
                  />
                </div>
                <p>Mesero: {order.mesero}</p>
              </div>
              <ul className="list-disc mt-2">
                {order.alimentos.map((alimento) => (
                  <li
                    key={alimento._id}
                    className="list-none mb-1"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>
                      {alimento.cantidad} x {alimento.nombre}
                    </span>
                    <span>${alimento.cantidad * alimento.precio}</span>
                  </li>
                ))}
                <p className="font-bold">Total: {order.total}</p>
              </ul>
            </div>
            <button
              className="border border-green-700 rounded-md bg-green-600 p-1"
              onClick={() => printOrder(order)}
            >
              Imprimir Ticket de Pago Mesa{' '}
              {order.mesa < 1 ? 'Para Llevar' : order.mesa}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayOrdersCaja;
