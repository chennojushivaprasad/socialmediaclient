import React, { useContext } from "react";
import { PostPreviewImage } from "../PostPreviewImage";
import PostUploadDetails from "../PostDetailsUpload";
import { AppContext } from "../../../../Context";
import fetchFromApi from "../../../../fetchFromApi";

const PostSubmit = (props) => {
  const { url, handleUpdateContent, caption, reset, closeModal, selectedFile } =
    props;
  const { handleUpload, accountUser } = useContext(AppContext);

  const imageSizeLimit = 5;
  const videoSizeLimit = 20;

  const validateSizeLimit = (file, limit, callback) => {
    if (file) {
      const fileSizeInBytes = file.size;

      const fileSizeInKB = fileSizeInBytes / 1024;
      const fileSizeInMB = fileSizeInKB / 1024;

      if (fileSizeInMB > limit) {
        reset();
        alert(`Maximum upload File size: ${limit} MB`);
        return;
      } else if (fileSizeInMB <= limit) {
        closeModal();
        return callback();
      }
    }
  };

  const uploadPostDetails = (postMediaUrl, mediaType) => {
    const { userName, userImage, _id: userId } = accountUser;

    return new Promise((resolve, reject) => {
      fetchFromApi(`/api/post/${userId}/add`, "POST", {
        userName,
        userImage,
        postMediaUrl,
        mediaType,
        caption,
      })
        .then((response) =>
          response.ok
            ? resolve({ ok: true, status: "Success", uploadType: mediaType })
            : reject({ ok: false, status: "Failed", uploadType: mediaType })
        )
        .catch((error) => {
          reject({ ok: false, status: "Failed", uploadType: mediaType, error });
        });
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const getMediaFormat = (file) => {
      const imageFormats = [
        "JPG",
        "JPEG",
        "PNG",
        "GIF",
        "BMP",
        "TIFF",
        "WEBP",
        "SVG",
        "ICO",
        "JP2",
        "HEIF",
        "AVIF",
        // Add more formats here if needed
      ];

      const videoFormats = [
        "MP4",
        "AVI",
        "MKV",
        "MOV",
        "WMV",
        "FLV",
        "3GP",
        "WEBM",
        "MPEG",
        "VOB",
        "RM",
        "SWF",
        // Add more formats here if needed
      ];
      const filename = file.name;

      const lastDotIndex = filename.lastIndexOf(".");
      if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
        // No dot in the filename or dot is the last character (no extension)
        return "";
      }

      const format = filename.slice(lastDotIndex + 1);
      if (imageFormats.includes(format.toUpperCase())) {
        return "image";
      } else if (videoFormats.includes(format.toUpperCase())) {
        return "video";
      } else {
        return null;
      }
    };

    const imageformat = getMediaFormat(selectedFile);
    if (imageformat === "image") {
      return validateSizeLimit(selectedFile, imageSizeLimit, () =>
        handleUpload([selectedFile, "image"], uploadPostDetails)
      );
    } else if (imageformat === "video") {
      return validateSizeLimit(selectedFile, videoSizeLimit, () =>
        handleUpload([selectedFile, "video"], uploadPostDetails)
      );
    } else {
      alert("Uplaod Failed : something went wrong");
      reset();
      return;
    }
  };
  return (
    <div className="create-new-post-card-container">
      <form onSubmit={handleSubmit} className="post-form">
        <div className="post-top-content">
          <p className="post-heading">Create new Post</p>
          <button className="share-button" type="submit">
            Share
          </button>
        </div>
        <div className="card-container post-form-container">
          <PostPreviewImage imageUrl={url} />

          <PostUploadDetails
            handleUpdateContent={handleUpdateContent}
            content={caption}
          />
        </div>
      </form>
    </div>
  );
};

export default PostSubmit;
