export interface ITask {
  id: string;
  dashboardId: string | null;
  exists: boolean;
  space: string;
  reporting: {
    frequency: string;
    emails: Array<string>;
    createdAt: string;
    sentAt?: string;
    runAt?: string;
    print: boolean;
  },
  history: object | null;
}
