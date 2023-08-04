import axios from 'axios';
import React, { useState, useEffect } from 'react';

const BebidasSection = ({ setDishQuantity, handleAddDishToOrder }) => {
  const API_URL = process.env.REACT_APP_URL;

  const [bebidas, setBebidas] = useState([]);
  const [toggleBebidas, setToggleBebidas] = useState(false);

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
  }, []);
  return (
    <div>
      <button
        className=" w-28 block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => setToggleBebidas(!toggleBebidas)}
      >
        Bebidas
      </button>

      {toggleBebidas && (
        <div className="block">
          {bebidas.map((bebida) => (
            <div key={bebida._id}>
              <span className="mr-4 mb-2">
                {bebida.nombre} ... ${bebida.precio}
              </span>
              <div>
                <select
                  className="border border-black w-20 text-center font-semibold bg-slate-400"
                  onChange={(event) => setDishQuantity(event.target.value)}
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
                </select>
                <button
                  className="border border-gray-950 border-solid bg-blue-400"
                  onClick={() =>
                    handleAddDishToOrder(
                      bebida.nombre,
                      bebida.precio,
                      bebida.categoria,
                      bebida._id
                    )
                  }
                >
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BebidasSection;
