export interface IReminder {
  key: string,
  val: {
    coords: {
      accuracy: number;
      latitude: number;
      longitude: number;
    },
    reminderText: string;
    reminerCreatedAt: number;
    reminderTypeSelect: 'arrive' | 'depart';
  }
}
