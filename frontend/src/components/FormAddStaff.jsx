import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddStaff = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workDay, setWorkDay] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveStaff = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/staffs", {
        name: name,
        email: email,
        password: password,
        work_day: workDay,
      });
      navigate("/staffs");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Staff Members</h1>
      <h2 className="subtitle">Add New Staff Member</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveStaff}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Staff Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Work Day</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={workDay}
                    onChange={(e) => setWorkDay(e.target.value)}
                    placeholder="Work Day"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddStaff;
