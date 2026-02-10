import s from './LkRightSideMenuItem.module.scss';
import RightPanelContent from "@/pages/Lk/LkMenus/LkRightSideMenuItem/RightPanelContent/RightPanelContent.jsx";

const LkRightSideMenuItem = ({
                               item,
                               setRightPanelOpen,
                               rightPanelOpen,
                               currentRightPanelItem,
                               setCurrentRightPanelItem
}) => {

  const handleClick = () => {
    //setRightPanelOpen(prev => !prev)

    if (!currentRightPanelItem) {
      setRightPanelOpen(true)
      setCurrentRightPanelItem(item)
    }

    if (currentRightPanelItem) {

      if (currentRightPanelItem.label === item.label) {
        setRightPanelOpen(false)
        setCurrentRightPanelItem(null)
      }

      if (currentRightPanelItem.label !== item.label) {
        setCurrentRightPanelItem(item)
      }
    }
  }

  const collapse = () => {
    setRightPanelOpen(false)
    setCurrentRightPanelItem(null)
  }

  return (
    <>
      <li
        key={item.name}
        className={`${s.rightBarItem} ${ currentRightPanelItem && (currentRightPanelItem.label === item.label) ? s.rightBarItemActive : ""}`}
        onClick={handleClick}>
        {item.label}
      </li>
      {
        rightPanelOpen && <RightPanelContent currentRightPanelItem={currentRightPanelItem} collapse={collapse} />
      }
    </>
  );
};

export default LkRightSideMenuItem;