import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {buildCategoryTree} from "@/utils/requests.js";
import CategoryNode from "@/components/RequestsPage/CategoryNode/CategoryNode.jsx";
import {getRequestsTree, getRequestsTreeLoading} from "@/store/requestsSlice.js";
import {useSelector} from "react-redux";
import s from './RequestsPage.module.scss'

const RequestsPage = () => {

  const tree = useSelector(getRequestsTree)
  const loading = useSelector(getRequestsTreeLoading)
  console.log("tree = ", tree ? buildCategoryTree(tree) : null)
  console.log("loading = ", loading)

  if (loading) {
    return <Spinner />
  }

  return (
    <div className={`${s.requestPage} scroll`}>
      <ul className={s.list}>
        {buildCategoryTree(tree).map(rootNode => (
          <CategoryNode key={rootNode.id} node={rootNode} />
        ))}
      </ul>
    </div>
  )
}

export default RequestsPage;