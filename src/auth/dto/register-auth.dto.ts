import { IsString } from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  public name: string;
  @IsString()
  public email: string;
  @IsString()
  public password: string;
}
