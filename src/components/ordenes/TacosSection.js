import axios from 'axios';
import React, { useState, useEffect } from 'react';
const TacosSection = ({
  setDishQuantity,
  setExtra,
  setNota,
  handleAddDishToOrder,
}) => {
  const API_URL = process.env.REACT_APP_URL;

  const [tacos, setTacos] = useState([]);
  const [toggleTacos, setToggleTacos] = useState(false);
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
  }, []);
  return (
    <div>
      <button
        className="w-28 block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => setToggleTacos(!toggleTacos)}
      >
        Tacos
      </button>
      {toggleTacos && (
        <div className="block">
          {tacos.map((taco) => (
            <div key={taco._id} className="rounded-md p-4 bg-gray-100 my-2">
              <span className="mr-4 mb-2 font-bold text-lg">
                {taco.nombre} ... ${taco.precio}
              </span>
              <div className="flex items-center">
                <div>
                  <select
                    className="border border-black w-32 ml-2 mb-1 text-center font-semibold bg-white rounded"
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
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                  </select>
                  {taco.nombre === 'Taco Barbacoa' && (
                    <select
                      className="border border-black w-32 ml-2 mb-1 text-center font-semibold bg-white rounded"
                      onChange={(event) => setExtra(event.target.value)}
                    >
                      <option>Extra</option>
                      <option value="Blando">Blando</option>
                      <option value="Medio">Medio</option>
                      <option value="Dorado">Dorado</option>
                    </select>
                  )}
                  {taco.nombre === 'Taco Barbacoa con Queso' && (
                    <select
                      className="border border-black w-32 ml-2 mb-1 text-center font-semibold bg-white rounded"
                      onChange={(event) => setExtra(event.target.value)}
                    >
                      <option>Extra</option>
                      <option value="Blando">Blando</option>
                      <option value="Medio">Medio</option>
                      <option value="Dorado">Dorado</option>
                    </select>
                  )}
                  {taco.nombre !== 'Taco Barbacoa' &&
                    taco.nombre !== 'Taco Barbacoa con Queso' && (
                      <select
                        className="border border-black w-32 ml-2 mb-1 text-center font-semibold bg-white rounded"
                        onChange={(event) => setExtra(event.target.value)}
                      >
                        <option>Extra</option>
                        <option value="Con todo">Con todo</option>
                        <option value="Solo Cebolla">Solo Cebolla</option>
                        <option value="Solo Cilantro">Solo Cilantro</option>
                        <option value="Sin nada">Sin nada</option>
                      </select>
                    )}
                  <input
                    className="border border-black w-32 ml-2 mb-1 text-center text-black font-bold rounded"
                    placeholder="Nota"
                    onChange={(event) => setNota(event.target.value)}
                  />

                  <button
                    className="border border-black w-32 ml-2 bg-blue-400 text-white rounded  px-2 py-1 "
                    onClick={() =>
                      handleAddDishToOrder(
                        taco.nombre,
                        taco.precio,
                        taco.categoria,
                        taco._id
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

export default TacosSection;
