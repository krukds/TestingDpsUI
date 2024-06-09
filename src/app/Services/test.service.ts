import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TestModel } from "../../Models/test.model";

@Injectable({
    providedIn: 'root'
})
export class TestService {
    private baseUrl = 'http://127.0.0.1:8000/api/tests';

    constructor(private http: HttpClient) {}

    getAllTests(category_id: number | null): Observable<TestModel[]> {
        let params = new HttpParams();
        if (category_id !== null) {
            params = params.set('category_id', category_id.toString());
        }

        return this.http.get<TestModel[]>(this.baseUrl, { params });
    }

    getTestById(id: number): Observable<TestModel> {
        return this.http.get<TestModel>(`${this.baseUrl}/${id}`);
    }

    addTest(name: string, category_id: number): Observable<TestModel> {
        return this.http.post<TestModel>(this.baseUrl, { name, category_id });
    }

    updateTest(id: number, name: string, category_id: number): Observable<TestModel> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.put<TestModel>(url, { name, category_id });
    }

    deleteTest(id: number): Observable<void> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}
