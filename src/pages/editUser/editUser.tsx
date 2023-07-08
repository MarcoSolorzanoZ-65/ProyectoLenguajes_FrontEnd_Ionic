import React, { useState, useEffect } from "react";
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
import ApiMethods from "../../commons/ApiMethods";
import { environment } from "../../environment/environment.dev";

const EditUser: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const apiMethods = ApiMethods(`${environment.apiEndpoint}/users`);

  const handleSaveChanges = () => {
    const userEmail = localStorage.getItem("name");

    if (apiMethods.data) {
      const user = apiMethods.data.find(
          (user: any) => user.email === userEmail
      );

      if (user) {
        // Update the user's information
        apiMethods.updateMethod(user.id, name, address);
      }
    }

    // Redirect the user to the desired page
    history.push("/pages/Menu");
  };

  const handleBack = () => {
    history.push("/pages/Menu");
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("name");

    if (apiMethods.data) {
      const user = apiMethods.data.find(
          (user: any) => user.email === userEmail
      );

      if (user) {
        setName(user.name);
        setAddress(user.address);
      }
    }
  }, [apiMethods.data]);

  return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="success" style={{ padding: "8px" }}>
            <IonTitle style={{ color: "white" }}>Editar Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen style={{ padding: "20px" }}>
          <div style={{ padding: "20px", borderRadius: "10px" }}>
            <div>
              <label htmlFor="name">Nombre:</label>
              <IonInput
                  color="success"
                  type="text"
                  id="name"
                  value={name}
                  onIonChange={(e) => setName(e.detail.value!)}
                  style={{ marginBottom: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="address">Dirección:</label>
              <IonInput
                  color="success"
                  type="text"
                  id="address"
                  value={address}
                  onIonChange={(e) => setAddress(e.detail.value!)}
                  style={{ marginBottom: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="password">Contraseña:</label>
              <IonInput
                  color="success"
                  type="password"
                  id="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  style={{ marginBottom: "10px" }}
              />
            </div>
            <IonButton
                fill="outline"
                color="success"
                style={{ marginRight: "10px" }}
                onClick={handleSaveChanges}
            >
              Guardar Cambios
            </IonButton>
            <IonButton
                fill="outline"
                color="success"
                style={{ marginLeft: "10px" }}
                onClick={handleBack}
            >
              Volver
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
  );
};

export default EditUser;
