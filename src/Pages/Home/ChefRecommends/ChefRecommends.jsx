import SectionTitle from "../../../Components/SectionTitles/SectionTitle";
import SaladImg from "../../../assets/menu/salad-bg.jpg";

const ChefRecommends = () => {
  return (
    <div>
      <div className="pb-8">
        <SectionTitle
          subHeading={"Should Try"}
          heading={"Chef Recommends"}
        ></SectionTitle>
      </div>
      {/* Chef Card */}
      <div
        className="flex justify-between
      "
      >
        {/* card 1 */}
        <div className="bg-[#F3F3F3] w-[410px] shadow-sm">
          <figure>
            <img src={SaladImg} alt="Salad Image" />
          </figure>
          <div className="text-center p-7 space-y-5">
            <h2 className="font-semibold text-2xl text-black">Caesar Salad</h2>
            <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
            <div>
              <button className="text-[#BB8506] font-medium py-3 px-7 bg-[#E8E8E8] border-b-4 border-[#BB8506] rounded-lg hover:text-white hover:bg-[#1F2937] hover:border-[#1F2937] ">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
        {/* card 2 */}
        <div className="bg-[#F3F3F3] w-[410px] shadow-sm">
          <figure>
            <img src={SaladImg} alt="Salad Image" />
          </figure>
          <div className="text-center p-7 space-y-5">
            <h2 className="font-semibold text-2xl text-black">Caesar Salad</h2>
            <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
            <div>
              <button className="text-[#BB8506] font-medium py-3 px-7 bg-[#E8E8E8] border-b-4 border-[#BB8506] rounded-lg hover:text-white hover:bg-[#1F2937] hover:border-[#1F2937]">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
        {/* card 3 */}
        <div className="bg-[#F3F3F3] w-[410px] shadow-sm">
          <figure>
            <img src={SaladImg} alt="Salad Image" />
          </figure>
          <div className="text-center p-7 space-y-5">
            <h2 className="font-semibold text-2xl text-black">Caesar Salad</h2>
            <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
            <div>
              <button className="text-[#BB8506] font-medium py-3 px-7 bg-[#E8E8E8] border-b-4 border-[#BB8506] rounded-lg hover:text-white hover:bg-[#1F2937] hover:border-[#1F2937]">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefRecommends;
