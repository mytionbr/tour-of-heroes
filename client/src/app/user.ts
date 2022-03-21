export interface User {
    email?: string;
    username?: string;
    password?: string;
    token?: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserResponse {
    id: number;
    token: string;
}

export interface UserInfo extends UserResponse {}