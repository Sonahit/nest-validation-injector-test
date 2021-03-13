import { IsString } from 'class-validator';
import { IsEmailAvailable } from 'src/validation/validators/is-email-available.decorator';

export class CreateUserDto {
  @IsEmailAvailable()
  @IsString()
  email!: string;
}
