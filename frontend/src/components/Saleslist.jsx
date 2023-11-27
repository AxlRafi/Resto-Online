import React, { useState, useEffect } from "react";
import axios from "axios";

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(""); // Initialize the selected year
  const [years, setYears] = useState([]);
  const months = [...Array(12).keys()].map((month) => month + 1);

  useEffect(() => {
    getSales();
  }, [selectedMonth, selectedYear]);

  const getSales = async () => {
    try {
      let params = {
        year: selectedYear,
      };

      if (selectedMonth) {
        params.month = selectedMonth;
      }

      const response = await axios.get("http://localhost:5000/sales", {
        params: params,
      });

      console.log(selectedYear);
      console.log(selectedMonth);
      const uniqueYears = Array.from(
        new Set(
          response.data.sales.map((sale) =>
            new Date(sale.date_sales).getFullYear()
          )
        )
      );

      setSales(response.data.sales);
      setYears(uniqueYears); // Always update the years state
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  const calculateTotal = () => {
    return sales.reduce((total, sale) => total + sale.sum, 0);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div>
      <h1 className="title">Sales</h1>
      <h2 className="subtitle">List of Sales</h2>
      <div>
        <label>Filter by Month:</label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value="">All</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <label>Year:</label>
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">All</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

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
