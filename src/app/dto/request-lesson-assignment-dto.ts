export interface RequestLessonAssignmentDTO {
  title: string;
  description: string;
  time: number;
  passValue: number;
  backwardAvailable?: boolean;
  halfMarksForMultipleAnswers?: boolean;
  finalAssignment?: boolean;
}
