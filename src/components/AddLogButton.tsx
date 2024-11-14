import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";

interface AddLogButtonProps {
  textareaRef: React.RefObject<HTMLIonTextareaElement>;
}

export default function AddLogButton(props: AddLogButtonProps) {
  const { textareaRef } = props;

  function handleClick() {
    textareaRef.current?.setFocus();
  }

  return (
    <IonFab
      slot="fixed"
      vertical="bottom"
      horizontal="center"
      className="ion-padding-bottom"
    >
      <IonFabButton id="add-log-button" onClick={handleClick}>
        <IonIcon icon={add} style={{ color: "#ffffff" }} />
      </IonFabButton>
    </IonFab>
  );
}
