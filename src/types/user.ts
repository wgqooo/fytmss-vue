
export interface User {
    id: number;
    empNo:string
    empName: string;
    empSex:string;
    empMobile: string;
    empBirthday:Date
    empAddress:string;
    roleName: string;
}

export interface Register {
    username: string;
    password: string;
    email: string;
}