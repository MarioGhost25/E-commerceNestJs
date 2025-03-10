export class CreateAuthDto {
  constructor(
    public name: string,
    public email: string,
    public password: string,
  ) {}

  public static create(object: {
    [key: string]: any;
  }): [string?, CreateAuthDto?] {
    const { name, email, password } = object;
    if (!name) return ['Missing Name', undefined];
    if (!email) return ['Missing email', undefined];
    if (!password) return ['Missing Password', undefined];
    if (typeof password !== 'string' || password.length < 6)
      return ['Password too short', undefined];

    return [undefined, new CreateAuthDto(name, email, password)];
  }
}
