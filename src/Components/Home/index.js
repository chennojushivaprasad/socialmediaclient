import React, { useEffect, useState } from "react";
import "./index.css";
// import SideBar from "../Sidebar";
// import { categoryMenus } from "../../constansts";
import fetchFromApi from "../../fetchFromApi.js";
import { PostCard } from "../PostCard";
import SideBarColumn from "../SideBarColumn";

const Home = () => {
  const [postsData, setPostsData] = useState([]);

  // const Navigate = useNavigate();

  useEffect(() => {
    fetchFromApi("/api/post/", "GET")
      .then((response) => (response.ok ? response.json() : []))
      .then((data) => setPostsData(data));
  }, []);

  // if (activeMenuId) {
  //   const category = categoryMenus.filter(
  //     (category) => category.menuId === activeMenuId
  //   )[0];

  //   if (category.path !== null) {
  //     return <Navigate to={category.path} replace={true} />;
  //   }
  // }

  return (
    <>
      {/* <Header/> */}
      {/* { <p className="upload-status-file">{uploadPercent}%</p>} */}
      <div className="home">
        {/* <SideBar /> */}

        {/* <div className="main-container"> */}
        <div className="posts-container">
          {/* <div className="posts-status">status</div> */}
          <div className="posts-display-container">
            <ul className="posts">
              {postsData?.posts?.map((post) => {
                return <PostCard post={post} />;
              })}
            </ul>
          </div>
        </div>
        <SideBarColumn />
      </div>

      {/* </div> */}

      {/* <BottomNavigationBar/> */}
    </>
  );
};

export default Home;
