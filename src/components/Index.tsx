import React, { useState } from "react";
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonButton,
} from "@ionic/react";
import { useLocation, useHistory } from "react-router-dom";
import {
  archiveOutline,
  archiveSharp,
  cartOutline,
  fastFoodOutline,
  logOutOutline,
  personCircleOutline,
} from "ionicons/icons";
import "./Index.css";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Menu Principal",
    url: "/pages/Menu",
    iosIcon: fastFoodOutline,
    mdIcon: fastFoodOutline,
  },
  {
    title: "Editar Usuario",
    url: "/pages/editUser",
    iosIcon: personCircleOutline,
    mdIcon: personCircleOutline,
  },
  {
    title: "Acceder",
    url: "/pages/Login",
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    // Perform logout logic here
    // Example: Call a logout API, clear user session, etc.

    // Redirect to the login page
    history.push("/pages/Login");
  };

  const handleEditUser = () => {
    history.push("/pages/editUser"); // Redirect to "Editar Usuario" page
    window.location.reload(); // Refresh the page
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Restaurante</IonListHeader>
          <h1></h1>
          {appPages.map((appPage, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                className={location.pathname === appPage.url ? "selected" : ""}
                routerLink={appPage.url}
                routerDirection="none"
                lines="none"
                detail={false}
                onClick={
                  appPage.url === "/pages/editUser" ? handleEditUser : undefined
                }
              >
                <IonIcon
                  aria-hidden="true"
                  slot="start"
                  ios={appPage.iosIcon}
                  md={appPage.mdIcon}
                />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
      <IonButton
        color="danger"
        expand="full"
        onClick={() => {
          handleLogout();
          toggleMenu();
        }}
      >
        Cerrar Sesion
      </IonButton>
    </IonMenu>
  );
};

export default Menu;
