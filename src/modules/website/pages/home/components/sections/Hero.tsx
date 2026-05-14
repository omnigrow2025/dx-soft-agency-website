import BeautifulGirl from "../../../../../../assets/beautiful-girl.svg";
import { Typography } from "../../../../../../common/components/Typography";

export const Hero = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 px-5 lg:px-20 py-16">
      {/* Text */}
      <div className="flex flex-col gap-6 justify-center">
        <Typography
          text="Կրթություն, որը փոխում է ապագան"
          className="text-3xl md:text-6xl uppercase  leading-snug"
        />

        <p className="text-gray-700 text-lg md:text-xl">
          Ուսուցում, որ միտված է իրական աշխատանքային հմտությունների զարգացմանը՝
          պատրաստելով ձեզ մրցունակ և պատրաստ աշխատաշուկայի պահանջներին
        </p>

        <div>
          <a
            href="#courses"
            className="inline-block px-10 md:px-16 py-4 bg-secondary text-white font-semibold rounded-full shadow-lg hover:bg-secondary/90 transition duration-300"
          >
            Դիտել դասընթացները
          </a>
        </div>
      </div>

      {/* Image */}
      <div className="hidden sm:flex justify-center items-center w-full">
        <img
          src={BeautifulGirl}
          alt="Beautiful Girl"
          className="w-full  object-fill"
        />
      </div>
    </div>
  );
};
