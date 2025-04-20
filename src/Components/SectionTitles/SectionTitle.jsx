const SectionTitle = ({ heading, subHeading, textColor, backgroundColorX }) => {
  return (
    <div className={`text-center mx-auto md:w-5/12 bg-[${backgroundColorX}] w-full`}>
      <p className="font-inter text-[#D99904] mb-2">--- {subHeading} ---</p>
      <h3
        className={` font-inter text-${textColor} text-3xl uppercase border-y-2 border-[#E8E8E8] py-4`}
      >
        {heading}
      </h3>
    </div>
  );
};

export default SectionTitle;
