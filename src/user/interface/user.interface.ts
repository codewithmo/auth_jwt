export interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;  
  DOB: string;  //'YYYY-MM-DD'
  City?: string;
}

export interface IUserInfo {
  name: string;
  email: string;
  phone: string;
  DOB: string;  //'YYYY-MM-DD'
  City?: string;
}
