import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./EditUser.css";

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

  const handleBack = () => {
    history.push("/pages/Menu");
  };

  return (
    <IonPage
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <IonHeader>
        <IonToolbar color="success" style={{ padding: "8px" }}>
          <IonTitle style={{ color: "white" }}>Editar Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ padding: "20px" }}>
        <div
          style={{
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <div>
            <label htmlFor="fullName">Nombre:</label>
            <IonInput
              color={"success"}
              type="text"
              id="fullName"
              value={fullName}
              onIonChange={(e) => setFullName(e.detail.value!)}
              style={{
                marginBottom: "10px",
              }}
            />
          </div>
          <div>
            <label htmlFor="address">Direccion:</label>
            <IonInput
              color={"success"}
              type="text"
              id="address"
              value={address}
              onIonChange={(e) => setAddress(e.detail.value!)}
              style={{
                marginBottom: "10px",
              }}
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <IonInput
              color={"success"}
              type="password"
              id="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              style={{
                marginBottom: "10px",
              }}
            />
          </div>
          <IonButton
            fill="outline"
            color={"success"}
            style={{ marginRight: "10px" }}
            onClick={handleSaveChanges}
          >
            <div style={{ color: "white" }}>Guardar Cambios</div>
          </IonButton>
          <IonButton
            fill="outline"
            color={"success"}
            style={{ marginLeft: "10px" }}
            onClick={handleBack}
          >
            <div style={{ color: "white" }}>Volver</div>
          </IonButton>
        </div>
        <div></div>
      </IonContent>
    </IonPage>
  );
};

export default EditUser;
