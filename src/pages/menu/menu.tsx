import React, { useEffect, useState } from "react";
import {
  IonButtons,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import { useParams, useHistory } from "react-router";
import { cartOutline } from "ionicons/icons";
import { Route, Switch, useLocation } from "react-router-dom";
import "./Menu.css";

const CartPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonIcon
              icon={cartOutline}
              style={{ fontSize: "30px", margin: "10px" }}
            />
          </IonButtons>
          <IonTitle>Your Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
      </IonContent>
    </IonPage>
  );
};

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const history = useHistory();
  const location = useLocation();
  const [items, setItems] = useState<string[]>([]);

  const generateItems = () => {
    const newItems = [];
    for (let i = 0; i < 50; i++) {
      newItems.push(`Platillo ${1 + items.length + i}`);
    }
    setItems([...items, ...newItems]);
  };

  useEffect(() => {
    generateItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redirectToCart = () => {
    history.push("/pages/Cart");
    window.location.reload(); // Force page reload
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonIcon
              icon={cartOutline}
              onClick={redirectToCart}
              style={{ fontSize: "30px", margin: "10px" }}
            />
          </IonButtons>
          <IonTitle>Nombre del restaurante</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            {items.map((item, index) => (
              <IonCol size="6" key={index}>
                <IonCard button>
                  <IonCardHeader>
                    <IonCardTitle>{item}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>{item}</IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonInfiniteScroll
          threshold="100px"
          onIonInfinite={(ev) => {
            generateItems();
            setTimeout(() => ev.target.complete(), 500);
          }}
        >
          <IonInfiniteScrollContent loadingText="Loading more items..."></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Page;
