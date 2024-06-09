export interface UserModel {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone: string;
    location_id: number;
    department_id: number
}

export interface UserDetailModel {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone: string;
    location: string;
    department: string
}