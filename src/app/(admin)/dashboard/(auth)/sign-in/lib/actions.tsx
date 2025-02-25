"use server";

import { signInSchema } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";
import bcrypt from "bcrypt";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export const SignIn = async (
  _: unknown,
  formData: FormData
): Promise<ActionResult> => {
  const validate = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
      role: "superadmin",
    },
  });

  if (!existingUser) {
    return {
      error: "Email not found.",
    };
  }

  const comparePassword = bcrypt.compareSync(
    validate.data.password,
    existingUser.password
  );

  if (!comparePassword) {
    return {
      error: "Password wrong.",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/dashboard");
};
