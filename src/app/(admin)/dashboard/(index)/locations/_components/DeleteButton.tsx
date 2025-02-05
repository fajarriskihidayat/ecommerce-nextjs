"use client";

import SubmitButton from "@/app/components/SubmitButton";
import { ActionResult } from "@/types";
import { Trash } from "lucide-react";
import { useFormState } from "react-dom";
import { deleteLocation } from "../lib/actions";

const initialState: ActionResult = {
  error: "",
};

interface DeleteButtonProps {
  id: number;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const deleteLocationWithId = (_: unknown, formData: FormData) =>
    deleteLocation(_, formData, id);

  const [_, formAction] = useFormState(deleteLocationWithId, initialState);

  return (
    <form action={formAction}>
      <SubmitButton size="sm" variant="destructive">
        <Trash className="w-4 h-4" /> Delete
      </SubmitButton>
    </form>
  );
};

export default DeleteButton;
