"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import SubmitButton from "../../_components/SubmitButton";
import UploadImages from "./UploadImages";
import { ActionResult } from "@/types";
import { useFormState } from "react-dom";
import { storeProduct, updateProduct } from "../lib/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Product } from "@prisma/client";

const initialState: ActionResult = {
  error: "",
};

interface FormProductProps {
  children: React.ReactNode;
  type?: "ADD" | "EDIT";
  data?: Product | null;
}

const FormProduct = ({ children, type = "ADD", data }: FormProductProps) => {
  const updateWIthId = (_: unknown, formData: FormData) =>
    updateProduct(_, formData, data?.id ?? 0);

  const [state, formAction] = useFormState(
    type === "ADD" ? storeProduct : updateWIthId,
    initialState
  );

  return (
    <form action={formAction}>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link href="/dashboard/products">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {type === "ADD" ? "Add" : "Edit"} Product
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/products">Cancel</Link>
              </Button>
              <SubmitButton size="sm">Save Product</SubmitButton>
            </div>
          </div>
          {state.error !== "" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        className="w-full"
                        defaultValue={data?.name}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        className="w-full"
                        defaultValue={Number(data?.price) ?? 0}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        className="min-h-32"
                        defaultValue={data?.description}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-2">
                <CardHeader>
                  <CardTitle>Product Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-3">{children}</div>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Product Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="status">Status</Label>
                      <Select name="stock" defaultValue={data?.stock}>
                        <SelectTrigger id="status" aria-label="Select status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ready">Ready</SelectItem>
                          <SelectItem value="preorder">Pre-Order</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <UploadImages />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/products">Cancel</Link>
            </Button>
            <SubmitButton size="sm">Save Product</SubmitButton>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormProduct;
