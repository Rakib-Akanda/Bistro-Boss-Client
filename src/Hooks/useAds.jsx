import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAds = () => {
  const [navClickCount, setNavClickCount] = useState(0);
  const navigate = useNavigate();
  // chile ai handleNaveClick ke hook ba normally onno ekta file kore export korte pari;
  const handleAdsClick = (e, path) => {
    e.preventDefault(); // সবসময় prevent করবো
    if (navClickCount >= 2) {
      setNavClickCount(0);
    }
    if (navClickCount <= 1) {
      window.open(
        "https://www.profitableratecpm.com/eg4ptcepz?key=853c406d42ed5484977f464884b76184",
        "_blank"
      );
      setNavClickCount((prev) => prev + 1);
      console.log(navClickCount);
    } else {
      if (navClickCount > 2) {
        setNavClickCount(0);
      }
      navigate(path);
    }
  };
  return [handleAdsClick];
};

export default useAds;
