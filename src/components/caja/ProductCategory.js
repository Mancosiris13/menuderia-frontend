import React, { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { BiSave } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { MdTransitEnterexit } from 'react-icons/md';

import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCategory = ({
  categoryName,
  data,
  reloadProducts,
  setReloadProducts,
}) => {
  const API_URL = process.env.REACT_APP_URL;

  console.log(reloadProducts);
  const [editProductID, setEditProductID] = useState(null);

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);
  console.log('nombre: ', nombre);
  console.log('precio: ', precio);

  const handleEditProduct = (productID) => {
    setEditProductID(productID);
  };

  const handleSaveProductEdited = () => {
    if (nombre.length > 0 && precio !== 0) {
      axios
        .patch(`${API_URL}/products/${editProductID}`, {
          nombre,
          precio: Number(precio),
        })
        .then(() => {
          toast.success('Producto Editado Correctamente!', {
            position: toast.POSITION.TOP_CENTER,
          });

          setEditProductID(null);
          setNombre(String);
          setPrecio(Number);
        })
        .finally(() => {
          setReloadProducts(true);

          // Set reloadProducts back to false after 1 second
          setTimeout(() => {
            setReloadProducts(false);
          }, 1000);
        })
        .catch((e) => {
          toast.error(e, {
            position: toast.POSITION.TOP_CENTER,
          });
          console.log(e);
        });
    }
  };

  const handleDeleteProduct = (productId, categoria) => {
    axios
      .delete(`${API_URL}/deleteProduct/${productId}`)
      .then(() => {
        toast.success('Producto Eliminado Correctamente!', {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .finally(() => {
        setReloadProducts(true);

        // Set reloadProducts back to false after 1 second
        setTimeout(() => {
          setReloadProducts(false);
        }, 1000);
      })
      .catch((e) => {
        toast.error(e, {
          position: toast.POSITION.TOP_CENTER,
        });
        setReloadProducts(!reloadProducts);
        setTimeout(() => {
          setReloadProducts(false);
        }, 1);
        console.log(e);
      });
    console.log(categoria);
  };
  return (
    <div className="m-10">
      <h1 className="text-3xl font-bold">{categoryName}</h1>

      {data.map((product) => (
        <div className="" key={product._id}>
          <ul className="flex justify-between items-center my-2">
            {!editProductID || editProductID !== product._id ? (
              <>
                <li className="flex-grow">{product.nombre}</li>
                <li className="ml-4 text-right">${product.precio}</li>
              </>
            ) : (
              <>
                <input
                  placeholder={product.nombre}
                  className="border border-black rounded-md text-center"
                  onChange={(event) => setNombre(event.target.value)}
                />
                <input
                  placeholder={product.precio}
                  className=" ml-2 w-16 border border-black rounded-md text-center "
                  onChange={(event) => setPrecio(event.target.value)}
                />
              </>
            )}

            {!editProductID || editProductID !== product._id ? (
              <AiFillEdit
                className="text-blue-700 text-xl m-1 cursor-pointer"
                onClick={() => handleEditProduct(product._id)}
              />
            ) : (
              <>
                <MdTransitEnterexit
                  className="text-green-500 text-xl m-1 cursor-pointer"
                  onClick={() => setEditProductID(null)}
                />
                <BiSave
                  className="text-blue-700 text-xl m-1 cursor-pointer"
                  onClick={handleSaveProductEdited}
                />
                <AiFillDelete
                  className="text-red-700 text-xl m-1 cursor-pointer"
                  onClick={() =>
                    handleDeleteProduct(product._id, product.categoria)
                  }
                />
              </>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProductCategory;
