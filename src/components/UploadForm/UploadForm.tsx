import React, { useState } from "react";
import {
  projectStorage,
  projectFirestore,
} from "../../services/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import "./UploadForm.css";

const UploadForm = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverArtFile, setCoverArtFile] = useState<File | null>(null);
  const [songName, setSongName] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!audioFile || !coverArtFile || !songName) {
      alert("All fields are required");
      return;
    }

    try {
      // Upload cover art
      const coverArtRef = ref(projectStorage, `coverArts/${coverArtFile.name}`);
      const coverArtSnapshot = await uploadBytes(coverArtRef, coverArtFile);
      const coverArtUrl = await getDownloadURL(coverArtSnapshot.ref);

      // Upload audio file
      const audioRef = ref(projectStorage, `audios/${audioFile.name}`);
      const audioSnapshot = await uploadBytes(audioRef, audioFile);
      const audioUrl = await getDownloadURL(audioSnapshot.ref);

      // Save song data in Firestore
      await addDoc(collection(projectFirestore, "songs"), {
        name: songName,
        coverArtUrl,
        audioUrl,
        createdAt: new Date(),
      });

      // Clear the form
      setAudioFile(null);
      setCoverArtFile(null);
      setSongName("");
      alert("Song uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error uploading files");
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <div>
        <label htmlFor="audio-upload">Audio File:</label>
        <input
          type="file"
          id="audio-upload"
          accept="audio/*"
          onChange={(e) =>
            setAudioFile(e.target.files ? e.target.files[0] : null)
          }
        />
      </div>
      <div>
        <label htmlFor="cover-art-upload">Cover Art:</label>
        <input
          type="file"
          id="cover-art-upload"
          accept="image/*"
          onChange={(e) =>
            setCoverArtFile(e.target.files ? e.target.files[0] : null)
          }
        />
      </div>
      <div>
        <label htmlFor="song-name">Song Name:</label>
        <input
          type="text"
          id="song-name"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          placeholder="Song Name"
        />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
