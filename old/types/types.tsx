export default interface ChatString {
  id: string;
  date: string;
  txt: string;
  user: string;
}

export interface RegisterObject {
  id?: string;
  name?: string;
  sName?: string;
  login?: string;
  password?: string;
}

export interface AuthObject {
  login: string;
  password: string;
}


