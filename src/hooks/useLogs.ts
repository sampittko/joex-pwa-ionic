import LogsService from "@/services/logs";
import { useLiveQuery } from "dexie-react-hooks";
import { useCallback, useMemo } from "react";

export default function useLogs() {
  const logs = useLiveQuery(() => LogsService.getInstance().getAllLogs()) ?? [];

  const capturedLogs = useMemo(
    () => logs.filter((log) => !log.isMigrated),
    [logs]
  );

  const migratedLogs = useMemo(
    () => logs.filter((log) => log.isMigrated),
    [logs]
  );

  const handleSave = useCallback(async (content: string) => {
    await LogsService.getInstance().createLog(content);
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    await LogsService.getInstance().deleteLog(id);
  }, []);

  const handleMigrate = useCallback(async (id: number) => {
    await LogsService.getInstance().migrateLog(id);
  }, []);

  const handleRecover = useCallback(async (id: number) => {
    await LogsService.getInstance().recoverLog(id);
  }, []);

  return {
    capturedLogs,
    migratedLogs,
    saveLog: handleSave,
    deleteLog: handleDelete,
    migrateLog: handleMigrate,
    recoverLog: handleRecover,
  };
}
