import {RequestAssignmentAnswersDTO} from './request-assignment-answers-dto';

export interface RequestAssignmentSubQuestionDTO {
  question: string;
  answers: RequestAssignmentAnswersDTO[];
}
