import { Parallax } from "react-parallax";

const Cover = ({ image, title, details }) => {
  return (
    <Parallax
      blur={{ min: -50, max: 50 }}
      bgImage={image}
      bgImageAlt={title}
      strength={-200}
      bgImageStyle={{ objectFit: "cover" }}
    >
      <div className="hero   md:h-[600px]">
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="">
            <h1 className="mb-5 text-[80px] font-bold font-cinzel uppercase">
              {title}
            </h1>
            <p className="mb-5 font-cinzel text-2xl">{details}</p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Cover;
