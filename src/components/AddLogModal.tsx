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
import { useRef, useState } from "react";

interface AddLogModalProps {
  onSave: (content: string) => void;
}

export default function AddLogModal({ onSave }: AddLogModalProps) {
  const modal = useRef<HTMLIonModalElement>(null);
  const textareaRef = useRef<HTMLIonTextareaElement>(null);
  const [inputValue, setInputValue] = useState("");

  function handleSave() {
    if (!inputValue.trim()) return;
    onSave(inputValue);
    setInputValue("");
    modal.current?.dismiss(inputValue, "confirm");
  }

  function handleCancel() {
    modal.current?.dismiss(null, "cancel");
    setInputValue("");
  }

  function handleModalOpen() {
    setTimeout(() => {
      textareaRef.current?.setFocus();
    }, 400);
  }

  return (
    <IonModal
      ref={modal}
      trigger="add-log-button"
      onIonModalDidPresent={handleModalOpen}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleCancel}>Discard</IonButton>
          </IonButtons>
          <IonTitle>New Log</IonTitle>
          <IonButtons slot="end">
            <IonButton
              strong
              onClick={handleSave}
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
