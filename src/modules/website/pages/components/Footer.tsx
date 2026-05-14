import BgImage from "../../../../assets/footerBg.png";
import { Typography } from "../../../../common/components/Typography";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-cover bg-center relative pb-15"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 " />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-12 flex flex-col min-h-50 ">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  ">
          <div className="mb-14">
            <h3 className="text-lg md:text-xl font-semibold  tracking-wide">
              Կոնտակտային Ինֆորմացիա
            </h3>

            <Typography
              className="text-2xl md:text-4xl font-bold mt-3"
              text="Կրթություն, որը փոխում է ապագան"
            />

            {/* LOCATION */}
            <div className="mt-6 flex items-start gap-2 text-sm">
              <div>
                <p className="font-semibold">Nova Plaza</p>
                <p>Sayat Nova 19/1, Yerevan, Armenia</p>
              </div>
            </div>
          </div>

          {/* Contact Grid */}
          {/* Email */}
          <div>
            <h5 className=" font-bold text-lg mb-3">Էլ. հասցե</h5>

            <a
              href="mailto:support@omnidx.academy"
              className=" transition font-medium"
            >
              support@omnidx.academy
            </a>

            <p className=" text-sm mt-5 leading-relaxed">
              Աշխատանքային ժամեր՝{" "}
              <span className="font-semibold">Աջակցություն 24/7</span>
            </p>
          </div>

          {/* Phone */}
          <div>
            <h5 className="font-bold text-lg mb-3">Հեռախոս</h5>

            <div className="space-y-2">
              <a href="tel:094963903" className="block  transition">
                (094) 96 39 03
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t px-10 border-white/10 mt-14 pt-6 flex flex-col md:flex-row justify-between items-center text-xs gap-3">
        <p>© Բոլոր իրավունքները պաշտպանված են</p>
        <p className="text-right">{year} «ՕՄՆԻ ԴԻ ԷՔՍ Ակադեմիա» ՍՊԸ</p>
      </div>
    </footer>
  );
};
