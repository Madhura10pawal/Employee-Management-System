import React, { useEffect, useState } from "react";

function App() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/employees")
      .then(res => res.json())
      .then(data => setList(data));
  }, []);

  const add = async () => {
    const res = await fetch("http://localhost:5000/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role, salary })
    });
    const data = await res.json();
    setList([...list, data]);
  };

  
  
  const remove = async (id) => {
    await fetch(`http://localhost:5000/employees/${id}`, {
      method: "DELETE"
    });
    setList(list.filter(e => e._id !== id));
  };

  return (
    <div>
      <h3>Employee Management</h3>

      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Role" onChange={e => setRole(e.target.value)} />
      <input placeholder="Salary" onChange={e => setSalary(e.target.value)} />

      <button onClick={add}>Add</button>

      {list.map(e => (
        <p key={e._id}>
          {e.name} - {e.role} - ₹{e.salary}
          <button onClick={() => remove(e._id)}>Delete</button>
        </p>
      ))}
    </div>
  );
}

export default App;
