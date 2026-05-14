import type { FC } from "react";
import GirlImage from "../../../../assets/beautiful-girl.svg";
import { useWebsiteData } from "../../hooks/useWebsiteData";

export const FaqSection: FC = () => {
  const { data } = useWebsiteData();
  return (
    <div
      id="Q&A"
      className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white "
    >
      <div className="flex justify-center lg:justify-start ">
        <img
          src={GirlImage}
          alt="Support Representative Illustration"
          className="w-full  h-auto object-fill"
        />
      </div>

      {/* Right Column: FAQ Accordion */}
      <div className="order-1 lg:order-2">
        <h2 className="text-4xl font-black text-[#1F3530] mb-4">
          Հաճախ տրվող հարցեր
        </h2>
        <p className="text-gray-500 mb-8 max-w-lg leading-relaxed">
          Առաջարկում ենք հաճախ տրվող հարցերի պատասխաններ, որոնք կօգնեն ձեր
          ուսումնական ճանապարհին:
        </p>

        <div className="space-y-3">
          {data?.faq.map((faq, index) => (
            <div
              key={index}
              className="collapse   bg-[#F8F9FA] rounded-xl transition-all border border-transparent hover:border-gray-200"
            >
              <input type="checkbox" className="peer" />

              <div className="collapse-title flex items-center gap-4 py-4 pr-12">
                <div className="flex-none   w-8 h-8 rounded-full bg-[#2D433D] text-white flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                <span className="text-[#1F3530] font-bold text-sm md:text-base leading-tight">
                  {faq.question}
                </span>
              </div>

              <div className="collapse-content">
                <p className="text-gray-600 text-sm pl-12 pb-4 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
