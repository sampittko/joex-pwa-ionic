import { AddLogButton, AddLogModal, LogList } from "@/components";
import { useBadgeSync, useLogs } from "@/hooks";
import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRef } from "react";

export default function Logs() {
  const {
    capturedLogs,
    migratedLogs,
    saveLog,
    deleteLog,
    migrateLog,
    recoverLog,
  } = useLogs();
  const textareaRef = useRef<HTMLIonTextareaElement>(null);

  useBadgeSync(capturedLogs.length);

  const renderContent = (mode: "captured" | "migrated") => (
    <IonContent fullscreen>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Logs</IonTitle>
        </IonToolbar>
      </IonHeader>
      {mode === "captured" ? (
        <LogList
          mode="captured"
          logs={capturedLogs}
          onDelete={deleteLog}
          onMigrate={migrateLog}
        />
      ) : (
        <LogList
          mode="migrated"
          logs={migratedLogs}
          onDelete={deleteLog}
          onRecover={recoverLog}
        />
      )}
      {mode === "captured" && (
        <>
          <AddLogButton textareaRef={textareaRef} />
          <AddLogModal onSave={saveLog} textareaRef={textareaRef} />
        </>
      )}
    </IonContent>
  );

  return (
    <IonPage>
      <IonHeader collapse="fade" translucent>
        <IonToolbar>
          <IonSegment value="captured" swipeGesture={false}>
            <IonSegmentButton value="captured" contentId="captured">
              <IonLabel>Captured</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="migrated" contentId="migrated">
              <IonLabel>Migrated</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonSegmentView>
        <IonSegmentContent id="captured">
          {renderContent("captured")}
        </IonSegmentContent>
        <IonSegmentContent id="migrated">
          {renderContent("migrated")}
        </IonSegmentContent>
      </IonSegmentView>
    </IonPage>
  );
}
