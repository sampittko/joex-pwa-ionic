import "./Logs.css";

import { AddLogButton, AddLogModal, LogList } from "@/components";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";

export interface Log {
  id: string;
  content: string;
  createdDate: Date;
  updatedDate: Date;
  migratedDate: Date | null;
  recoveredDate: Date | null;
  isMigrated: boolean;
}

export default function Logs() {
  const [logs, setLogs] = useState<Log[]>([]);

  function handleSaveLog(content: string) {
    const now = new Date();
    const newLog = {
      id: crypto.randomUUID(),
      content,
      createdDate: now,
      updatedDate: now,
      migratedDate: null,
      recoveredDate: null,
      isMigrated: false,
    };
    setLogs((prev) => [newLog, ...prev]);
  }

  function handleDeleteLog(id: string) {
    setLogs((prev) => prev.filter((log) => log.id !== id));
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
        <LogList logs={logs} onDelete={handleDeleteLog} />
        <AddLogButton />
        <AddLogModal onSave={handleSaveLog} />
      </IonContent>
    </IonPage>
  );
}
