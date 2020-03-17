import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntries } from './API';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.532600,
    longitude: 127.024612,
    zoom: 10
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/tls2323/ck7vszf680xfr1ikboalcsuh2"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}>
      {
        logEntries.map(entry => (
          <>
            <Marker
              key={entry._id}
              latitude={entry.latitude}
              longitude={entry.longitude}
              // offsetLeft={-20}
              // offsetTop={-10}
            >
              <div
                onClick={() => setShowPopup({
                  ...showPopup,
                  [entry._id]: true,
                })}
              >
                <img
                  style={{
                    height: `${0.04 * viewport.height}px`,
                    width: `${0.04 * viewport.width}px`
                  }}
                  alt="marker"
                  className="marker"
                  src="https://i.imgur.com/y0G5YTX.png"
                />
                {/* <svg
                  // scale svg icon depends on zoom level
                  style={{
                    width: `calc(0.5vmin * ${viewport.zoom})`,
                    height: `calc(0.5vmin * ${viewport.zoom})`
                  }}
                  viewBox="0 0 24 24"
                  stroke="#FFFE00"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z">
                  </path>
                  <circle cx="12" cy="10" r="3">
                  </circle>
                </svg> */}
              </div>
            </Marker>
            {
              showPopup[entry._id]?(
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={true}
                  onClose={() => setShowPopup({
                    ...showPopup,
                    [entry._id]: false
                  })}
                  anchor="top" >
                  <div>
                    <h3>{entry.title}</h3>
                    <h5>{entry.comments}</h5>
                  </div>
                </Popup>
              ) : null
            }
          </>
        ))
      }
    </ReactMapGL>
  );
}

export default App;
