import React, { useState, useEffect } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonPopover,
  IonCardContent,
  IonIcon,
  IonItem,
  IonList,
  IonListHeader,
  IonSearchbar,
} from "@ionic/react";
import { useHistory } from "react-router";
import { cartOutline } from "ionicons/icons";
import ApiMethods from "../../commons/ApiMethods";
import { environment } from "../../environment/environment.dev";
import "./Menu.css";

const Page: React.FC = () => {
  const { data } = ApiMethods(`${environment.apiEndpoint}/menus`);
  const history = useHistory();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const storedCartItems = sessionStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const saveCartItems = (items: any[]) => {
    sessionStorage.setItem("cartItems", JSON.stringify(items));
    setCartItems(items);
  };

  const redirectToCart = () => {
    history.push("/pages/Cart");
    window.location.reload();
  };

  const addToCart = (product: any) => {
    const newCartItem = {
      product,
      quantity: 1,
    };

    const existingCartItemIndex = cartItems.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingCartItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingCartItemIndex].quantity += 1;
      saveCartItems(updatedCartItems);
    } else {
      const updatedCartItems = [...cartItems, newCartItem];
      saveCartItems(updatedCartItems);
    }

    console.log("Adding to cart:", product);
  };

  const handleSearchInputChange = (e: CustomEvent) => {
    setSearchText(e.detail.value);
  };

  const handleSearchbarFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchbarBlur = () => {
    setIsSearchFocused(false);
  };

  const isSearchEmpty = searchText.trim() === "";
  const showFullMenu = !isSearchFocused && isSearchEmpty;

  const filteredData = data?.filter((menu: any) =>
    menu.products.some(
      (product: any) =>
        product.status !== false &&
        product.name.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  if (!data) {
    return <h1>Cargando...</h1>;
  } else {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="success" style={{ padding: "8px" }}>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonButtons slot="end">
              <IonIcon
                icon={cartOutline}
                onClick={redirectToCart}
                style={{ fontSize: "30px", marginRight: "10px" }}
              />
            </IonButtons>
            <IonTitle style={{ color: "black" }}>Restaurante</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar
              value={searchText}
              onIonChange={handleSearchInputChange}
              onFocus={handleSearchbarFocus}
              onBlur={handleSearchbarBlur}
            ></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen style={{ padding: "20px" }}>
          <IonList style={{ listStyle: "inside", margin: "8px" }}>
            {showFullMenu &&
              data?.map((menu: any) => (
                <React.Fragment key={menu.id}>
                  <IonListHeader style={{ fontSize: "18px" }}>
                    {menu.name}
                  </IonListHeader>
                  {menu.products.map((product: any) => (
                    <IonItem
                      key={product.id}
                      style={{ display: "flex", marginBottom: "10px" }}
                    >
                      <IonItem text-center>
                        <IonButton
                          fill="outline"
                          color="success"
                          onClick={() => setSelectedProduct(product)}
                          id={`popover-trigger-${product.id}`}
                          style={{
                            height: "60px",
                            textAlign: "center",
                            fontSize: "20px",
                          }}
                        >
                          <div style={{ color: "white" }}>
                            <div>{product.name}</div>
                            <div>CRC {product.price}</div>
                          </div>
                        </IonButton>
                      </IonItem>
                    </IonItem>
                  ))}
                </React.Fragment>
              ))}
            {!showFullMenu &&
              filteredData?.map((menu: any) => (
                <React.Fragment key={menu.id}>
                  <IonListHeader style={{ fontSize: "18px" }}>
                    {menu.name}
                  </IonListHeader>
                  {menu.products
                    .filter(
                      (product: any) =>
                        product.status !== false &&
                        product.name
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                    )
                    .map((product: any) => (
                      <IonItem
                        key={product.id}
                        style={{ display: "flex", marginBottom: "10px" }}
                      >
                        <IonItem text-center>
                          <IonButton
                            fill="outline"
                            color="success"
                            onClick={() => setSelectedProduct(product)}
                            id={`popover-trigger-${product.id}`}
                            style={{
                              height: "60px",
                              textAlign: "center",
                              fontSize: "20px",
                            }}
                          >
                            <div style={{ color: "white" }}>
                              <div>{product.name}</div>
                              <div>CRC {product.price}</div>
                            </div>
                          </IonButton>
                        </IonItem>
                      </IonItem>
                    ))}
                </React.Fragment>
              ))}
          </IonList>

          <IonPopover
            isOpen={selectedProduct !== null}
            onDidDismiss={() => setSelectedProduct(null)}
            event={
              selectedProduct
                ? { currentTarget: `popover-trigger-${selectedProduct.id}` }
                : undefined
            }
            showBackdrop={true}
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
            <IonCardContent>
              <div>ID: {selectedProduct?.id}</div>
              <div>Nombre: {selectedProduct?.name}</div>
              <div>Desc: {selectedProduct?.desc}</div>
              <div>Precio: {selectedProduct?.price}</div>
              <IonButton
                fill="outline"
                color="success"
                style={{ color: "white" }}
                onClick={() => addToCart(selectedProduct)}
              >
                Agregar al carrito
              </IonButton>
            </IonCardContent>
          </IonPopover>
        </IonContent>
      </IonPage>
    );
  }
};

export default Page;
