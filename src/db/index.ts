import { NewLog } from "@/types/log";
import Dexie, { Table } from "dexie";

class AppDatabase extends Dexie {
  logs!: Table<NewLog & { id?: string }>;

  constructor() {
    super("joex");
    this.version(1).stores({
      logs: "++id, content, createdDate, updatedDate, migratedDate, recoveredDate, isMigrated",
    });
  }
}

const db = new AppDatabase();

export default db;
