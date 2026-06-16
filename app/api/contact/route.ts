import { db } from "@/db";
import { contacts } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { fullName, email, phone, subject, message } = body;

    // Basic validation (lightweight, we’ll upgrade later with Zod)
    if (!fullName || !email || !phone || !subject || !message) {
      return Response.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    // Insert into DB
    await db.insert(contacts).values({
      fullName,
      email,
      phone,
      subject,
      message,
      status: "new",
    });

    return Response.json({
      success: true,
      message: "Message sent successfully. We will get back to you soon.",
    });

  } catch (error) {
    console.error("Contact API Error:", error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}