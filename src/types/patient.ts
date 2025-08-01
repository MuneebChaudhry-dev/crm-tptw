export interface Patient {
  id: string;
  created_at: string;
  clientInfo: {
    name: string;
    email: string;
    phone: string;
  };
  dob: string;
  insurance_type: string;
  med_id: string;
  message: boolean;
  disposition_status: 'Follow Up' | 'New Lead' | 'Late by 2D' | 'Late by 3D';
  follow_up_date: string;
  logs: boolean;
}
