import { Injectable } from '@angular/core';
import { Answer, Chat, ConversationConfig, Question, QuestionType } from 'src/app/interfaces/general.interface';
import { ApiService } from '../api/api.service';

interface QuestionMap {[key:string]: Question};
interface AnswerMap {[key:string]: Answer[]}; // the key represents a question.
@Injectable({
  providedIn: 'root'
})
export class ConversationConfigService {

  questions: Question[] = [];
  answers: Answer[] = [];
  questionMap :QuestionMap ={};
  answerMap :AnswerMap = {}

  constructor(private apiService: ApiService) { 
    this.buildAnswerMap();
  }


  buildQuestionMap (questions: Question[]){
    questions.forEach(question => {
      this.questionMap[question.id] = question;
    })
  }

  buildAnswerMap (answers: Answer[]){
    answers.forEach(answer => {
      answer.qids.forEach(qid => {
        this.answerMap[qid].push(answer);
      })
    })
  }
  
  async getConversationConfig(chatId: string): Promise<ConversationConfig[]> {
    const chat = await this.apiService.getChatById(chatId);
    return this.buildConversationConfig(this.questionMap, this.answerMap, chat);
  }

  buildConversationConfig(questionsMap: QuestionMap, answersMap:AnswerMap, chat: Chat) : ConversationConfig[] {
    let ans:ConversationConfig[] = [];
    const orderedChatQuestions = chat.questions.sort(question => question.order - question.order)
    orderedChatQuestions.forEach(chatEntry => {
      const convConfigEntry: ConversationConfig = {} as ConversationConfig;
      const question = questionsMap[chatEntry.qid];
      const answers = answersMap[question.id]

      convConfigEntry.questionText = question.text;
      convConfigEntry.type = question.type;

      switch (convConfigEntry.type) {
        case QuestionType.Numeric :
          if (answers.length>1) {
            return; // we don't suppose to have more then 1 ans for numeric question
          }
          convConfigEntry.validations = answers[0].range;
          break;
        
        case QuestionType.MultiChoice :
          if (answers.length < 1) {
            return;
          }
          convConfigEntry.options = answers.map(answer => answer.text!);
      }
      ans.push(convConfigEntry);

    })

    return ans;
  }
}
