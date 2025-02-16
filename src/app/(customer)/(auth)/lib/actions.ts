"use server";

import { signInSchema, signUpSchema } from "@/lib/schema";
import { ActionResult } from "@/types";
import prisma from "../../../../../lib/prisma";
import bcrypt from "bcrypt";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const signIn = async (
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
      role: "customer",
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

  return redirect("/");
};

export const signUp = async (
  _: unknown,
  formData: FormData
): Promise<ActionResult> => {
  const validate = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }

  const hashPassword = bcrypt.hashSync(validate.data.password, 12);

  try {
    await prisma.user.create({
      data: {
        name: validate.data.name,
        email: validate.data.email,
        password: hashPassword,
        role: "customer",
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to sign in",
    };
  }

  return redirect("/sign-in");
};
