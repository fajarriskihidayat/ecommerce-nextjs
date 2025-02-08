"use client";

import { Button } from "@/components/ui/button";
import { ActionResult } from "@/types";
import { Trash } from "lucide-react";
import React from "react";
import { useFormState } from "react-dom";
import SubmitButton from "@/app/components/SubmitButton";

const initialState: ActionResult = {
  error: "",
};

interface DeleteButtonProps {
  id: number;
  action: (
    _: unknown,
    formData: FormData,
    id: number | undefined
  ) => Promise<{ error: string }>;
}

const DeleteButton = ({ id, action }: DeleteButtonProps) => {
  const deleteWithId = (_: unknown, formData: FormData) =>
    action(_, formData, id);

  const [_, formAction] = useFormState(deleteWithId, initialState);

  return (
    <form action={formAction}>
      <SubmitButton size="sm" variant="destructive">
        <Trash className="w-4 h-4" /> Delete
      </SubmitButton>
    </form>
  );
};

export default DeleteButton;
