import "./Logs.css";

import { AddLogButton, AddLogModal, LogList } from "@/components";
import { useLogs } from "@/hooks/useLogs";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export default function Logs() {
  const { logs, saveLog, deleteLog } = useLogs();

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
        <LogList logs={logs} onDelete={deleteLog} />
        <AddLogButton />
        <AddLogModal onSave={saveLog} />
      </IonContent>
    </IonPage>
  );
}
