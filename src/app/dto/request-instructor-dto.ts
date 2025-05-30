export interface RequestInstructorDTO {
  "userId": string | null,
  "displayName": string | null,
  "email": string | null,
  "dob": string | null,
  "nic": string | null,
  "gender": string | null,
  "address": Address,
  "employment": Employment
  "academicAndProfessionalBackground":AcademicAndProfessionalBackground,
}

interface Address{
  "street": string | null,
  "city": string | null,
  "district": string | null,
  "province": string | null,
  "postalCode": string | null,
  "country": string | null
}

interface Employment{
  "employmentType": string | null,
  "designation": string | null
}

interface AcademicAndProfessionalBackground{
  "highestQualification": string | null,
  "japaneseLanguageLevel": string | null,
  "teachingExperience": string | null,
  "specialization": string | null,
  "biography": string | null
}
