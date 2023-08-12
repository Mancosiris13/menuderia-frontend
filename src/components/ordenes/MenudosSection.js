import axios from 'axios';
import React, { useState, useEffect } from 'react';

const MenudosSection = ({
  setDishQuantity,
  setExtra,
  setNota,
  handleAddDishToOrder,
}) => {
  const API_URL = process.env.REACT_APP_URL;

  const [menudos, setMenudos] = useState([]);
  const [toggleMenudos, setToggleMenudos] = useState(false);

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
  }, []);

  return (
    <div>
      <button
        className="w-28 block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => setToggleMenudos(!toggleMenudos)}
      >
        Menudos
      </button>
      {toggleMenudos && (
        <div className="block">
          {menudos.map((menudo) => (
            <div key={menudo._id} className="rounded-md p-4 bg-gray-100 my-2  ">
              <span className="mr-4 mb-2 font-bold text-lg">
                {menudo.nombre} ... ${menudo.precio}
              </span>
              <div className="flex items-center ">
                <div>
                  <select
                    className="border border-black w-32  ml-2 mb-1 text-center font-semibold bg-white rounded"
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
                  <select
                    className="border border-black w-32  ml-2 mb-1 text-center font-semibold bg-white rounded "
                    onChange={(event) => setExtra(event.target.value)}
                  >
                    <option>Color</option>
                    <option value="Blanco">Blanco</option>
                    <option value="Rojo">Rojo</option>
                  </select>
                  <input
                    className="border border-black w-32 ml-2 mb-1 text-center text-black font-bold rounded"
                    placeholder="Nota"
                    onChange={(event) => setNota(event.target.value)}
                  />

                  <button
                    className="border border-black bg-blue-400  w-32 text-white rounded ml-2 px-2 py-1 "
                    onClick={() =>
                      handleAddDishToOrder(
                        menudo.nombre,
                        menudo.precio,
                        menudo.categoria,
                        menudo._id
                      )
                    }
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenudosSection;
