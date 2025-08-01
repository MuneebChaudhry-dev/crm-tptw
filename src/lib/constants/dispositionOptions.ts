export const DISPOSITION_OPTIONS = [
  { value: 'New Lead', label: 'New Lead' },
  { value: 'No response', label: 'No response' },
  { value: 'Not interested', label: 'Not interested' },
  { value: 'Follow up', label: 'Follow up' },
  { value: 'Converted', label: 'Converted' },
  { value: 'Wrong No.', label: 'Wrong No.' },
] as const;

export type DispositionValue = (typeof DISPOSITION_OPTIONS)[number]['value'];
