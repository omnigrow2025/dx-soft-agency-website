import { useState } from "react";
import { IMAGE_SRC } from "../../../../../../common/constants/constants";
import { useWebsiteData } from "../../../../hooks/useWebsiteData";

export const Trusted = () => {
  const { data } = useWebsiteData();
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="bg-base-100 py-10">
      <h2 className="text-center text-xl font-bold mb-6">
        Ընկերություններ, որոնք վստահում են մեզ
      </h2>

      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-8 px-4">
          {data?.partners?.map((company) => {
            const isActive = active === company.name;

            return (
              <a
                key={company.name}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setActive(isActive ? null : company.name);
                }}
                className="shrink-0 group"
              >
                <img
                  src={`${IMAGE_SRC}${company.logoUrl}`}
                  alt={company.name}
                  className={`w-24 object-contain transition duration-300 cursor-pointer
                    grayscale opacity-60
                    group-hover:grayscale-0 group-hover:opacity-100
                    ${isActive ? "grayscale-0 opacity-100" : ""}
                  `}
                />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
