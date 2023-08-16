import storage from "./firebase";
import { v4 as uuidv4 } from 'uuid';

// import ffmpeg from 'fluent-ffmpeg';

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// const compressVideo = (videoFile) => {
//   let compressVideoFile = "";
//   // Compress the video using fluent-ffmpeg
//   ffmpeg()
//     .input(videoFile.path) // Provide the path to the input video file
//     .videoCodec("libx264")
//     .audioCodec("aac")
//     .output("compressed.mp4") // Output filename
//     .on("end", (compressedVideoData) => {
//       compressVideoFile = new Blob([compressedVideoData.buffer], {
//         type: "video/mp4",
//       });
//     })
//     .run();
//   console.log(compressVideoFile);
//   return compressVideoFile;
// };

// const compressVideo = async (videoFile) => {
//   await ffmpeg.load();

//   // Read the video file
//   ffmpeg.FS('writeFile', videoFile.name, await fetchFile(videoFile));

//   // Compress the video
//   await ffmpeg.run('-i', videoFile.name, '-vcodec', 'libx264', '-crf', '28', 'output.mp4');

//   // Get the compressed video as a Blob
//   const compressedVideoData = ffmpeg.FS('readFile', 'output.mp4');
//   const compressedVideoBlob = new Blob([compressedVideoData.buffer], { type: 'video/mp4' });

//   // Generate a URL for the compressed video
//   const url = URL.createObjectURL(compressedVideoBlob);
//   setCompressedVideoUrl(url);
// };


const uploadMedia = async (file, path) => {
  if (path === "user" && !file) {
    return;
  }
  if (!file) {
    alert("Please upload an image/video first!");
    return;
  }

  const storageRef = ref(storage, `/${path}/${file.name}${uuidv4()}`);

  // progress can be paused and resumed. It also exposes progress updates.
  // Receives the storage reference and the file to upload.
  const snapshot = await uploadBytesResumable(storageRef, file);
  if (snapshot.state === "success") {
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }
  return null;
};

export const uploadPostImageToFirebase = async (file) => {
  return uploadMedia(file, "post");
};

export const uploadUserImageToFirebase = async (file) => {
  return uploadMedia(file, "user");
};

export const uploadVideoToFirebase = async (file) => {
  // const compressedFile = compressVideo(file);
  // console.log(compressedFile, "after compression");
  return uploadMedia(file, "video");
};
