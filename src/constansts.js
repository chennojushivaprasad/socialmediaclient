// import { GrHomeRounded } from "react-icons/gr";
import { BiMessageSquareAdd, BiSolidMessageSquareAdd, BiSolidUserCircle, BiUserCircle } from "react-icons/bi";
import {  MdHome, MdOutlineHome } from "react-icons/md";
import {
  BsCameraReels,
  BsCameraReelsFill,
} from "react-icons/bs";
import { RiMessageFill, RiMessageLine, RiNotification2Line, RiNotification4Fill, RiNotification4Line, RiSearch2Fill, RiSearch2Line } from "react-icons/ri";
// import { LiaHomeSolid } from "react-icons/li";
import { CgProfile } from "react-icons/cg";
import Cookies from "js-cookie";


const userId = Cookies.get("userId")
export const categoryMenus = [
  {
    icon: <MdOutlineHome className="side-menu-icon" />,
    activeIcon: <MdHome className="side-menu-icon" />,
    name: "Home",
    path: "/",
    menuId: "HOME",
  },
  {
    icon: <RiSearch2Line className="side-menu-icon" />,
    activeIcon: <RiSearch2Fill className="side-menu-icon" />,
    name: "Search",
    path: null,
    menuId: "SEARCH",
  },
  {
    icon: <BsCameraReels className="side-menu-icon" />,
    activeIcon: <BsCameraReelsFill className="side-menu-icon" />,
    name: "Reels",
    path: "/reels",
    menuId: "REELS",
  },
  // {
  //   icon: <MdOutlineExplore className="side-menu-icon" />,
  //   activeIcon: <MdExplore className="side-menu-icon" />,
  //   name: "Explore",
  //   path: "/explore",
  //   menuId: "EXPLORE",
  // },
  {
    icon: <RiMessageLine className="side-menu-icon" />,
    activeIcon: <RiMessageFill className="side-menu-icon" />,
    name: "Message",
    path: "/message",
    menuId: "MESSAGE",
  },
  {
    icon: <BiMessageSquareAdd className="side-menu-icon" />,
    activeIcon: <BiSolidMessageSquareAdd className="side-menu-icon" />,
    name: "Create",
    path: null,
    menuId: "CREATE",
  },
  {
    icon: <RiNotification4Line className="side-menu-icon" />,
    activeIcon: <RiNotification4Fill className="side-menu-icon" />,
    name: "Notification",
    path: null,
    menuId: "NOTIFICATION",
  },
  {
    icon: <BiUserCircle className="side-menu-icon" />,
    activeIcon:<BiSolidUserCircle className="side-menu-icon"/>,
    name: "Profile",
    path: `/user/${userId}`,
    menuId: "PROFILE",
  },
  // Add more objects as needed
];

export const bottomNavigationMenus = [
  {
    icon: (
      <MdOutlineHome className={`bottom-navbar-menu-icon active-menu-icon`} />
    ),
    activeIcon: <MdHome className="bottom-navbar-menu-icon active-menu-icon"/>,
    name: "Home",
    path: null,
    menuId: "HOME",
  },
  {
    icon: <RiSearch2Line className={`bottom-navbar-menu-icon `} />,
    activeIcon:<RiSearch2Fill className="bottom-navbar-menu-icon  active-menu-icon"/>,name: "Search",
    path: null,
    menuId: "SEARCH",
  },

  {
    icon: (
      <BiMessageSquareAdd
        className={`bottom-navbar-menu-icon `}
      />
    ),
    activeIcon: (
      <BiSolidMessageSquareAdd
        className={`bottom-navbar-menu-icon  active-menu-icon`}
      />
    ),
    name: "Create",
    path: null,
    menuId: "CREATE",
  },

  {
    icon: (
      <BsCameraReels className={`bottom-navbar-menu-icon  `} />
    ),
    activeIcon: <BsCameraReelsFill className="bottom-navbar-menu active-menu-icon"  />,
    name: "Reels",
    path: "/reels",
    menuId: "REELS",
  },

  {
    icon: (
      <CgProfile className={`bottom-navbar-menu-icon`} />
    ),
    activeIcon: (
      <CgProfile className={`bottom-navbar-menu-icon   active-menu-icon`} />
    ),
    name: "Profile",
    path: `/user/${userId}`,
    menuId: "PROFILE",
  },
  // Add more objects as needed
];

