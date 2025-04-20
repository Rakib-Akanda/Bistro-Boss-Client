import chefService from "../../../assets/home/chef-service.jpg";
const Poster = () => {
  return (
    <div
      className="my-24 h-[500px] w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${chefService})` }}
    >
      <div className="bg-white  px-20 py-16 rounded-lg text-center">
        <h2 className="text-black text-4xl font-cinzel ">Bistro Boss</h2>
        <p className="font-inter text-lg">
          Welcome to Bistro Boss, where flavors come alive. Savor delicious
          Salads, hearty Soups, and mouthwatering Pizza made with fresh
          <br />
          ingredients. Experience exceptional service, cozy ambiance, and
          unforgettable tastes. Your satisfaction <br /> is our priority. Join
          us for an amazing dining journey today!
        </p>
      </div>
    </div>
  );
};

export default Poster;
