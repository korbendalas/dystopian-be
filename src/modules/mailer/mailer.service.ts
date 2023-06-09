import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { IEmailConfig } from '../../config/email-config.interface';
import { ITemplatedData } from './interfaces/template-data.interface';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ITemplates } from './interfaces/templates.interface';
import { User } from '@prisma/client';
import Handlebars from 'handlebars';

@Injectable()
export class MailerService {
  private readonly loggerService: LoggerService;
  private readonly transport: Transporter<SMTPTransport.SentMessageInfo>;
  private readonly email: string;
  private readonly domain: { frontend: string; backend: string };
  private readonly templates: ITemplates;

  constructor(private readonly configService: ConfigService) {
    const emailConfig = this.configService.get<IEmailConfig>('emailService');
    this.transport = createTransport(emailConfig);
    this.email = `"My App" <${emailConfig.auth.user}>`;
    this.domain = this.configService.get('domain');
    this.loggerService = new Logger(MailerService.name);
    this.templates = {
      confirmation: MailerService.parseTemplate('confirmation.hbs'),
      resetPassword: MailerService.parseTemplate('reset-password.hbs'),
    };
  }

  private static parseTemplate(
    templateName: string,
  ): Handlebars.TemplateDelegate<ITemplatedData> {
    const templateText = readFileSync(
      join(__dirname, 'templates', templateName),
      'utf-8',
    );
    return Handlebars.compile<ITemplatedData>(templateText, { strict: true });
  }

  public sendEmail(
    to: string,
    subject: string,
    html: string,
    log?: string,
  ): void {
    this.transport
      .sendMail({
        from: this.email,
        to,
        subject,
        html,
      })
      .then(() => this.loggerService.log(log ?? 'A new email was sent.'))
      .catch((error) => this.loggerService.error(error));
  }
  public sendConfirmationEmail(user: User, token: string): void {
    const { email, firstName } = user;
    const subject = 'Confirm your email';
    const html = this.templates.confirmation({
      name: firstName,
      link: `${this.domain.backend}/api/v1/auth/confirm/${token}`,
    });
    this.sendEmail(email, subject, html, 'A new confirmation email was sent.');
  }

  public sendResetPasswordEmail(user: User, token: string): void {
    const { email, firstName } = user;
    const subject = 'Reset your password';
    const html = this.templates.resetPassword({
      name: firstName,
      link: `${this.domain}/api/v1/auth/reset-password/${token}`,
    });
    this.sendEmail(
      email,
      subject,
      html,
      'A new reset password email was sent.',
    );
  }
}
