import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { z } from "@/utils/pt-br-zod";
import { Field, Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useSignInEmailPasswordController } from "@/controllers/signIn-email-password";
import { ErrorMessage } from "@/components/ui/error-message";
import { ButtonSubmit } from "@/components/custom/button-submit";
import { Loader2, Mail } from "lucide-react";

export const Route = createFileRoute("/send-email-reset")({
  component: SendEmailResetPassword,
});

const emailSchema = z.object({
  email: z.string().email(),
});

export function SendEmailResetPassword() {
  const { resetPassword } = useSignInEmailPasswordController();

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={toFormikValidationSchema(emailSchema)}
      onSubmit={resetPassword}
    >
      <Form>
        <div className="w-full h-[100vh] flex justify-center items-center bg-gray-200">
          <Card className="w-full max-w-sm border border-gray-300">
            <CardHeader>
              <CardTitle className="text-2xl">Redefinição de senha</CardTitle>
              <CardDescription>
                Entre com seu email e receba o link para uma nova senha.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                <div className="flex">
                  &nbsp;
                  <ErrorMessage name="email" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <ButtonSubmit
                textButton="Enviar Email"
                className="w-full flex gap-2"
                type="submit"
                icon={<Mail />}
                iconLoading={<Loader2 className="animate-spin" />}
              />
            </CardFooter>
          </Card>
        </div>
      </Form>
    </Formik>
  );
}
