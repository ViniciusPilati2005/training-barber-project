import { ErrorMessage as ErrorMessageFromFormik } from "formik";

export function ErrorMessage({ name }: { name: string }) {
  return (
    <p className="text-red-500">
      <ErrorMessageFromFormik name={name} />
    </p>
  );
}
