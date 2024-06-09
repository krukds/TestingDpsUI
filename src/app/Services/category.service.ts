import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoryModel } from "../../Models/category.model";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private baseUrl = 'http://127.0.0.1:8000/api/categories';

    constructor(private http: HttpClient) {}

    getAllCategories(testing_id: number | null): Observable<CategoryModel[]> {
        let params = new HttpParams();
        if (testing_id !== null) {
            params = params.set('testing_id', testing_id.toString());
        }

        return this.http.get<CategoryModel[]>(this.baseUrl, { params });
    }

    getCategoryById(id: number): Observable<CategoryModel> {
        return this.http.get<CategoryModel>(`${this.baseUrl}/${id}`);
    }

    addCategory(name: string, testing_id: number): Observable<CategoryModel> {
        return this.http.post<CategoryModel>(this.baseUrl, { name, testing_id });
    }

    updateCategory(id: number, name: string, testing_id: number): Observable<CategoryModel> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.put<CategoryModel>(url, { name, testing_id });
    }

    deleteCategory(id: number): Observable<void> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}
