import { type FC, type ReactNode } from "react";

type TableLayoutProps = {
  footer?: ReactNode;
  isLoading?: boolean;
  table: ReactNode;
};

export const TableLayout: FC<TableLayoutProps> = ({
  footer,
  isLoading,
  table,
}: TableLayoutProps) => {
  return (
    <div className="flex flex-col h-full bg-base-200">
      <div className="flex-1 overflow-hidden bg-base-100 shadow relative">
        <div className="h-full overflow-y-auto">{table}</div>

        {/* Optional overlay (better UX) */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-base-100/60 backdrop-blur-sm">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </div>

      {/* Footer */}
      {footer && (
        <div className="sticky bottom-0 bg-base-100 border-t p-3 flex justify-center shadow-md">
          {footer}
        </div>
      )}
    </div>
  );
};
