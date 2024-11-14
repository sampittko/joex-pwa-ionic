import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";

export default function AddLogButton() {
  return (
    <IonFab
      slot="fixed"
      vertical="bottom"
      horizontal="center"
      className="ion-padding-bottom"
    >
      <IonFabButton id="add-log-button">
        <IonIcon icon={add}></IonIcon>
      </IonFabButton>
    </IonFab>
  );
}
