import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto {
    @IsEmail({}, { 
        message: i18nValidationMessage('validation.INVALID_EMAIL').name
    })
    @IsNotEmpty({ 
        message: i18nValidationMessage('validation.EMAIL_REQUIRED').name
    })
    email: string;

    @IsString({ message: i18nValidationMessage('validation.INVALID_PASSWORD').name })
    @IsNotEmpty({ 
        message: i18nValidationMessage('validation.PASSWORD_REQUIRED').name
    })
    password: string;

    @IsString({ message: i18nValidationMessage('validation.INVALID_FULLNAME').name })
    @IsOptional()
    full_name?: string;
}