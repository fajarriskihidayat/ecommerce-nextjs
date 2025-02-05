"use client";

import { Button } from "@/components/ui/button";
import { ActionResult } from "@/types";
import { Trash } from "lucide-react";
import React from "react";
import { deleteCategory } from "../lib/actions";
import { useFormState } from "react-dom";
import SubmitButton from "@/app/components/SubmitButton";

const initialState: ActionResult = {
  error: "",
};

interface DeleteButtonProps {
  id: number;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const deleteCategoryWithId = (_: unknown, formData: FormData) =>
    deleteCategory(_, formData, id);

  const [_, formAction] = useFormState(deleteCategoryWithId, initialState);

  return (
    <form action={formAction}>
      <SubmitButton size="sm" variant="destructive">
        <Trash className="w-4 h-4" /> Delete
      </SubmitButton>
    </form>
  );
};

export default DeleteButton;
