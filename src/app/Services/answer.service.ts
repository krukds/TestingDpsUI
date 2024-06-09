import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AnswerModel } from "../../Models/answer.model";

@Injectable({
    providedIn: 'root'
})
export class AnswerService {
    private baseUrl = 'http://127.0.0.1:8000/api/answers';

    constructor(private http: HttpClient) {}

    getAllAnswers(test_id: number | null): Observable<AnswerModel[]> {
        let params = new HttpParams();
        if (test_id !== null) {
            params = params.set('test_id', test_id.toString());
        }

        return this.http.get<AnswerModel[]>(this.baseUrl, { params });
    }

    getAnswerById(id: number): Observable<AnswerModel> {
        return this.http.get<AnswerModel>(`${this.baseUrl}/${id}`);
    }

    addAnswer(name: string, test_id: number, is_correct: boolean): Observable<AnswerModel> {
        return this.http.post<AnswerModel>(this.baseUrl, { name, test_id, is_correct });
    }

    updateAnswer(id: number, name: string, test_id: number, is_correct: boolean): Observable<AnswerModel> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.put<AnswerModel>(url, { name, test_id, is_correct });
    }

    deleteAnswer(id: number): Observable<void> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}
