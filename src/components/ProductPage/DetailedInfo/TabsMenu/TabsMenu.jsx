import s from './TabsMenu.module.scss';
import {useEffect, useState} from "react";
import Overview from "@/components/ProductPage/DetailedInfo/tabsContent/Overview/Overview.jsx";
import Characteristics from "@/components/ProductPage/DetailedInfo/tabsContent/Characteristics/Characteristics.jsx";
import Reviews from "@/components/ProductPage/DetailedInfo/tabsContent/Reviews/Reviews.jsx";
import Questions from "@/components/ProductPage/DetailedInfo/tabsContent/Questions/Questions.jsx";
import About from "@/components/ProductPage/DetailedInfo/tabsContent/About/About.jsx";


const TabsMenu = ({product, currentTab, setCurrentTab}) => {

  let tabs
  if (product.productVendor.isCompanyAboutShown) tabs = ['Обзор', 'Характеристики', 'Отзывы', 'Вопросы', 'О компании']
  else tabs = ['Обзор', 'Характеристики', 'Отзывы', 'Вопросы']

  return (
    <div>
      <ul className={s.tabs}>
        {
          tabs.map((tab, i) => <li
            key={i}
            className={tabs[currentTab] === tab ? s.tabsItemActive : s.tabsItem}
            onClick={() => {
              setCurrentTab(i)
            }}
          >
            {tab}
          </li>)
        }
      </ul>

      {currentTab === 0 && < Overview product={product}/>}
      {currentTab === 1 && < Characteristics product={product}/>}
      {currentTab === 2 && < Reviews product={product} />}
      {currentTab === 3 && < Questions product={product} />}
      {currentTab === 4 && < About product={product}/>}

    </div>
  );
};

export default TabsMenu;