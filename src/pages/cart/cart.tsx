import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonPopover,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import ApiMethods from "../../commons/ApiMethods";
import { enviroment } from "../../environment/environment.dev";
import "./Cart.css";

const Cart: React.FC = () => {
  const { createMethod } = ApiMethods(`${enviroment.apiEndpoint}/orders`);
  const history = useHistory();
  const [orderAccepted, setOrderAccepted] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  useEffect(() => {
    const storedCartItems = sessionStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);
  const redirectToMenu = () => {
    history.push("/pages/Menu");
  };
  const removeItem = (index: number) => {
    const updatedCartItems = [...cartItems];
    const itemToRemove = updatedCartItems[index];
    itemToRemove.quantity--;
    if (itemToRemove.quantity === 0) {
      updatedCartItems.splice(index, 1);
    }
    setCartItems(updatedCartItems);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };
  const handleCheckout = () => {
    createMethod(cartItems);

    setOrderAccepted(true);
    setShowPopover(true);

    setTimeout(() => {
      setShowPopover(false);
      setOrderAccepted(false);
      sessionStorage.removeItem("cartItems");

      history.push("/pages/Menu");
    }, 2000);
  };

  const isCartEmpty = cartItems.length === 0;

  const calculateTotalAmount = () => {
    let total = 0;
    for (const item of cartItems) {
      total += item.product.price * item.quantity;
    }
    return total;
  };

  return (
    <IonPage className="cart-page">
      <IonHeader>
        <IonToolbar color="success" style={{ padding: "8px" }}>
          <IonTitle style={{ color: "black" }}>Orden</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ padding: "20px" }}>
        <div className="cart" style={{ padding: "20px", borderRadius: "10px" }}>
          <h2>Carrito</h2>
          <div className="cart-items">
            {cartItems.length > 0 ? (
              <ul>
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="cart-item"
                    style={{ marginBottom: "10px" }}
                  >
                    {item.product.name} - {item.quantity} item
                    <IonButton
                      onClick={() => removeItem(index)}
                      size="small"
                      fill="clear"
                      color="danger"
                      className="remove-button"
                      style={{ marginLeft: "10px" }}
                    >
                      quitar
                    </IonButton>
                  </div>
                ))}
              </ul>
            ) : (
              <p>Carrito vacio</p>
            )}
          </div>
          <div
            className="cart-actions"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <IonButton
              fill="outline"
              color="success"
              onClick={redirectToMenu}
              style={{ marginRight: "10px" }}
            >
              <div style={{ color: "white" }}>Volver al menu</div>
            </IonButton>
            <IonButton
              color="success"
              fill="outline"
              id="trigger"
              onClick={() => {
                if (!isCartEmpty) {
                  setShowPopover(true);
                  handleCheckout();
                }
              }}
              style={{ color: "white", marginRight: "10px" }}
              disabled={isCartEmpty}
            >
              <div style={{ color: "white" }}>Ordenar</div>
            </IonButton>
            <IonPopover
              isOpen={showPopover}
              onDidDismiss={() => setShowPopover(false)}
              event="click"
              mode="ios"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                width: "100%",
                height: "100%",
                padding: "20px",
                borderRadius: "100px",
              }}
            >
              <IonContent
                className="checkout-popover-content"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h1>Orden Aceptada</h1>
                <h3>Volviendo al menu...</h3>
              </IonContent>
            </IonPopover>
          </div>
          {!isCartEmpty && (
            <div className="total-amount">
              <p>Total: CRC {calculateTotalAmount()}</p>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Cart;
