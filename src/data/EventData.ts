export interface Event {
  id: number;
  date: string;
  time: string;
  duration: string;
  event: string;
  location: string;
  system: string;
  odometer: number;
  engHours: number;
  notes: string;
  status: string;
}

export const events: Event[] = [
  {
    id: 46,
    date: '2025-09-25',
    time: 'Sep 25, 2025 10:53:36 PM',
    duration: '1h 58m 33s',
    event: 'Off duty',
    location: '14.3 mi NE from Pike road, AL',
    system: 'Driver',
    odometer: 166855,
    engHours: 6167,
    notes: 'lunch break',
    status: 'Pending'
  },
  {
    id: 48,
    date: '2025-09-26',
    time: 'Sep 26, 2025 12:52:09 AM',
    duration: '3h 42m 16s',
    event: 'Driving',
    location: '14.3 mi NE from Pike road, AL',
    system: 'ELD',
    odometer: 166855,
    engHours: 6169.5,
    notes: '',
    status: 'Pending'
  },
  {
    id: 49,
    date: '2025-09-26',
    time: 'Sep 26, 2025 01:52:09 AM',
    duration: '',
    event: 'Intermediate w/ CLP',
    location: '6.7 mi SSW from Lagrange, GA',
    system: 'ELD',
    odometer: 166923,
    engHours: 6170.5,
    notes: '',
    status: 'Pending'
  },
  {
    id: 50,
    date: '2025-09-26',
    time: 'Sep 26, 2025 02:52:09 AM',
    duration: '',
    event: 'Intermediate w/ CLP',
    location: '1.5 mi N from Forest park, GA',
    system: 'ELD',
    odometer: 166992,
    engHours: 6171.5,
    notes: '',
    status: 'Pending'
  },
  {
    id: 51,
    date: '2025-09-26',
    time: 'Sep 26, 2025 03:52:09 AM',
    duration: '',
    event: 'Intermediate w/ CLP',
    location: '4.5 mi NW from Jefferson, GA',
    system: 'ELD',
    odometer: 167058,
    engHours: 6172.5,
    notes: '',
    status: 'Pending'
  },
  {
    id: 52,
    date: '2025-09-26',
    time: 'Sep 26, 2025 04:34:25 AM',
    duration: '0h 3m 30s',
    event: 'Sleeper',
    location: '12.5 mi S from Seneca, SC',
    system: 'Driver',
    odometer: 167104,
    engHours: 6173.2,
    notes: 'none',
    status: 'Pending'
  }
];
