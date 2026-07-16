import s from './Tabs.module.scss';
import {useSelector} from "react-redux";
import {getTabs} from "@/store/tabsSlice.js";
import Tab from "@/components/layout/Tabs/Tab/Tab.jsx";

const Tabs = () => {

  const tabs = useSelector(getTabs);

  console.log("tabs = ", tabs)
  return (
    <div className={s.tabsWrapper}>
      {
        tabs.map((tab, i) => <Tab key={i} tab={tab} nextTab={tabs[i + 1]} />)
      }
    </div>
  );
};

export default Tabs;