import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitles/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateItem = () => {
  const { name, category, recipe, price, _id } = useLoaderData();
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    // console.log(data);
    // image upload to imgbb and then get and url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log(res.data);
    if (res.data.success) {
      // now send the menu item to the server with the image url
      const menuItem = {
        name: data.name,
        recipe: data.recipe,
        image: res.data.data.display_url,
        category: data.category,
        price: parseFloat(data.price),
      };
      // now
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
    //   console.log(menuRes.data);
      if (menuRes.data.modifiedCount > 0) {
        reset();
        // show success popup
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is updated to the menu.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    // console.log("with image url", res.data);
  };
  return (
    <div>
      <SectionTitle
        heading={"Update an Item"}
        subHeading={"Refresh "}
      ></SectionTitle>
      <div>
        {/* main add items section */}
        <div className="my-5 bg-[#F3F3F3] p-12">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Recipe */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Recipe Name*</legend>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  required
                  defaultValue={name}
                  className="input  w-full mt-4"
                  placeholder="Recipe name"
                />
              </fieldset>
            </div>
            {/* Category and Price */}
            <div className="grid grid-cols-2 items-center gap-6 mt-5">
              <div>
                <label className="">Category*</label>
                <select
                  {...register("category", { required: true })}
                  className="select w-full mt-4"
                  defaultValue={category}
                >
                  <option disabled value={"default"}>
                    Select a Category
                  </option>
                  <option value="salad">Salad</option>
                  <option value="pizza">Pizza</option>
                  <option value="soups">Soups</option>
                  <option value="desserts">Desserts</option>
                  <option value="drinks">Drinks</option>
                </select>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Price*</legend>
                  <input
                    {...register("price", { required: true })}
                    type="number"
                    defaultValue={price}
                    className="input w-full mt-4 no-spinner"
                    placeholder="Price"
                  />
                </fieldset>
              </div>
            </div>
            <div className="mt-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Recipe Details*</legend>
                <textarea
                  {...register("recipe", { required: true })}
                  className="textarea w-full mt-4"
                  placeholder="Recipe Details"
                  defaultValue={recipe}
                ></textarea>
              </fieldset>
            </div>
            <div className="mt-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Recipe Photo</legend>
                <input
                  {...register("image", { required: true })}
                  type="file"
                  className="file-input mt-4 "
                />
                <label className="fieldset-label">Max size 2MB</label>
              </fieldset>
            </div>
            {/* <input type="submit" className="" value={"Add Item"} /> */}
            <div>
              <button className="mt-4 btn bg-gradient-to-r text-center rounded-none from-[#835D23]  to-[#B58130] text-lg text-white">
                Update Recipe details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
