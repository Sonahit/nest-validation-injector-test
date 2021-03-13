/* eslint-disable @typescript-eslint/ban-types */
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from 'src/users/user.repository';

@ValidatorConstraint({
  async: true,
})
export class IsEmailAvailableConstraint
  implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !user; // Check if user exists then email is not available
  }
  defaultMessage(): string {
    return 'Email is not available';
  }
}

export function IsEmailAvailable(
  options?: ValidationOptions,
): PropertyDecorator {
  return (target: Object, propertyName: string | symbol): void =>
    registerDecorator({
      target: target.constructor,
      propertyName: propertyName.toString(),
      validator: IsEmailAvailableConstraint,
      options,
      constraints: [propertyName],
    });
}
