import db from "@/db";
import { Log, NewLog } from "@/types/log";

export default class LogsService {
  private static instance: LogsService;

  private constructor() {}

  public static getInstance(): LogsService {
    if (!LogsService.instance) {
      LogsService.instance = new LogsService();
    }
    return LogsService.instance;
  }

  public async getAllLogs(): Promise<Log[]> {
    return await db.logs
      .orderBy("createdDate")
      .reverse()
      .toArray()
      .then((logs) =>
        logs.filter((log): log is Log => typeof log.id === "number")
      );
  }

  public async createLog(content: string): Promise<void> {
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

  public async deleteLog(id: number): Promise<void> {
    await db.logs.delete(id);
  }

  public async migrateLog(id: number): Promise<void> {
    await db.logs.update(id, {
      migratedDate: new Date(),
      isMigrated: true,
    });
  }

  public async recoverLog(id: number): Promise<void> {
    await db.logs.update(id, {
      recoveredDate: new Date(),
      isMigrated: false,
    });
  }
}
