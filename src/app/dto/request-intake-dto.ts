export interface RequestIntakeDTO {
  name: string;
  intakeStartDate: string; // Expected format: 'yyyy-MM-dd'
  intakeEndDate: string;   // Expected format: 'yyyy-MM-dd'
  availableSeats: number;
  courseId: string;
  price: number;
}
