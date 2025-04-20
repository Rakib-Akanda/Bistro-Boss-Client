// import NavBar from "../../Shared/NavBar/NavBar";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Poster from "../Poster/Poster";
import PopularMenu from "../PopularMenu/PopularMenu";
import CallUs from "../CallUs/CallUs";
import ChefRecommends from "../ChefRecommends/ChefRecommends";
import Featured from "../Featured/Featured";
import Testimonials from "../Testimonials/Testimonials";
import { Helmet } from "react-helmet-async";

const Home = () => {
  
  return (
    <div>
      <Helmet>
        <title> Bistro | Home</title>
      </Helmet>
      {/* Banner section */}
      <Banner></Banner>
      {/* Main home section */}
      <div className="max-w-screen-xl mx-auto">
        <div className="my-16">
          <Category></Category>
          <Poster></Poster>
          <PopularMenu></PopularMenu>
          <CallUs></CallUs>
          <ChefRecommends></ChefRecommends>
          <Featured></Featured>
          <Testimonials></Testimonials>
        </div>
      </div>
    </div>
  );
};

export default Home;
