import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const senderEmail = formData.get("senderEmail") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const files = formData.getAll("attachments") as File[];

    if (!senderEmail || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Configure SMTP Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for others
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Prevent indefinite hangs
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,
      socketTimeout: 10000,
      debug: true, // Enable for troubleshooting
      logger: true, // Log to console
    });

    // Prepare attachments for Nodemailer
    const attachments = await Promise.all(
      files.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        return {
          filename: file.name,
          content: buffer,
        };
      })
    );

    // Send Mail
    await transporter.sendMail({
      from: `"${senderEmail}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: senderEmail,
      subject: `[Portfolio Inquiry] ${subject}`,
      text: `From: ${senderEmail}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2 style="color: #007AFF;">New Portfolio Message</h2>
          <p><strong>From:</strong> ${senderEmail}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <div style="white-space: pre-wrap; margin-top: 20px;">
            ${message}
          </div>
        </div>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Mail Dispatch Error:", error);
    return NextResponse.json(
      { error: "Failed to dispatch email", details: error.message },
      { status: 500 }
    );
  }
}
