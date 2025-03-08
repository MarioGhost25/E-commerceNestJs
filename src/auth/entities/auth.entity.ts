export class AuthEntity {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
  ) {}

  public static fromObject(object: { [key: string]: any }): AuthEntity {
    const { id, name, email, password } = object;

    const userEntity = new AuthEntity(id, name, email, password);

    return userEntity;
  }
}
