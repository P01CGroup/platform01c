import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { googleSheetsService } from "@/lib/services/google-sheets";

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  pageUrl?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    const requiredFields = ["fullName", "email", "phone", "company", "message"];
    for (const field of requiredFields) {
      if (!body[field as keyof ContactFormData]?.trim()) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Get the page URL from the request headers or use a default
    const pageUrl =
      body.pageUrl || request.headers.get("referer") || "Unknown page";

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Log the submission
    console.log("Contact form submission:", {
      timestamp: new Date().toISOString(),
      pageUrl,
      ...body,
    });
    // Send email notification
    try {
      console.log(
        "Attempting to send email with API key:",
        process.env.RESEND_API_KEY ? "Present" : "Missing"
      );

      const emailResult = await resend.emails.send({
        from: "info@p01cglobal.com", // Use Resend's default sender for testing
        to: [
          "nabeel.a@p01cglobal.com",
          "mustafa.n@p01cglobal.com",
          // "mirta.k@p01cglobal.com",
          "muqaddas.n@p01cglobal.com",
          "ahsen.a@p01cglobal.com",
        ],
        subject: "New Contact Form Submission - Platform01 Consulting",
        html: `
           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
             <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
               New Contact Form Submission
             </h2>
             
             <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
               <h3 style="color: #007bff; margin-top: 0;">Contact Details</h3>
               
               <table style="width: 100%; border-collapse: collapse;">
                 <tr>
                   <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Full Name:</td>
                   <td style="padding: 8px 0; color: #333;">${body.fullName}</td>
                 </tr>
                 <tr>
                   <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                   <td style="padding: 8px 0; color: #333;">
                     <a href="mailto:${body.email}" style="color: #007bff; text-decoration: none;">${body.email}</a>
                   </td>
                 </tr>
                 <tr>
                   <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
                   <td style="padding: 8px 0; color: #333;">
                     <a href="tel:${body.phone}" style="color: #007bff; text-decoration: none;">${body.phone}</a>
                   </td>
                 </tr>
                 <tr>
                   <td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td>
                   <td style="padding: 8px 0; color: #333;">${body.company}</td>
                 </tr>
                 <tr>
                   <td style="padding: 8px 0; font-weight: bold; color: #555; vertical-align: top;">Message:</td>
                   <td style="padding: 8px 0; color: #333; white-space: pre-wrap;">${body.message}</td>
                 </tr>
               </table>
             </div>
             
             <div style="background-color: #e9ecef; padding: 15px; border-radius: 8px; margin-top: 20px;">
               <p style="margin: 0; color: #6c757d; font-size: 14px;">
                 <strong>Submission Time:</strong> ${new Date().toLocaleString(
                   "en-US",
                   {
                     timeZone: "Asia/Riyadh",
                     year: "numeric",
                     month: "long",
                     day: "numeric",
                     hour: "2-digit",
                     minute: "2-digit",
                   }
                 )}
               </p>
               <p style="margin: 5px 0 0 0; color: #6c757d; font-size: 14px;">
                 <strong>Source:</strong> Platform01 Consulting Website Contact Form
               </p>
               <p style="margin: 5px 0 0 0; color: #6c757d; font-size: 14px;">
                 <strong>Page URL:</strong> <a href="${pageUrl}" style="color: #007bff; text-decoration: none;">${pageUrl}</a>
               </p>
             </div>
             
             <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
               <p style="color: #6c757d; font-size: 12px; margin: 0;">
                 This email was automatically generated from the contact form on the Platform01 Consulting website.
               </p>
             </div>
           </div>
         `,
      });

      console.log("Email notification sent successfully");
      console.log("Email result:", emailResult);
    } catch (emailError: any) {
      console.error("Failed to send email notification:", emailError);
      console.error("Email error details:", {
        message: emailError?.message || "Unknown error",
        name: emailError?.name || "Unknown",
        stack: emailError?.stack || "No stack trace",
      });
      // Don't fail the form submission if email fails
    }

    // Save to Google Sheets
    try {
      await googleSheetsService.appendContactSubmission({
        ...body,
        pageUrl,
        timestamp: new Date().toISOString(),
      });
      console.log("Contact submission saved to Google Sheets successfully");
    } catch (sheetsError: any) {
      console.error(
        "Failed to save contact submission to Google Sheets:",
        sheetsError
      );
      console.error("Sheets error details:", {
        message: sheetsError?.message || "Unknown error",
        name: sheetsError?.name || "Unknown",
        stack: sheetsError?.stack || "No stack trace",
      });
      // Don't fail the form submission if Google Sheets fails
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Your inquiry has been submitted successfully. We'll get back to you soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
