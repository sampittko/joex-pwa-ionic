import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import { add } from "ionicons/icons";
import "./Logs.css";
import BadgeManager from "../services/badge/BadgeManager";
import { useEffect } from "react";

const Logs: React.FC = () => {
  useEffect(() => {
    const initializeBadge = async () => {
      try {
        const badgeManager = await BadgeManager.getInstance();
        await badgeManager.increaseBadgeCount();
      } catch (error) {
        console.error("Failed to initialize badge:", error);
      }
    };

    initializeBadge();

    return () => {
      BadgeManager.getInstance()
        .then((badgeManager) => badgeManager.clearBadgeCount())
        .catch((error) => console.error("Failed to clear badge:", error));
    };
  }, []);

  return (
    <IonPage>
      <IonHeader collapse="fade" translucent>
        <IonToolbar>
          <IonTitle>Logs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonFab
          horizontal="center"
          vertical="bottom"
          slot="fixed"
          className="ion-padding-bottom"
        >
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Logs</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Logs;
