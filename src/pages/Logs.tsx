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

const Logs: React.FC = () => {
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
