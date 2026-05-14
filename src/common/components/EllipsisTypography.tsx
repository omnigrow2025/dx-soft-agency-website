import { type FC, type ReactNode } from "react";

interface EllipsisTypographyProps {
  children: ReactNode;
  className?: string;
}

export const EllipsisTypography: FC<EllipsisTypographyProps> = ({
  children,
  className = "",
}) => {
  return <p className={`truncate max-w-full ${className}`}>{children}</p>;
};
