import React, { useState } from "react";
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
import "./Cart.css";

const Cart: React.FC = () => {
  const history = useHistory();
  const [orderAccepted, setOrderAccepted] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  const redirectToMenu = () => {
    history.push("/pages/Menu");
  };

  const handleCheckout = () => {
    setOrderAccepted(true);
    setShowPopover(true);

    setTimeout(() => {
      setShowPopover(false);
      setOrderAccepted(false);
      history.push("/pages/Menu");
    }, 2000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Carrito</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="cart">
          <h2>Your Cart</h2>
          <div className="cart-items">
            {/* Render the cart items here */}
            {/* Example: */}
            <div className="cart-item">
              <span>Item 1</span>
              <span>$10</span>
            </div>
            <div className="cart-item">
              <span>Item 2</span>
              <span>$15</span>
            </div>
            {/* End of cart items */}
          </div>
          <div className="cart-actions">
            <IonButton onClick={redirectToMenu}>Continue Shopping</IonButton>
            <IonButton
              id="trigger"
              onClick={() => {
                setShowPopover(true);
                handleCheckout();
              }}
            >
              Checkout
            </IonButton>
            <IonPopover
              isOpen={showPopover}
              onDidDismiss={() => setShowPopover(false)}
              event="click"
              mode="ios"
            >
              <IonContent className="checkout-popover-content">
                <h1>Orden Aceptada</h1>
                <h3>Volviendo al menu...</h3>
              </IonContent>
            </IonPopover>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Cart;
