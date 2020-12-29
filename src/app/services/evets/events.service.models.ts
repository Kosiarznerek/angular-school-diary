export interface IEvent {
  id: number;
  teacherId: number;
  classId: number;
  date: string;
  description: string;
  type: 'Test' |
    'Card' |
    'Interview' |
    'Trip' |
    'ClassCanceled' |
    'Substitute';
  priority: 'Low' |
    'Medium' |
    'High';
}
