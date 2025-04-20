import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../Components/SectionTitles/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const OurMenu = () => {
  const [menu] = useMenu();
  const desserts = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const offered = menu.filter((item) => item.category === "offered");

  return (
    <div>
      <Helmet>
        <title> Bistro Boss | Menu</title>
      </Helmet>
      {/* main section */}
      <div>
        {/* offered section */}
        <div>
          <div>
            <Cover
              className="mt-16"
              image={menuImg}
              title={"our menu"}
              details={"Would you like to try a dish?"}
            ></Cover>
          </div>
          <div className="max-w-screen-xl mx-auto mt-16">
            {/* category */}
            <SectionTitle
              subHeading="Don't miss"
              heading="today's offer"
            ></SectionTitle>
            {/* Offered menu items */}
            <MenuCategory items={offered} title={"Drinks"}></MenuCategory>
          </div>
        </div>
        {/* desserts menu items */}
        <div className="my-16">
          <Cover
            image={dessertImg}
            title={"Desserts"}
            details={"Would you like to try a dish?"}
          ></Cover>
          <div className="max-w-screen-xl mx-auto">
            <MenuCategory items={desserts} title={"Desserts"}></MenuCategory>
          </div>
        </div>
        {/* Pizza menu items */}
        <div className="my-16">
          <Cover
            image={pizzaImg}
            title={"Pizza"}
            details={"Would you like to try a dish?"}
          ></Cover>
          <div className="max-w-screen-xl mx-auto">
            <MenuCategory items={pizza} title={"Pizza"}></MenuCategory>
          </div>
        </div>
        {/* Salad menu items */}
        <div className="my-16">
          <Cover
            image={saladImg}
            title={"Salads"}
            details={"Would you like to try a dish?"}
          ></Cover>
          <div className="max-w-screen-xl mx-auto">
            <MenuCategory items={salad} title={"Salads"}></MenuCategory>
          </div>
        </div>
        {/* Soup menu items */}
        <div className="my-16">
          <Cover
            image={soupImg}
            title={"Soups"}
            details={"Would you like to try a dish?"}
          ></Cover>
          <div className="max-w-screen-xl mx-auto">
            <MenuCategory items={soup} title={"Soups"}></MenuCategory>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMenu;
