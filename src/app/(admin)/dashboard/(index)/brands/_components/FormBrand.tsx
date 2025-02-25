"use client";

import SubmitButton from "@/app/(admin)/dashboard/(index)/_components/SubmitButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { postBrand, updateBrand } from "../lib/actions";
import { ActionResult } from "@/types";
import { Brand } from "@prisma/client";

const initialState: ActionResult = {
  error: "",
};

interface FormBrandProps {
  type?: "ADD" | "EDIT";
  data?: Brand | null;
}

const FormBrand = ({ data, type = "ADD" }: FormBrandProps) => {
  const updateBrandWithId = (_: unknown, formData: FormData) =>
    updateBrand(_, formData, data?.id);

  const [state, formAction] = useFormState(
    type === "ADD" ? postBrand : updateBrandWithId,
    initialState
  );

  return (
    <form action={formAction}>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid w-full lg:max-w-[40rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link href="/dashboard/categories">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {type === "ADD" ? "Add" : "Edit"} Brand
            </h1>
          </div>
          <div className="grid gap-4 lg:gap-8">
            <div className="grid auto-rows-max gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>Brand Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {state.error !== "" && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{state.error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="grid gap-6 mt-4">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        className="w-full"
                        placeholder="Masukkan brand"
                        defaultValue={data?.name}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="name">Logo</Label>
                      <Input
                        id="logo"
                        name="image"
                        type="file"
                        className="w-full"
                        placeholder="Masukkan foto"
                      />
                    </div>
                  </div>
                </CardContent>
                <div className="flex items-center justify-end gap-2 mb-6 mx-6">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/categories">Cancel</Link>
                  </Button>
                  <SubmitButton size="sm">Save Brand</SubmitButton>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormBrand;
