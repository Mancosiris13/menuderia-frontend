import { useEffect } from 'react';

const ConfirmAddProductsToExistingOrder = ({
  order,
  mesero,
  paraLlevar,
  tableNumber,
  orderID,
  cuentaTotal,
  setCuentaTotal,
  handleDeleteDishFromOrder,
  handleConfirmOrder,
}) => {
  console.log('cuenta total: ', cuentaTotal);

  useEffect(() => {
    // Calculate the total count when the "order" prop changes
    let newCuentaTotal = 0;
    order.alimentos.forEach((alimento) => {
      newCuentaTotal += alimento.precio * alimento.cantidad;
    });
    setCuentaTotal(newCuentaTotal);
  }, [order, cuentaTotal]); // Listen for changes in the "order" prop to recalculate the total count

  return (
    <div className="text-center mb-10">
      {order.alimentos.length > 0 && (
        <>
          <p className="font-bold text-lg">Orden</p>
          <p className="mb-4">Mesero: {mesero}</p>
          {tableNumber < 1 ? (
            <p className="mb-4">Para Llevar</p>
          ) : (
            <p className="mb-4">Mesa: {tableNumber}</p>
          )}

          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="py-1 px-2 bg-green-400 text-black text-center">
                  Cantidad
                </th>
                <th className="py-1 px-2 bg-green-400 text-black text-center">
                  Alimento
                </th>
                <th className="py-1 px-2 bg-green-400 text-black text-center">
                  Extra
                </th>
                <th className="py-1 px-2 bg-green-400 text-black text-center">
                  Nota
                </th>
                {/* <th className="py-1 px-2 bg-green-400 text-black text-center">
                  Precio
                </th> */}
                <th className="py-1 px-2 bg-green-400 text-black text-center">
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody>
              {order.alimentos.map((alimento, index) => (
                <tr key={index}>
                  <td className="py-1 px-2 border text-center">
                    {alimento.cantidad}
                  </td>
                  <td className="py-1 px-2 border text-center">
                    {alimento.nombre}
                  </td>
                  <td className="py-1 px-2 border text-center">
                    {alimento.extra}
                  </td>
                  <td className="py-1 px-2 border text-center">
                    {alimento.nota}
                  </td>
                  {/* <td className="py-1 px-2 border text-center">
                    {alimento.precio}
                  </td> */}
                  <td className="py-1 px-2 border text-center">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-center"
                      onClick={() => handleDeleteDishFromOrder(index)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center pt-3 ">
            <p className="mb-4">Total: {cuentaTotal}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded "
              onClick={handleConfirmOrder}
            >
              Confirmar Orden
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ConfirmAddProductsToExistingOrder;
