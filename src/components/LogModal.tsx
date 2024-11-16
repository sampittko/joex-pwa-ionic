import { getPlatformMode } from "@/utils";
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
import { useEffect, useRef, useState } from "react";

interface LogModalProps {
  mode: "add" | "edit";
  textareaRef: React.RefObject<HTMLIonTextareaElement>;
  onSave: (content: string) => void;
  initialContent?: string;
  onClose?: () => void;
  triggerId?: string;
}

type ModalAction = "save" | "discard";

export default function LogModal(props: LogModalProps) {
  const {
    mode,
    initialContent = "",
    onSave,
    onClose,
    textareaRef,
    triggerId,
  } = props;
  const platformMode = getPlatformMode();

  const modal = useRef<HTMLIonModalElement>(null);
  const [inputValue, setInputValue] = useState(initialContent);

  useEffect(() => {
    setInputValue(initialContent);
  }, [initialContent]);

  useEffect(() => {
    if (mode === "edit") {
      modal.current?.present();
    }
  }, [mode]);

  function handleModalAction(action: ModalAction, data?: string): void {
    modal.current?.dismiss(data, action);
  }

  function handleDismiss(event: CustomEvent<OverlayEventDetail>): void {
    const { data, role } = event.detail;
    if (role === "save" && data) onSave(data);
    setInputValue(initialContent);
    if (mode === "edit") {
      onClose?.();
    }
  }

  function handlePresent(): void {
    textareaRef.current?.setFocus();

    setTimeout(() => {
      const nativeTextarea =
        textareaRef.current?.getElementsByTagName("textarea")[0];
      if (nativeTextarea) {
        nativeTextarea.selectionStart = nativeTextarea.value.length;
        nativeTextarea.selectionEnd = nativeTextarea.value.length;
      }
    }, 50);
  }

  const isAdd = mode === "add";

  return (
    <IonModal
      ref={modal}
      trigger={triggerId}
      onDidPresent={handlePresent}
      onDidDismiss={handleDismiss}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {platformMode === "ios" && (
              <IonButton onClick={() => handleModalAction("discard")}>
                Cancel
              </IonButton>
            )}
          </IonButtons>
          <IonTitle>{isAdd ? "Add Log" : "Edit Log"}</IonTitle>
          <IonButtons slot="end">
            {platformMode === "md" && (
              <IonButton onClick={() => handleModalAction("discard")}>
                Cancel
              </IonButton>
            )}
            <IonButton
              strong
              onClick={() => handleModalAction("save", inputValue)}
              disabled={!inputValue.trim()}
            >
              {isAdd ? "Save" : "Update"}
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
