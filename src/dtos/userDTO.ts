export interface UserResponseDTO {
    id: number;
    token: string;
}

export interface UserRequestDTO {
    username: string;
    email: string;
    password: string;
}

export interface UserDTO {
    id?:number;
    username: string;
    email: string;
    password: string;
}