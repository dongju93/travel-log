import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntries } from './API';
import LogEntryForm from './LogEntryForm';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.532600,
    longitude: 127.024612,
    zoom: 10
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  }

  useEffect(() => {
    getEntries();
  }, []);

  // when double click triger this event
  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/tls2323/ck7vszf680xfr1ikboalcsuh2"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map(entry => (
          <React.Fragment key={entry._id}>
            <Marker
              latitude={entry.latitude}
              longitude={entry.longitude}
              // offsetLeft={-20}
              // offsetTop={-10}
            >
              <div
                onClick={() => setShowPopup({
                  // ...showPopup,
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
                  dynamicPosition={true}
                  onClose={() => setShowPopup({
                    // ...showPopup,
                    // [entry._id]: false
                  })}
                  anchor="top" >
                  <div className="popup">
                    <h3>{entry.title}</h3>
                    <h5>{entry.comments}</h5>
                    <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                    {entry.image && <img src={entry.image} alt={entry.title} />}
                  </div>
                </Popup>
              ) : null
            }
          </React.Fragment>
        ))
      }
      {/* double click event */}
      {
        addEntryLocation ? (
          <>
            <Marker
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
            >
              <div>
                <img
                  style={{
                    height: `${0.04 * viewport.height}px`,
                    width: `${0.04 * viewport.width}px`
                  }}
                  alt="marker"
                  className="marker"
                  src="https://i.imgur.com/y0G5YTX.png"
                />
              </div>
            </Marker>
          addEntryLocation ? (
            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setAddEntryLocation(null)}
              anchor="top" >
              <div className="popup">
                <LogEntryForm onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }} location={addEntryLocation} />
              </div>
            </Popup>
          ) : null
          </>
        ) : null
      }
    </ReactMapGL>
  );
}

export default App;
