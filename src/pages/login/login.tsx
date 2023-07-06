import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
} from "@ionic/react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

const Login: React.FC = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleRegister = () => {
    history.push("/pages/signIn");
  };

  const loginUser = () => {
    // Perform login logic using the mail and password values
    console.log(mail, password);
    // history.push("/pages/Menu");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio de Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="box">
          <h2>Correo</h2>
          <IonInput
            type="email"
            placeholder="Ingrese su correo"
            value={mail}
            onIonChange={(e: any) => setMail(e.target.value)}
          />
          <h2>Contraseña</h2>
          <IonInput
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onIonChange={(e: any) => setPassword(e.target.value)}
          />
        </div>
        <IonButton onClick={loginUser}>Login</IonButton>
        <IonButton onClick={handleRegister}>Crear Cuenta</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
