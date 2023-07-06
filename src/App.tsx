import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Index from "./components/Index";
import Menu from "./pages/menu/menu";
import Cart from "./pages/cart/cart";
import EditUser from "./pages/editUser/editUser";
// import Logout from "./pages/logout/logout";
import Login from "./pages/login/login";
import SignIn from "./pages/signIn/signIn";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Index />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/pages/Login" />
            </Route>
            <Route path="/pages/Menu" exact={true}>
              <Menu />
            </Route>
            <Route path="/pages/Cart" exact={true}>
              <Cart />
            </Route>
            <Route path="/pages/editUser" exact={true}>
              <EditUser />
            </Route>
            {/* <Route path="/pages/Logout" exact={true}>
              <Logout />
            </Route> */}
          </IonRouterOutlet>
        </IonSplitPane>
        <Route path="/pages/Login" exact={true}>
          <Login />
        </Route>
        <Route path="/pages/signIn" exact={true}>
          <SignIn />
        </Route>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
