import { useState } from "react";
import "./App.css";
import {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "./redux";

function App() {
  const [limit, setLimit] = useState("");
  const { data = [], isLoading } = useGetUsersQuery(limit);
  const [addUser, { isError }] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newGender, setNewGender] = useState("Male");

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (newName) {
      await addUser({
        name: newName,
        email: newEmail,
        age: newAge,
        gender: newGender,
      }).unwrap();
      setNewName("");
      setNewEmail("");
      setNewAge("");
    }
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id).unwrap();
  };

  const handleUpdateUser = async (item) => {
    const { id, name, email, age, gender } = item;
    handleDeleteUser(id);
    setNewName(name);
    setNewEmail(email);
    setNewAge(age);
    await updateUser(id, { name, email, age, gender }).unwrap();
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="form">
          <div>
            <input
              className="input"
              type="text"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input"
              type="number"
              placeholder="Age"
              value={newAge}
              onChange={(e) => setNewAge(e.target.value)}
            />
          </div>
          <div className="radio-container">
            <div className="radio">
              <input
                type="radio"
                defaultChecked
                id="male"
                name="gender"
                value="male"
                onChange={(e) => setNewGender(e.target.value)}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className="radio">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={(e) => setNewGender(e.target.value)}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
          <button type="submit" onClick={handleAddUser} className="btn-submit">
            Submit
          </button>
        </div>
        {data.length !== 0 ? (
          <div>
            <ul>
              {isLoading ? (
                <h1>Loading...</h1>
              ) : (
                data.map((item) => {
                  return (
                    <li key={item.id}>
                      <p className="id">{item.id}</p>
                      <p className="name">{item.name}</p>
                      <p className="age">{item.age}</p>
                      <p className="gender">
                        {item.gender === "male" ? "Male" : "Female"}
                      </p>
                      <p className="email">{item.email}</p>
                      <div className="btn-group">
                        <button
                          className="btn-edit"
                          onClick={() => handleUpdateUser(item)}
                        >
                          edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteUser(item.id)}
                        >
                          delete
                        </button>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        ) : <h1 className="result">No result</h1>}
      </div>
    </div>
  );
}

export default App;
