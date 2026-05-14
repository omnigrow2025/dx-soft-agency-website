import { type ReactNode, type FC } from "react";

export interface TabProps {
  label: string;
  title?: string;
  component: ReactNode;
}

export const Tab: FC<TabProps> = ({ component, label, title }: TabProps) => {
  return (
    <>
      <h2 className="text-3xl font-bold mb-4">{title || label}</h2>

      <div className="text-gray-600 leading-relaxed min-h-80 h-full">
        {component}
      </div>
    </>
  );
};
