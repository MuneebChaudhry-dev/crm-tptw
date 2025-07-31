export interface Patient {
  id: string;
  timestamp: string;
  clientInfo: {
    name: string;
    email: string;
    phone: string;
  };
  dateOfBirth: string;
  insuranceType: string;
  medicareIdNo: string;
  message: boolean;
  disposition: 'Follow Up' | 'New Lead' | 'Late by 2D' | 'Late by 3D';
  followUp: string;
  logs: boolean;
}
