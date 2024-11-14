export interface NewLog {
  content: string;
  createdDate: Date;
  updatedDate: Date;
  migratedDate: Date | null;
  recoveredDate: Date | null;
  isMigrated: boolean;
}

export interface Log extends NewLog {
  id: number;
}
