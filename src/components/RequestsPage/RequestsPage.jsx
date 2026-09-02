import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {buildCategoryTree} from "@/utils/requests.js";
import CategoryNode from "@/components/RequestsPage/CategoryNode/CategoryNode.jsx";
import {getRequestsTree, getRequestsTreeLoading} from "@/store/requestsSlice.js";
import {useSelector} from "react-redux";
import s from './RequestsPage.module.scss'
import MobileHeaderLk from "@/components/layout/Header/MobileHeader/MobileHeaderLK/MobileHeaderLK.jsx";

const RequestsPage = () => {

  const tree = useSelector(getRequestsTree)
  const loading = useSelector(getRequestsTreeLoading)

  if (loading) {
    return <Spinner/>
  }

  if (!tree) return null

  return (
    <div className={`${s.requestPage} scroll`}>

      <MobileHeaderLk/>

      <div className={s.page}>
        <ul className={s.list}>
          {buildCategoryTree(tree).map(rootNode => (
            <CategoryNode key={rootNode.id} node={rootNode}/>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RequestsPage;