import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Answer, Chat, Question } from 'src/app/interfaces/general.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  QuestionUrl = 'http://ec2-54-175-34-191.compute-1.amazonaws.com:8000/conversation_builder/question';
  AnswerUrl = 'http://ec2-54-175-34-191.compute-1.amazonaws.com:8000/conversation_builder/answer';
  ChatUrl = 'http://ec2-54-175-34-191.compute-1.amazonaws.com:8000/conversation_builder/chat'

  constructor(private httpClient: HttpClient) {
    this.setHeaders();
  }


  setHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
  }

  getQuestions(): Observable<Question[]> {
    const url = this.QuestionUrl;
    return this.get<string[]>(url);
  }

 
  getAnswers(): Observable<Answer[]> {
    const url = this.AnswerUrl;
    return this.get<string[]>(url);
  }

  getChatById(id: string = 'QZ8M559'): Observable<Chat[]> {
    const url = this.ChatUrl + '/' + id;
    return this.get<string[]>(url);
  }

  post<T>(url: string, body: Object, headers: Object): Observable<any> {
    return this.httpClient.post<T>(url, body, headers);
  }

  get<T>(url: string, headers?: { headers: HttpHeaders; }, params?: undefined): Observable<any> {
    let options = Object.assign({}, headers);
    options = Object.assign(options, params);
    return this.httpClient.get<T>(url, options);
  }

  put<T>(url: string, body: any, headers: {
      headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; observe: "events"; context?: HttpContext | undefined; params?: HttpParams | {
        [
        param: string]: string | number | boolean | readonly (string | number | boolean)[];
      } | undefined; reportProgress?: boolean | undefined; responseType?: "json" | undefined; withCredentials?: boolean | undefined;
    }): Observable<any> {
    return this.httpClient.put<T>(url, body, headers);
  }

  patch<T>(url: string, body: any, headers: any, params: any): Observable<any> {
    let options = Object.assign({}, headers);
    options = Object.assign(options, params);
    return this.httpClient.patch<T>(url, body, options);
  }
}
