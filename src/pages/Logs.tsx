import "./Logs.css";

import { AddLogButton, AddLogModal, LogList } from "@/components";
import { LogsService } from "@/services/logs";
import type { Log } from "@/types/log";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useLiveQuery } from "dexie-react-hooks";

export default function Logs() {
  const logs: Log[] =
    useLiveQuery(() => LogsService.getInstance().getAllLogs()) ?? [];

  async function handleSave(content: string) {
    await LogsService.getInstance().createLog(content);
  }

  async function handleDelete(id: string) {
    await LogsService.getInstance().deleteLog(id);
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
        <LogList logs={logs} onDelete={handleDelete} />
        <AddLogButton />
        <AddLogModal onSave={handleSave} />
      </IonContent>
    </IonPage>
  );
}
