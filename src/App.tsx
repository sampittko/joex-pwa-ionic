import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useEffect, useLayoutEffect } from "react";
import { BadgeManager } from "./services/badge";
import { getPlatformMode } from "./utils";
import Logs from "./pages/Logs";

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  useLayoutEffect(() => {
    setupIonicReact({
      mode: getPlatformMode(),
    });
  }, []);

  const initializeBadge = async () => {
    try {
      if (!(await BadgeManager.isSupported())) {
        return;
      }

      const hasPermission = (permissions: any) =>
        permissions.display === "granted";
      let permissions = await BadgeManager.checkPermissions();

      if (!hasPermission(permissions)) {
        permissions = await BadgeManager.requestPermissions();
      }

      if (hasPermission(permissions)) {
        await BadgeManager.set(1);
      }
    } catch (error) {
      console.error("Failed to initialize badge:", error);
    }
  };

  useEffect(() => {
    initializeBadge();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/logs">
            <Logs />
          </Route>
          <Route exact path="/">
            <Redirect to="/logs" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;