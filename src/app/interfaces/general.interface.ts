export enum QuestionType {
    FreeText = 1,
    Numeric = 2,
    MultiChoice = 3
}

export interface Question {
    id: number,
    type: QuestionType,
    text: string
}

export interface RangeValidation {
    min: number,
    max: number
}

export interface Answer {
    id: number,
    qids: number[],
    range?: RangeValidation,
    text?: string
}

export interface ChatEntry {
    qid: number,
    order: number
}

export interface Chat {
    id: string,
    questions: ChatEntry[]
}

export interface ConversationConfig {
    questionText : string,
	type: QuestionType
	options?: string[];
	validations? : RangeValidation;
}