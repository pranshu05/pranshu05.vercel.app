import { useEffect, useState } from 'react';
import getNowPlayingItem from '../APIs/LastFmAPI';
import { FaLastfm } from 'react-icons/fa';

export function CurrentlyPlaying() {
  const [result, setResult] = useState({});

  useEffect(() => {
    getNowPlayingItem().then((data) => {
      setResult(data);
    });
  }, []);

  return result.isPlaying ? (
    <div className="nowplaying">
      <div className="music-cont">
        <div className="music-track">
          <a
            href={result.songUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="song url"
          >
            <div className="song-img">
              <img
                src={result.albumImageUrl}
                alt={`${result.title}`}
              />
            </div>
            <div className="song-info">
              <div className="song-title">{result.title}</div>
              <div className="song-artist">
                <small>by {result.artist} | on {result.albumName}</small>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  ) : (
    <div className="nowplaying">
      <div className="music-cont">
        <div className="music-track">
          <div className="song-img">
            <FaLastfm />
          </div>
          <div className="song-info">
            <div className="song-artist" style={{ textAlign: 'center' }}>
              Not enjoying music rn!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
