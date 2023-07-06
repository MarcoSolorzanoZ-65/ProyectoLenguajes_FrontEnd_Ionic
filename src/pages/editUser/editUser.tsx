import React, { useState } from "react";
import { IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";

const EditUser: React.FC = () => {
  const history = useHistory();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleSaveChanges = () => {
    // Perform the necessary actions to save the changes
    // For example, make an API call to update the user information

    // Redirect the user to the desired page
    history.push("/pages/Menu");
  };

  return (
    <div>
      <h2>Edit User</h2>
      <div>
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <IonButton onClick={handleSaveChanges}>Guardar Cambios</IonButton>
    </div>
  );
};

export default EditUser;