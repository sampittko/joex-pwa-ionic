import { AddLogButton, LogList, LogModal } from "@/components";
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
import { useRef, useState } from "react";

export default function Logs() {
  const {
    isLoading,
    capturedLogs,
    migratedLogs,
    saveLog,
    deleteLog,
    migrateLog,
    recoverLog,
    updateLog,
  } = useLogs();
  const textareaRef = useRef<HTMLIonTextareaElement>(null);
  const [logToEdit, setLogToEdit] = useState<{
    id: number;
    content: string;
  } | null>(null);

  useBadgeSync(capturedLogs.length);

  function handleEdit(id: number, content: string): void {
    setLogToEdit({ id, content });
  }

  async function handleEditSave(content: string): Promise<void> {
    if (logToEdit) {
      await updateLog(logToEdit.id, content);
      setLogToEdit(null);
    }
  }

  function renderContent(mode: "captured" | "migrated") {
    return (
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Logs</IonTitle>
          </IonToolbar>
        </IonHeader>
        {mode === "captured" ? (
          <LogList
            isLoading={isLoading}
            mode={mode}
            logs={capturedLogs}
            onDelete={deleteLog}
            onMigrate={migrateLog}
            onEdit={handleEdit}
          />
        ) : (
          <LogList
            isLoading={isLoading}
            mode={mode}
            logs={migratedLogs}
            onDelete={deleteLog}
            onRecover={recoverLog}
          />
        )}
        {mode === "captured" && (
          <>
            <AddLogButton textareaRef={textareaRef} />
            <LogModal
              mode={logToEdit ? "edit" : "add"}
              initialContent={logToEdit?.content}
              onSave={logToEdit ? handleEditSave : saveLog}
              onClose={() => setLogToEdit(null)}
              textareaRef={textareaRef}
              triggerId={logToEdit ? undefined : "add-log-button"}
            />
          </>
        )}
      </IonContent>
    );
  }

  return (
    <IonPage>
      <IonHeader collapse="fade" translucent>
        <IonToolbar>
          <IonSegment swipeGesture={false}>
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
