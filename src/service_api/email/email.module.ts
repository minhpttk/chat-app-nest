import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST', 'smtp.gmail.com'),
          secure: config.get('MAIL_SECURE', false),
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('MAIL_FROM', 'noreply@example.com')}>`,
        },
        template: {
          dir: path.join(process.cwd(), 'src', 'service_api', 'email', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
            cache: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {
  constructor(
    private readonly ConfigService: ConfigService,
  ) {
    console.log('EmailModule initialized');
    console.log(this.ConfigService.get('MAIL_HOST'));
    console.log(this.ConfigService.get('MAIL_PASSWORD'));
    console.log(path.join(process.cwd(), 'src', 'service_api', 'email', 'templates'))
  }
}
