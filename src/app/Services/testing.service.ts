import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TestingModel } from "../../Models/testing.model";

@Injectable({
    providedIn: 'root'
})
export class TestingService {
    private baseUrl = 'http://127.0.0.1:8000/api/testings';


    constructor(private http: HttpClient) {}

    getAllTestings(): Observable<TestingModel[]> {
        return this.http.get<TestingModel[]>(this.baseUrl);
    }

    getTestingById(id: number): Observable<TestingModel> {
        return this.http.get<TestingModel>(`${this.baseUrl}/${id}`);
      }

    addTesting(name: string, time: number): Observable<TestingModel> {
        return this.http.post<TestingModel>(this.baseUrl, {name, time});
    }

    updateTesting(id: number, name: string, time: number): Observable<TestingModel> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.put<TestingModel>(url, {name, time});
    }

    deleteTesting(id: number): Observable<void> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete<void>(url);
    }

}