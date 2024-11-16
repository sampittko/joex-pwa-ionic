import { Log } from "@/types/log";
import { IonItem, IonLabel } from "@ionic/react";
import {
  IonAlert,
  IonIcon,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
} from "@ionic/react";
import { IonList } from "@ionic/react";
import { arrowBack, arrowForward, trash } from "ionicons/icons";
import { useState } from "react";

type BaseLogListProps = {
  logs: Log[];
  onDelete: (id: number) => void;
};

type CapturedLogListProps = BaseLogListProps & {
  mode: "captured";
  onMigrate: (id: number) => void;
  onRecover?: never;
  onEdit: (id: number, content: string) => void;
};

type MigratedLogListProps = BaseLogListProps & {
  mode: "migrated";
  onMigrate?: never;
  onRecover: (id: number) => void;
  onEdit?: never;
};

type LogListProps = CapturedLogListProps | MigratedLogListProps;

export default function LogList(props: LogListProps) {
  const { logs, onDelete, onMigrate, onRecover, onEdit, mode } = props;
  const [logToDelete, setLogToDelete] = useState<number | null>(null);

  const actionConfig = {
    captured: {
      action: onMigrate,
      color: "primary",
      icon: arrowForward,
    },
    migrated: {
      action: onRecover,
      color: "warning",
      icon: arrowBack,
    },
  } as const;

  function handleSwipeAction(logId: number): void {
    actionConfig[mode].action?.(logId);
  }

  function handleDelete(logId: number): void {
    mode === "migrated" ? onDelete(logId) : setLogToDelete(logId);
  }

  function handleAlertDismiss(): void {
    setLogToDelete(null);
  }

  function handleAlertDelete(): void {
    if (logToDelete) {
      onDelete(logToDelete);
      setLogToDelete(null);
    }
  }

  const renderSwipeOptions = (log: Log) => (
    <>
      <IonItemOptions side="start" onIonSwipe={() => handleSwipeAction(log.id)}>
        <IonItemOption
          color={actionConfig[mode].color}
          onClick={() => handleSwipeAction(log.id)}
          expandable
        >
          <IonIcon
            slot="icon-only"
            icon={actionConfig[mode].icon}
            style={{ color: "#ffffff" }}
          />
        </IonItemOption>
      </IonItemOptions>

      <IonItemOptions side="end" onIonSwipe={() => handleDelete(log.id)}>
        <IonItemOption
          color="danger"
          onClick={() => handleDelete(log.id)}
          expandable
        >
          <IonIcon slot="icon-only" icon={trash} style={{ color: "#ffffff" }} />
        </IonItemOption>
      </IonItemOptions>
    </>
  );

  return (
    <>
      <IonList inset>
        {logs.length === 0 ? (
          <IonItem color="light">
            <IonLabel className="ion-text-center" color="medium">
              {mode === "captured"
                ? "List is empty 🥳"
                : "No logs available 📝"}
            </IonLabel>
          </IonItem>
        ) : (
          logs.map((log) => (
            <IonItemSliding key={log.id}>
              {renderSwipeOptions(log)}
              <IonItem
                color="light"
                onClick={() =>
                  mode === "captured" && onEdit?.(log.id, log.content)
                }
                button={mode === "captured"}
                detail={false}
              >
                <IonLabel>{log.content}</IonLabel>
              </IonItem>
            </IonItemSliding>
          ))
        )}
      </IonList>

      {mode === "captured" && (
        <IonAlert
          isOpen={logToDelete !== null}
          onDidDismiss={handleAlertDismiss}
          header="Confirm Delete"
          message="Are you sure you want to delete this log?"
          buttons={[
            { text: "Cancel", role: "cancel" },
            {
              text: "Delete",
              role: "destructive",
              handler: handleAlertDelete,
            },
          ]}
        />
      )}
    </>
  );
}
