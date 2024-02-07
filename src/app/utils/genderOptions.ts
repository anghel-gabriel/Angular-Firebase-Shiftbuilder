export interface IGenderOption {
  name: string;
  value: string;
}

export const genderOptionList: IGenderOption[] = [
  { name: 'Unknown', value: 'unknown' },
  { name: 'Male', value: 'male' },
  { name: 'Female', value: 'female' },
  { name: 'Other', value: 'other' },
];
