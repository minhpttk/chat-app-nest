import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  /**
   * Gửi email chào mừng cho người dùng mới
   */
  async sendWelcomeEmail( email: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Chào mừng',
      template: './welcome', // thêm dòng này, tên file là welcome.hbs
      context: {
        // thêm các biến bạn muốn truyền vào template
        name: email,
        date: new Date()
      }
    });
    }
  

  /**
   * Gửi email đặt lại mật khẩu
   */
  // async sendPasswordReset(user: { email: string; firstName: string }, token: string): Promise<void> {
  //   const url = `https://yourdomain.com/reset-password?token=${token}`;
    
  //   await this.mailerService.sendMail({
  //     to: user.email,
  //     subject: 'Đặt lại mật khẩu',
  //     template: './reset-password',
  //     context: {
  //       name: user.firstName,
  //       url,
  //       expiryTime: '24 giờ',
  //     },
  //   });
  // }

  // /**
  //  * Gửi email thông báo
  //  */
  // async sendNotification(to: string, subject: string, text: string): Promise<void> {
  //   await this.mailerService.sendMail({
  //     to,
  //     subject,
  //     text,
  //   });
  // }
}