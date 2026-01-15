import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // First, try to sign up the user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: {
            role: "admin",
            email_verified: true,
          },
        },
      }
    );

    if (signUpError) {
      return NextResponse.json({ error: signUpError.message }, { status: 400 });
    }

    // If user already exists, update their metadata
    if (signUpData.user) {
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          role: "admin",
          email_verified: true,
        },
      });

      if (updateError) {
        return NextResponse.json(
          { error: updateError.message },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Admin user created/updated successfully",
      user: signUpData.user,
    });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get current session to check if user exists
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!session) {
      return NextResponse.json({ message: "No active session" });
    }

    return NextResponse.json({
      user: session.user,
      user_metadata: session.user.user_metadata,
      is_admin: session.user.user_metadata?.role === "admin",
    });
  } catch (error) {
    console.error("Get session error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
