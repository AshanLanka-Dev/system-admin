export interface RequestApplicationUserDTO {
  username: string;
  password: string;
  fullName: string;
  countryCode: string;
  phoneNumber: string;
  role: string; // ADMIN, STUDENT, TRAINER
}
