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
  IonButton,
  IonPopover,
  IonCardContent,
  IonCardSubtitle,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import { useParams, useHistory } from "react-router";
import { cartOutline } from "ionicons/icons";
import ApiMethods from "../../commons/ApiMethods";
import { enviroment } from "../../environment/environment.dev";
import { Route, Switch, useLocation } from "react-router-dom";
import "./Menu.css";

const Page: React.FC = () => {
  const { data, refetch } = ApiMethods(`${enviroment.apiEndpoint}/menus`);
  const { name } = useParams<{ name: string }>();
  const history = useHistory();
  const location = useLocation();
  const [items, setItems] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const redirectToCart = () => {
    history.push("/pages/Cart");
    window.location.reload(); // Force page reload
  };

  if (!data) {
    return <h1>Cargando...</h1>;
  } else {
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
              {data?.map((menu: any) =>
                menu.products.map((product: any) => (
                  <IonButton
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    id={`popover-trigger-${product.id}`}
                  >
                    <div>
                      <div>Nombre:</div>
                      <div>{product.name}</div>
                    </div>
                    <div>
                      <div>Precio:</div>
                      <div>{product.price}</div>
                    </div>
                  </IonButton>
                ))
              )}
            </IonRow>
          </IonGrid>
          <IonPopover
            isOpen={selectedProduct !== null}
            onDidDismiss={() => setSelectedProduct(null)}
            event={
              selectedProduct
                ? { currentTarget: `popover-trigger-${selectedProduct.id}` }
                : undefined
            }
            showBackdrop={true}
          >
            <IonCardContent>
              <div>ID: {selectedProduct?.id}</div>
              <div>Nombre: {selectedProduct?.name}</div>
              <div>Desc: {selectedProduct?.desc}</div>
              <div>Precio: {selectedProduct?.price}</div>
            </IonCardContent>
          </IonPopover>
        </IonContent>
      </IonPage>
    );
  }
};

export default Page;
