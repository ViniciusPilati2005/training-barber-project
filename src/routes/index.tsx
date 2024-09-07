import { createFileRoute } from "@tanstack/react-router";
import barberShop from "@/assets/barberShop.jpg";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSignInEmailPasswordController } from "@/controllers/signIn-email-password";
import { z } from "@/utils/pt-br-zod";
import { Form, Formik } from "formik";
import { AppleIcon, ChromeIcon, LogInIcon } from "lucide-react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ErrorMessage } from "@/components/ui/error-message";
import { Field } from "@/components/ui/field";

export const Route = createFileRoute("/")({
  component: LoginPage,
});

const User = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function useLogic() {
  const { signInWithEmailPassword, signInGoogle } =
    useSignInEmailPasswordController();

  const loginGoogle = () => signInGoogle();

  return {
    signInWithEmailPassword,
    loginGoogle,
  };
}

export function LoginPage() {
  const { signInWithEmailPassword, loginGoogle } = useLogic();

  return (
    <div className="flex items-center justify-center w-full h-[100vh]">
      <img
        src={barberShop}
        alt="Barbearia"
        className="static w-full h-[100vh]"
      />
      <div className="flex items-center justify-center absolute sm:top-16">
        <div className="flex flex-col justify-center border rounded w-full min-w-96 max-w-md p-8 space-y-6 bg-white">
          <div className="flex items-start justify-center space-x-2">
            <LogInIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Barbearia REACT
            </h1>
          </div>
          <h2 className="text-3xl font-semibold text-center text-gray-900">
            Faça seu login.
          </h2>
          <Formik
            validationSchema={toFormikValidationSchema(User)}
            initialValues={{ email: "", password: "" }}
            onSubmit={signInWithEmailPassword}
          >
            {({ isValid }) => (
              <Form className="space-y-4">
                <div>
                  <Label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </Label>
                  <Field
                    name="email"
                    id="email"
                    type="email"
                    placeholder="user@email.com"
                    className="w-full mt-1"
                  />
                  <p className="flex">
                    &nbsp;
                    <ErrorMessage name="email" />
                  </p>
                </div>
                <div>
                  <Label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </Label>
                  <Field
                    name="password"
                    id="password"
                    type="password"
                    placeholder="******"
                    className="w-full mt-1"
                  />
                  <p className="flex">
                    &nbsp;
                    <ErrorMessage name="password" />
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox id="remember" />
                    <Label
                      htmlFor="remember"
                      className="ml-2 text-sm text-gray-600"
                    >
                      Remember me?
                    </Label>
                  </div>
                  <a href="#" className="text-sm text-blue-600">
                    Forgot Password
                  </a>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 text-white"
                  disabled={!isValid}
                >
                  Continuar
                </Button>
              </Form>
            )}
          </Formik>
          <div className="text-center text-gray-600">
            Fazer login com outras contas?
          </div>
          <div className="flex justify-center space-x-4">
            <Button variant="ghost" className="p-2" onClick={loginGoogle}>
              <ChromeIcon className="w-6 h-6" />
            </Button>
            <Button variant="ghost" className="p-2">
              <AppleIcon className="w-6 h-6" />
            </Button>
          </div>
          <div className="text-center text-gray-600 flex gap-1">
            Não possui uma conta?
            <a href="#" className="text-blue-600">
              Clique aqui para cadastrar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
