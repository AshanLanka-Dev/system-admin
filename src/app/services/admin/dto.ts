// Add these interfaces to your DTO folder

export interface RequestAdminDTO {
  userId: string;
  phoneNumber: string | null;
  countryCode: string | null;
  fullName: string | null;
  displayName: string | null;
  email: string | null;
  dob: string | null;
  nic: string | null;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | null;
  address: RequestAddressDetailDTO;
  employment: RequestEmploymentDetailDTO;
}

export interface RequestAddressDetailDTO {
  street: string | null;
  city: string | null;
  district: string | null;
  province: string | null;
  postalCode: string | null;
  country: string | null;
}

export interface RequestEmploymentDetailDTO {
  employmentType: 'FULL_TIME' | 'PART_TIME' | null;
  designation: string | null;
}
