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
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "./SignIn.css";

const SignIn: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  const handleRegister = () => {
    if (!email || !password) {
      toast.warning("Please fill in both email and password");
      return;
    }

    const user = {
      user: {
        email: email,
        password: password,
        category_id: 1,
        name: name,
        address: address,
      },
    };

    fetch("http://gsdxvdfazxd.ddns.net:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Registration failed");
        }
      })
      .then((data) => {
        const token = data.token;
        localStorage.setItem("token", token);
        toast.success("Account created successfully");
      })
      .catch((error) => {
        console.log(error.message);
      });
    history.push("/pages/Login");
  };

  const handleLogin = () => {
    history.push("/pages/Login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/pages/Menu");
    }
  }, []); // Run the effect only once on component mount

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
          <IonTitle style={{ color: "white" }}>Crear Cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ padding: "20px" }}>
        <div
          className="box"
          style={{
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>Correo</h2>
          <IonInput
            color={"success"}
            type="text"
            placeholder="Ingrese su correo"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            style={{
              marginBottom: "10px",
            }}
          />
          <h2>Contraseña</h2>
          <IonInput
            color={"success"}
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            style={{
              marginBottom: "10px",
            }}
          />
          <h2>Dirección</h2>
          <IonInput
            color={"success"}
            type="text"
            placeholder="Ingrese su dirección"
            value={address}
            onIonChange={(e) => setAddress(e.detail.value!)}
            style={{
              marginBottom: "10px",
            }}
          />
          <h2>Nombre completo</h2>
          <IonInput
            color={"success"}
            type="text"
            placeholder="Ingrese su nombre completo"
            value={name}
            onIonChange={(e) => setName(e.detail.value!)}
            style={{
              marginBottom: "10px",
            }}
          />
        </div>
        <IonButton
          color="success"
          fill="outline"
          onClick={handleRegister}
          style={{ marginTop: "20px", marginLeft: "20px" }}
        >
          <div style={{ color: "white" }}>Crear Cuenta</div>
        </IonButton>
        <IonButton
          color="success"
          fill="outline"
          onClick={handleLogin}
          style={{ marginTop: "20px", marginLeft: "20px" }}
        >
          <div style={{ color: "white" }}>Volver a Login</div>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
