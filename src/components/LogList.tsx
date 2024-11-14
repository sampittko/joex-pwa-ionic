import { Log } from "@/types/log";
import { IonItem, IonLabel } from "@ionic/react";
import {
  IonIcon,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
} from "@ionic/react";
import { IonList } from "@ionic/react";
import { trash } from "ionicons/icons";

interface LogListProps {
  logs: Log[];
  onDelete: (id: number) => void;
}

export default function LogList({ logs, onDelete }: LogListProps) {
  return (
    <IonList inset>
      {logs.length === 0 ? (
        <IonItem>
          <IonLabel className="ion-text-center ion-padding" color="medium">
            No logs yet
          </IonLabel>
        </IonItem>
      ) : (
        logs.map((log) => (
          <IonItemSliding key={log.id}>
            <IonItem>
              <IonLabel>{log.content}</IonLabel>
            </IonItem>
            <IonItemOptions side="end">
              <IonItemOption color="danger" onClick={() => onDelete(log.id)}>
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        ))
      )}
    </IonList>
  );
}
