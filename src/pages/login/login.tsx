import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
} from "@ionic/react";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import "./Login.css";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleRegister = () => {
        history.push("/pages/signIn");
    };

    const handleLogin = () => {
        if (!email || !password) {
            toast.warning("Please enter both email and password");
            return;
        }

        const user = {
            user: {
                email: email,
                password: password,
            },
        };

        fetch("http://gsdxvdfazxd.ddns.net:3000/login.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    const token = data.token;
                    // Get user data from users.json
                    fetch("http://gsdxvdfazxd.ddns.net:3000/users.json")
                        .then((response) => response.json())
                        .then((users) => {
                            const user = users.find((user: any) => user.email === email);
                            if (user) {
                                const category_id = user.category.id;
                                if (category_id === 3) {
                                    const name = user.email;
                                    localStorage.setItem("name", name);
                                    toast.success("Login successful");
                                    localStorage.setItem("token", token);
                                    history.push("/pages/Menu");
                                } else {
                                    toast.error("You are not allowed to login.");
                                }
                            } else {
                                toast.error("User not found.");
                            }
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                }
            })
            .catch((error) => {
                console.log(error.message);
            });
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
                <IonToolbar
                    color={"success"}
                    style={{
                        padding: "8px",
                    }}
                >
                    <IonTitle style={{color: "white"}}>Inicio de Sesión</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent
                fullscreen
                style={{
                    padding: "20px",
                }}
            >
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
                        type="email"
                        placeholder="Ingrese su correo"
                        value={email}
                        onIonChange={(e: any) => setEmail(e.target.value)}
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
                        onIonChange={(e: any) => setPassword(e.target.value)}
                        style={{
                            marginBottom: "10px",
                        }}
                    />
                    <div>
                        <IonButton
                            fill="outline"
                            color={"success"}
                            onClick={handleLogin}
                            style={{
                                marginBottom: "10px",
                                marginRight: "10px",
                            }}
                        >
                            <div style={{color: "white"}}>Iniciar sesión</div>
                        </IonButton>
                        <IonButton
                            fill="outline"
                            color={"success"}
                            style={{
                                marginBottom: "10px",
                                marginLeft: "10px",
                            }}
                        >
                            <div style={{color: "white"}} onClick={handleRegister}>
                                Crear cuenta
                            </div>
                        </IonButton>
                    </div>
                </div>
                <ToastContainer/>
            </IonContent>
        </IonPage>
    );
};

export default Login;
