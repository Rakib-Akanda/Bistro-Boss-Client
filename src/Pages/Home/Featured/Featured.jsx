import SectionTitle from "../../../Components/SectionTitles/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
  return (
    <div className="bg-fixed border-2 featured-item  my-20 ">
      <div className="bg-[#151515b3] py-8 ">
        <SectionTitle
          subHeading={"Check It Out"}
          heading={"Featured Item"}
          textColor={"white"}

          // backgroundColorX={"#151515B3"}
        ></SectionTitle>
      </div>
      <div className="md:flex justify-center items-center  pb-20 pt-12 px-36 bg-[#151515B3]">
        <div>
          <img src={featuredImg} alt="" />
        </div>
        <div className="md:ml-10 space-y-3">
          <p className="text-white text-3xl">March 20, 2025</p>
          <p className="uppercase text-white text-5xl">Where can i get some?</p>
          <p className="text-white font-cinzel text-2xl">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor
            culpa cumque dicta optio. Culpa qui commodi accusamus cupiditate
            unde suscipit cum veritatis. Odio porro necessitatibus autem
            possimus eos sed quae sint soluta eaque iste debitis, inventore illo
            harum cupiditate adipisci!
          </p>
          <button className="text-[#BB8506] font-medium py-3 px-7  border-b-4 border-[#BB8506] rounded-lg hover:bg-[#1F2937] hover:border-[#1F2937] hover:text-white">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
