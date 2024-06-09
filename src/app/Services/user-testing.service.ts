import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserTestingModel } from "../../Models/user-testing.model";

@Injectable({
    providedIn: 'root'
})
export class UserTestingService {
    private baseUrl = 'http://127.0.0.1:8000/api/user-testings';


    constructor(private http: HttpClient) {}

    getAllUserTestings(user_id: number | null, testing_id: number | null): Observable<UserTestingModel[]> {
        let params = new HttpParams();
        if(user_id !== null) {
            params = params.set('user_id', user_id.toString());
        }

        if(testing_id !== null) {
            params = params.set('testing_id', testing_id.toString());
        }

        return this.http.get<UserTestingModel[]>(this.baseUrl, {params});
    }

    getUserTestingById(id: number): Observable<UserTestingModel> {
        return this.http.get<UserTestingModel>(`${this.baseUrl}/${id}`);
      }

    addUserTesting(user_id: number, testing_id: number): Observable<UserTestingModel> {
        return this.http.post<UserTestingModel>(this.baseUrl, {user_id, testing_id});
    }

    // updateUserTesting(id: number, name: string, time: number): Observable<UserTestingModel> {
    //     const url = `${this.baseUrl}/${id}`;
    //     return this.http.put<UserTestingModel>(url, {name, time});
    // }

    deleteUserTesting(id: number): Observable<void> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete<void>(url);
    }

}