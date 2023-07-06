import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { Link, useHistory } from "react-router-dom";
import "./signIn.css";

const Login: React.FC = () => {
  const history = useHistory();

  const handleCrearCuenta = () => {
    history.push("/pages/menu");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear Cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="box">
          <h2>Nombre Completo</h2>
          <input type="text" placeholder="Ingrese su nombre" />
          <h2>Correo</h2>
          <input type="text" placeholder="Ingrese su correo" />
          <h2>Direccion</h2>
          <input type="text" placeholder="Ingrese su direccion" />
          <h2>Contraseña</h2>
          <input type="password" placeholder="Ingrese su contraseña" />
        </div>
        <IonButton onClick={handleCrearCuenta}>Crear Cuenta</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
