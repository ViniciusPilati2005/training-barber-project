import { useFormikContext } from "formik";
import { Button } from "@/components/ui/button";

interface ButtonProps {
  textButton: string;
  icon?: JSX.Element;
  iconLoading?: JSX.Element;
  className: string;
  type: "button" | "submit" | "reset";
}

export function ButtonSubmit({
  textButton,
  icon,
  iconLoading,
  className,
  type,
}: ButtonProps) {
  const { isSubmitting } = useFormikContext();

  return (
    <Button className={className} type={type}>
      {isSubmitting ? iconLoading : icon}
      {textButton}
    </Button>
  );
}
