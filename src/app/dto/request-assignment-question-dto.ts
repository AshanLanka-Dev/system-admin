import {RequestAssignmentSubQuestionDTO} from './request-assignment-sub-question-dto';

export interface RequestAssignmentQuestionDTO {
  paragraph: string;
  subQuestions: RequestAssignmentSubQuestionDTO[];
}
