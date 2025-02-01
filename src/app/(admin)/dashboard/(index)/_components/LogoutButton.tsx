"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ActionResult } from "@/types";
import { LogOut } from "lucide-react";
import { Logout } from "../lib/actions";
import { useFormState } from "react-dom";

const initialState: ActionResult = {
  error: "",
};

const LogoutButton = () => {
  const [_, formAction] = useFormState(Logout, initialState);

  return (
    <form
      action={formAction}
      className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="submit"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          >
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">Logout</TooltipContent>
      </Tooltip>
    </form>
  );
};

export default LogoutButton;
