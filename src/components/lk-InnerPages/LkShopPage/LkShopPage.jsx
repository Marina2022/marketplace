import s from './LkShopPage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getTopShopTab, setTopShopTab} from "@/store/lkShopSlice.js";
import LkProducts from "@/components/lk-InnerPages/LkShopPage/Products/LkProducts.jsx";
import {useOutletContext} from "react-router-dom";

const LkShopPage = () => {

  const topShopTab = useSelector(getTopShopTab)
  const dispatch = useDispatch()
  const {rightPanelOpen} = useOutletContext();

  return (
    // <div className={s.lkShopWrapper}>
    <div >

      <div className={s.leftSideMenu}>
        Магазин
      </div>
      <div className={`${s.contentWrapper} ${rightPanelOpen ? s.contentWrapperRightPanelOpen : ''}`}>
        <div className={s.content}>

          <div className={s.topTabs}>
            <div onClick={() => dispatch(setTopShopTab(1))}
                 className={topShopTab === 1 ? s.activeTopTab : s.topTab}>Товары
            </div>
            <div onClick={() => dispatch(setTopShopTab(2))}
                 className={topShopTab === 2 ? s.activeTopTab : s.topTab}>Услуги
            </div>
            <div onClick={() => dispatch(setTopShopTab(3))}
                 className={topShopTab === 3 ? s.activeTopTab : s.topTab}>Аналитика
            </div>
            <div onClick={() => dispatch(setTopShopTab(4))}
                 className={topShopTab === 4 ? s.activeTopTab : s.topTab}>Профиль
              магазина
            </div>
          </div>
          {
            topShopTab === 1 && <LkProducts/>
          }
          {
            topShopTab === 2 && <div>Услуги</div>
          }
          {
            topShopTab === 3 && <div>Аналитика</div>
          }
          {
            topShopTab === 4 && <div>Профиль магазина</div>
          }
        </div>
      </div>
    </div>
  )
}

export default LkShopPage;

