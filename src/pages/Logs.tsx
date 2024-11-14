import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRef, useState } from "react";
import { OverlayEventDetail, TextareaInputEventDetail } from "@ionic/core";
import { add, trash } from "ionicons/icons";
import "./Logs.css";

const Logs: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const textareaRef = useRef<HTMLIonTextareaElement>(null);
  const [inputValue, setInputValue] = useState("");

  function handleSave() {
    modal.current?.dismiss(inputValue, "confirm");
  }

  function handleDiscard() {
    modal.current?.dismiss();
  }

  function handleWillDismiss(e: CustomEvent<OverlayEventDetail>) {
    if (e.detail.role === "confirm") {
      console.log(e.detail.data);
    }

    setInputValue("");
  }

  function handleDidPresent() {
    textareaRef.current?.setFocus();
  }

  function handleInput(e: CustomEvent<TextareaInputEventDetail>) {
    setInputValue(e.detail.value ?? "");
  }

  return (
    <IonPage>
      <IonHeader collapse="fade" translucent>
        <IonToolbar>
          <IonTitle>Logs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Logs</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonFab
          horizontal="center"
          vertical="bottom"
          slot="fixed"
          className="ion-padding-bottom"
        >
          <IonFabButton id="open-modal">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonModal
          ref={modal}
          trigger="open-modal"
          onWillDismiss={handleWillDismiss}
          onDidPresent={handleDidPresent}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={handleDiscard} shape="round">
                  Discard
                </IonButton>
              </IonButtons>
              <IonTitle>New Log</IonTitle>
              <IonButtons slot="end">
                <IonButton
                  strong={true}
                  onClick={handleSave}
                  shape="round"
                  fill="solid"
                  disabled={!inputValue}
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
                value={inputValue}
                onIonInput={handleInput}
                aria-label="Log content"
                placeholder="Enter your log content"
                autoFocus
                autoGrow
              />
            </IonItem>
          </IonContent>
        </IonModal>

        <IonList inset>
          <IonItemSliding>
            <IonItem>
              <IonLabel>Log #2</IonLabel>
            </IonItem>
            <IonItemOptions side="end">
              <IonItemOption color="danger">
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
          <IonItemSliding>
            <IonItem>
              <IonLabel>Log #1</IonLabel>
            </IonItem>
            <IonItemOptions side="end">
              <IonItemOption color="danger">
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Logs;
