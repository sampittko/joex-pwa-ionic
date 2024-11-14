import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonModal,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { useRef, useState } from "react";

interface AddLogModalProps {
  onSave: (content: string) => void;
  textareaRef: React.RefObject<HTMLIonTextareaElement>;
}

type ModalAction = "save" | "discard";

export default function AddLogModal(props: AddLogModalProps) {
  const { onSave, textareaRef } = props;

  const modal = useRef<HTMLIonModalElement>(null);
  const [inputValue, setInputValue] = useState("");

  const handleModalAction = (action: ModalAction, data?: string) => {
    modal.current?.dismiss(data, action);
  };

  const handleDismiss = (event: CustomEvent<OverlayEventDetail>) => {
    const { data, role } = event.detail;
    if (role === "save" && data) onSave(data);
    setInputValue("");
  };

  const handleModalOpen = () => {
    textareaRef.current?.setFocus();
  };

  return (
    <IonModal
      ref={modal}
      trigger="add-log-button"
      onDidPresent={handleModalOpen}
      onDidDismiss={handleDismiss}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => handleModalAction("discard")}>
              Discard
            </IonButton>
          </IonButtons>
          <IonTitle>New Log</IonTitle>
          <IonButtons slot="end">
            <IonButton
              strong
              onClick={() => handleModalAction("save", inputValue)}
              disabled={!inputValue.trim()}
            >
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem lines="none">
          <IonTextarea
            ref={textareaRef}
            placeholder="Type your log entry here..."
            value={inputValue}
            onIonInput={(e) => setInputValue(e.detail.value ?? "")}
            autoGrow
          />
        </IonItem>
      </IonContent>
    </IonModal>
  );
}
