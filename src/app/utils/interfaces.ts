export interface RegisterInterface {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string | null | undefined;
}

export interface UserInterface {
  uid: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string | null | undefined;
}
