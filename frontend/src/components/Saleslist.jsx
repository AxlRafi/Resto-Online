// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const SalesList = () => {
//   const [sales, setSales] = useState([]);
//   useEffect(() => {
//     getSales();
//   }, []);

//   const getSales = async () => {
//     const response = await axios.get("http://localhost:5000/sales");
//     setSales(response.data);
//   };

//   // Calculate the total sum
//   const calculateTotal = () => {
//     return sales.reduce((total, sales) => total + sales.sum, 0);
//   };

//   return (
//     <div>
//       <h1 className="title">Sales</h1>
//       <h2 className="subtitle">List of Sales</h2>
//       <table className="table is-striped is-fullwidth">
//         <thead>
//           <tr>
//             <th>No</th>
//             <th>Product Name</th>
//             <th>Quantity</th>
//             <th>Price</th>
//             <th>Sum</th>
//             <th>Tanggal Pembelian</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sales.map((sales, index) => (
//             <tr key={sales.uuid}>
//               <td>{index + 1}</td>
//               <td>{sales.product_name}</td>
//               <td>{sales.qty}</td>
//               <td>{sales.price}</td>
//               <td>{sales.sum}</td>
//               <td>{sales.created_at}</td>
//               <td></td>
//             </tr>
//           ))}
//         </tbody>
//         <tfoot>
//           <tr>
//             <td colSpan="4">Total</td>
//             <td>{calculateTotal()}</td>
//             <td colSpan="2"></td>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//   );
// };

// export default SalesList;

import React, { useState, useEffect } from "react";
import axios from "axios";

const SalesList = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getSales();
  }, []);

  const getSales = async () => {
    const response = await axios.get("http://localhost:5000/sales");
    setSales(response.data);
  };

  const calculateTotal = () => {
    return sales.reduce((total, sale) => total + sale.sum, 0);
  };

  return (
    <div>
      <h1 className="title">Sales</h1>
      <h2 className="subtitle">List of Sales</h2>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Sum</th>
            <th>Cashier</th>
            <th>Date of Sales</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={sale.uuid}>
              <td>{index + 1}</td>
              <td>{sale.product_name}</td>
              <td>{sale.qty}</td>
              <td>{sale.price}</td>
              <td>{sale.sum}</td>
              <td>{sale.staff_name}</td>
              <td>{sale.date_sales}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Total</td>
            <td>{calculateTotal()}</td>
            <td colSpan="2"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default SalesList;
