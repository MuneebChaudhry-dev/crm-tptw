export const DISPOSITION_OPTIONS = [
  { value: 'No response', label: 'No response' },
  { value: 'Not interested', label: 'Not interested' },
  { value: 'Follow Up', label: 'Follow up' },
  { value: 'New Lead', label: 'New Lead' },
  { value: 'Converted', label: 'Converted' },
  { value: 'Wrong No.', label: 'Wrong No.' },
] as const;

export type DispositionValue = (typeof DISPOSITION_OPTIONS)[number]['value'];
