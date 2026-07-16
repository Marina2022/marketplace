import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTabs } from "@/store/tabsSlice.js";
import { tabLabels } from "@/components/layout/Tabs/tabUtils.js";

const TabsInitializer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTabs = JSON.parse(localStorage.getItem("tabs") || "[]");

    const currentPath = location.pathname;

    // открыли корень
    if (currentPath === "/" && savedTabs.length > 0) {
      const lastTab = savedTabs[savedTabs.length - 1];

      navigate(lastTab, { replace: true });
      return;
    }

    // проверяем, является ли URL вкладкой
    const urlFound = tabLabels.find(item => item.url === currentPath);

    if (urlFound) {
      const tabs = savedTabs.includes(currentPath)
        ? savedTabs
        : [...savedTabs, currentPath];

      dispatch(setTabs(tabs));
      localStorage.setItem("tabs", JSON.stringify(tabs));
    }
  }, []);

  return null;
};

export default TabsInitializer;