import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectFirestore } from "../../services/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import "./HomePage.css";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Song {
  name: string;
  coverArtUrl: string;
  audioUrl: string;
  createdAt?: Date; // Optional, in case some documents don't have this field
}

const HomePage = () => {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const songsQuery = query(
        collection(projectFirestore, "songs"),
        orderBy("createdAt", "desc") // Orders the songs by timestamp
      );

      try {
        const querySnapshot = await getDocs(songsQuery);
        const fetchedSongs = querySnapshot.docs.map(
          (doc: QueryDocumentSnapshot) => doc.data() as Song
        );
        setSongs(fetchedSongs);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div>
      <h1>Kawasaki.</h1>
      <Link to="/upload" className="nav-link">
        <FontAwesomeIcon icon={faUpload} />
        {/* Upload Music */}
      </Link>
      {songs.length > 0 ? (
        songs.map((song, index) => (
          <div key={index} className="song-container">
            <h3 className="song-title">{song.name}</h3>
            <img
              src={song.coverArtUrl}
              alt={song.name}
              className="song-cover-art"
            />
            <MusicPlayer audioUrl={song.audioUrl} />
          </div>
        ))
      ) : (
        <p>No songs available.</p>
      )}
    </div>
  );
};

export default HomePage;
