export interface User {
  public_id?: string;
  first_name: string;
  last_name: string;
  username: string;
  password?: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface JwtToken {
  token: string;
}
