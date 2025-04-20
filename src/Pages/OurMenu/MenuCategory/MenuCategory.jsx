import { Link } from "react-router-dom";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title }) => {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-10 mt-16">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <Link to={`/Order/${title}`} className="">
        <div className="text-center mt-8">
          <button className="text-black font-medium py-3 px-7  border-b-4 border-black rounded-lg hover:bg-[#1F2937] hover:border-[#1F2937] hover:text-white">
            ORDER YOUR FAVORITE SOUP
          </button>
        </div>
      </Link>
    </div>
  );
};

export default MenuCategory;
