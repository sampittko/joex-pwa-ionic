import { LogsService } from "@/services/logs";
import { useLiveQuery } from "dexie-react-hooks";

export function useLogs() {
  const logs = useLiveQuery(() => LogsService.getInstance().getAllLogs()) ?? [];

  async function handleSave(content: string) {
    await LogsService.getInstance().createLog(content);
  }

  async function handleDelete(id: string) {
    await LogsService.getInstance().deleteLog(id);
  }

  return {
    logs,
    saveLog: handleSave,
    deleteLog: handleDelete,
  };
}
