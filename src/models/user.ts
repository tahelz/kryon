export class User {
  id: string;
  name: string;
  password: string;
  token?: string;

  constructor(id: string, name: string, password: string) {
    this.id = id;
    this.name = name;
    this.password = password;
  }
}
