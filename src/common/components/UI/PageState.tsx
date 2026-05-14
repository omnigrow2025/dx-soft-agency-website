import type { FC, ReactNode } from "react";
import { Loader } from "./Loader";
import { ErrorState } from "./ErrorState";
import { EmptyState } from "./EmptyState";

interface PageStateProps {
  isLoading?: boolean;
  error?: unknown;
  isEmpty?: boolean;
  children: ReactNode;
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode;
  emptyFallback?: ReactNode;
}

export const PageState: FC<PageStateProps> = ({
  isLoading,
  error,
  isEmpty,
  children,
  loadingFallback,
  errorFallback,
  emptyFallback,
}) => {
  if (isLoading) {
    return loadingFallback ?? <Loader />;
  }

  if (error) {
    return errorFallback ?? <ErrorState />;
  }

  if (isEmpty) {
    return emptyFallback ?? <EmptyState />;
  }

  return <>{children}</>;
};
