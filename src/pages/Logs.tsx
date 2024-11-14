import "./Logs.css";

import { AddLogButton, AddLogModal, LogList } from "@/components";
import db from "@/db";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useLiveQuery } from "dexie-react-hooks";

export interface NewLog {
  content: string;
  createdDate: Date;
  updatedDate: Date;
  migratedDate: Date | null;
  recoveredDate: Date | null;
  isMigrated: boolean;
}

export interface Log extends NewLog {
  id: string;
}

export default function Logs() {
  const logs =
    (useLiveQuery(() =>
      db.logs.orderBy("createdDate").reverse().toArray()
    ) as Log[]) ?? [];

  async function handleSave(content: string) {
    const now = new Date();
    const newLog: NewLog = {
      content,
      createdDate: now,
      updatedDate: now,
      migratedDate: null,
      recoveredDate: null,
      isMigrated: false,
    };
    await db.logs.add(newLog);
  }

  async function handleDelete(id: string) {
    await db.logs.delete(id);
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
