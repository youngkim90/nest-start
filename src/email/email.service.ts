import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

import { Injectable } from '@nestjs/common';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor(private readonly config: ConfigService) {
    // nodemailer에서 제공하는 Transporter 객체를 생성
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.get('EMAIL'), // TODO: config
        pass: config.get('EMAIL_PASS'), // TODO: config
      },
    });
  }

  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string,
  ) {
    const baseUrl = 'http://localhost:3000'; // TODO: config

    // 이 링크를 통해 다시 우리 서비스로 이메일 인증 요청
    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

    // form 태그를 이용하여 POST 요청
    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
        가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
        <form action="${url}" method="POST">
          <button>가입확인</button>
        </form>
      `,
    };

    return await this.transporter.sendMail(mailOptions); // transporter 객체를 이용하여 메일을 전송
  }
}
