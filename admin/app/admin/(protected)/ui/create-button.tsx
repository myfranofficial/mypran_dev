import Link from "next/link";
import { IconPlus } from "./icons";
import { btnCreate } from "./styles";

export function CreateButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={btnCreate}>
      <IconPlus size={16} />
      {children}
    </Link>
  );
}
