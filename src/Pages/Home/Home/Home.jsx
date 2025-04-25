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
// import { useEffect } from "react";

const Home = () => {
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.async = true;
  //   script.setAttribute("data-cfasync", "false");
  //   script.src =
  //     "https://www.pl26472797.profitableratecpm.com/6fb47dc1632de1f812b2dd22771a69dc/invoke.js";

  //   const container = document.getElementById(
  //     "container-6fb47dc1632de1f812b2dd22771a69dc"
  //   );
  //   if (container && !container.hasChildNodes()) {
  //     container.appendChild(script);
  //   }
  // }, []);

  // // Banner 300x250 Adsterra
  // useEffect(() => {
  //   const optionsScript = document.createElement("script");
  //   optionsScript.type = "text/javascript";
  //   optionsScript.innerHTML = `
  //     atOptions = {
  //       'key' : '370c28c522607e897ddbc9d501138e75',
  //       'format' : 'iframe',
  //       'height' : 250,
  //       'width' : 300,
  //       'params' : {}
  //     };
  //   `;

  //   const adScript = document.createElement("script");
  //   adScript.src =
  //     "https://www.highperformanceformat.com/370c28c522607e897ddbc9d501138e75/invoke.js";
  //   adScript.async = true;
  //   adScript.setAttribute("data-cfasync", "false");

  //   const container = document.getElementById(
  //     "container-370c28c522607e897ddbc9d501138e75"
  //   );
  //   if (container && !container.hasChildNodes()) {
  //     container.appendChild(optionsScript);
  //     container.appendChild(adScript);
  //   }
  // }, []);
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
          <div>
            {/* Adsterra Banner */}
            <div className="my-8">
              <h2>Ads section Poster</h2>
              <div id="container-370c28c522607e897ddbc9d501138e75"></div>
            </div>
          </div>
          <Poster></Poster>
          <PopularMenu></PopularMenu>
          <CallUs></CallUs>
          <ChefRecommends></ChefRecommends>
          <Featured></Featured>
          {/* <div>
            Adsterra Native Banner  
            <div className="my-8">
              <h2>Ads section Testimonials</h2>
              <div id="container-6fb47dc1632de1f812b2dd22771a69dc"></div>
            </div>
          </div>*/}
          <Testimonials></Testimonials>
        </div>
      </div>
    </div>
  );
};

export default Home;
