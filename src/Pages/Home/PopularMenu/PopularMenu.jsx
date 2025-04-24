import SectionTitle from "../../../Components/SectionTitles/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../Hooks/useMenu";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");
  // const [menu, setMenu] = useState([]);
  // useEffect(() => {
  //   fetch("menu.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const popularItems = data.filter((item) => item.category === "popular");
  //       setMenu(popularItems);
  //     });
  // }, []);

  return (
    <section>
      <div className="pb-8">
        <SectionTitle
          subHeading={"Check it out"}
          heading={"FROM OUR MENU"}
        ></SectionTitle>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        {popular.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="text-center mt-8">
        <a
          href="https://www.profitableratecpm.com/eg4ptcepz?key=853c406d42ed5484977f464884b76184"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#BB8506] font-medium py-3 px-7  border-b-4 border-[#BB8506] rounded-lg hover:bg-[#1F2937] hover:border-[#1F2937] hover:text-white"
        >
          View Full Menu
        </a>
      </div>
    </section>
  );
};

export default PopularMenu;
