import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/user.repository';
import { IsEmailAvailableConstraint } from './validators/is-email-available.decorator';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [IsEmailAvailableConstraint],
})
export class ValidationModule {}
