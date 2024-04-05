import useMobileScreen from "@/hooks/useMobileScreen.js";
import BigScreenSort from "@/components/CategoryBlock/Sort/BigScreenSort/BigScreenSort.jsx";
import MobileSort from "@/components/CategoryBlock/Sort/MobileSort/MobileSort.jsx";

const Sort = () => {
    
  const isMobileScreen = useMobileScreen()
  
  return (
      <>
        {
            !isMobileScreen && <BigScreenSort />
        }

        {
            isMobileScreen && <MobileSort />
        }
        
        
      </>
  );
};

export default Sort;