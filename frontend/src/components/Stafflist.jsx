import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const StaffList = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    getStaff();
  }, []);

  const getStaff = async () => {
    try {
      const response = await axios.get("http://localhost:5000/staffs");
      setStaff(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteStaff = async (staffId) => {
    try {
      await axios.delete(`http://localhost:5000/staffs/${staffId}`);
      getStaff();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="title">Staff</h1>
      <h2 className="subtitle">List of Staff</h2>
      <Link to="/staffs/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Work Day</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((staffMember, index) => (
            <tr key={staffMember.uuid}>
              <td>{index + 1}</td>
              <td>{staffMember.name}</td>
              <td>{staffMember.email}</td>
              <td>{staffMember.work_day}</td>
              <td>
                <Link
                  to={`/staffs/edit/${staffMember.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteStaff(staffMember.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffList;
