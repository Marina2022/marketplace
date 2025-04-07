import s from './LkShopPage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getTopShopTab, setTopShopTab} from "@/store/lkShopSlice.js";
import LkProducts from "@/components/lk-InnerPages/LkShopPage/Products/LkProducts.jsx";

const LkShopPage = () => {

  const topShopTab = useSelector(getTopShopTab)
  const dispatch = useDispatch()

  return (

    <div className={s.lkShopWrapper}>
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
        <div onClick={() => dispatch(setTopShopTab(4))} className={topShopTab === 4 ? s.activeTopTab : s.topTab}>Профиль
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

  );
};

export default LkShopPage;


// const [productVariantId, setProductVariantId] = useState('0dc76b67-165c-4491-8637-11ab5ae2a80c')

{/*<p>*/
}
{/*  LkShopPage*/
}
{/*</p>*/
}
{/*<br/>*/
}
{/*<Button onClick={()=>navigate('/lk/edit-product/new')} >Создать&nbsp;товар</Button>*/
}

{/*<br/>*/
}
{/*<br/>*/
}

{/********************************************************************************************/
}

{/*<p>productVariantId:</p>      */
}
{/*<input className={s.input} type="text" placeholder="productVariantId" value={productVariantId} onChange={(e)=>setProductVariantId(e.target.value)} />*/
}
{/*<Button onClick={()=>navigate(`/lk/edit-product/${productVariantId}`)} >Редактировать&nbsp;товар</Button>*/
}