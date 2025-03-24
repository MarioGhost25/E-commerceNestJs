import { IsString } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  public email: string;
  @IsString()
  public password: string;
}
