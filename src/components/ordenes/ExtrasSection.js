import axios from 'axios';
import React, { useState, useEffect } from 'react';

const ExtrasSection = ({ setDishQuantity, handleAddDishToOrder, setNota }) => {
  const API_URL = process.env.REACT_APP_URL;

  const [extras, setExtras] = useState([]);
  const [toggleExtras, setToggleExtras] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL} /extras`)
      .then((response) => {
        console.log(response.data);
        setExtras(response.data); // Update the tacos state with the response data
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <button
        className="w-28 block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => setToggleExtras(!toggleExtras)}
      >
        Extras
      </button>
      {toggleExtras && (
        <div className="block">
          {extras.map((extra) => (
            <div key={extra._id}>
              <span className="mr-4 mb-2">
                {extra.nombre} ... ${extra.precio}
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

                <input
                  className="border border-black w-32 text-center text-black font-bold"
                  placeholder="Nota"
                  onChange={(event) => setNota(event.target.value)}
                />
                <button
                  className="border border-gray-950 border-solid bg-blue-400"
                  onClick={() =>
                    handleAddDishToOrder(
                      extra.nombre,
                      extra.precio,
                      extra.categoria,
                      extra._id
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

export default ExtrasSection;
