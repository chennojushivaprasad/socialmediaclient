import { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./Context";
import Reels from "./Components/Reels";
import Cookies from "js-cookie";
import fetchFromApi from "./fetchFromApi";
import { UserDetailsPage } from "./Components/UserPage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "./firebase/firebase";
import Message from "./Components/Message";
import { Chat } from "./Components/Chat";
import Layout from "./Components/Layout";
import Socket from "./Components/Socket";
import VideoCall from "./Components/VideoCall";

function App() {
  const [activeMenuId, setActiveMenuId] = useState("HOME");
  const [isValidUser, setIsValidUser] = useState(false);
  const [activeComment, setActiveComment] = useState(false);
  const [activePost, setActivePost] = useState("");
  const [accountUser, setAccountUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [uploadPercent, setUploadedPercent] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isActivePostModal, setActivePostModal] = useState(false);
  const [isVideoCallActive, setVideoCallActiveStatus] = useState(false);

  const [activeModalId, setActiveModalId] = useState(null);

  const [isActiveshareModal, setShareModalActiveStatus] = useState(false);
  const [activeSharePostDetails, setSharePostDetails] = useState(null);

  const [volume, setVolume] = useState(0);
  const [isMuted, setMuteState] = useState(true);

  const userId = Cookies.get("userId");

  const updateCommentComponent = (value, post = null) => {
    setActiveComment(value);
    if (post !== null) {
      setActivePost(post);
    }
  };

  const updateLike = async (post, callback) => {
    const { _id: postId, isLiked } = post;

    if (isLiked) {
      callback((prev) => ({
        ...prev,
        isLiked: false,
        meta: { ...prev.meta, likes: prev.meta.likes - 1 },
      }));
    } else {
      callback((prev) => {
        return {
          ...prev,
          isLiked: true,
          meta: { ...prev.meta, likes: prev.meta.likes + 1 },
        };
      });
    }

    const userId = Cookies.get("userId");

    fetchFromApi(`/api/post/updatelike`, "POST", { postId, userId }).then(
      (respone) => console.log()
    );
  };

  const onClickMenuButton = (menuId) => {
    if (!(menuId === "CREATE" || menuId === "SEARCH")) {
      setActiveMenuId(menuId);
      setActiveModalId(null);
    } else {
      setActiveModalId(menuId);
    }
  };

  useEffect(() => {
    if (userId) {
      const getUserData = async () => {
        const response = await fetchFromApi(`/api/user/${userId}`, "GET");
        if (response.ok) {
          const data = await response.json();
          setAccountUser(data?.user);

          setIsValidUser(true);
        } else {
          setIsValidUser(false);
          setAccountUser([]);
        }
      };
      getUserData();
    } else {
      setAccountUser([]);
      setIsValidUser(false);
    }
  }, [userId]);

  const handleUpload = (media, next) => {
    const file = media[0];
    const uploadType = media[1];
    const path = media[1];

    setUploadStatus({ type: "Pending", uploadType });
    if (!file) return;

    const storageRef = ref(storage, `/${path}/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    const uploadDone = () => {
      setUploadedPercent(0);
      setUploadStatus(null);
    };

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadedPercent(progress);
      },
      (error) => {
        alert(error);
        setTimeout(() => {
          uploadDone();
        }, 800);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const response = await next(downloadURL, uploadType);

          if (response.ok) {
            setUploadStatus({ ok: true, type: "Success", uploadType });

            setTimeout(() => {
              uploadDone();
            }, 3000);
          } else {
            setUploadStatus({ ok: false, type: "Failed", uploadType });
            setTimeout(() => {
              uploadDone();
            }, 3000);
          }
        });
      }
    );
  };

  const values = {
    activeMenuId,
    setActiveMenuId,
    activeComment,
    updateCommentComponent,
    activePost,
    setActivePost,
    accountUser,
    searchResults,
    setSearchResults,
    uploadPercent,
    uploadStatus,
    handleUpload,
    isValidUser,
    setIsValidUser,
    isVideoCallActive,
    setVideoCallActiveStatus,
    activeModalId,
    setActiveModalId,
    isActivePostModal,
    setActivePostModal,
    setAccountUser,
    uploadStatus,
    updateLike,
    onClickMenuButton,
    isMuted,
    setMuteState,
    volume,
    setVolume,
    isActiveshareModal,
    setShareModalActiveStatus,
    activeSharePostDetails,
    setSharePostDetails,
  };
  return (
    <AppContext.Provider value={values}>
      <Socket>
        <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Registration />} />
            <Route
              exact
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              exact
              path="/reels"
              element={
                <Layout>
                  <Reels />
                </Layout>
              }
            />
            <Route
              exact
              path="/user/:id"
              element={
                <Layout>
                  <UserDetailsPage />
                </Layout>
              }
            />
            <Route
              exact
              path="/message"
              element={
                <Layout>
                  <Message />
                </Layout>
              }
            />
            <Route exact path="/videocall" element={<VideoCall />} />
            <Route
              exact
              path="/message/:recipientId"
              element={
                <Layout>
                  <Chat />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </Socket>
    </AppContext.Provider>
  );
}

export default App;
