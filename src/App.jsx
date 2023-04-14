import "./App.css";
import Map from "./Map";
import { useEffect, useState } from "react";

function App() {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const position = async () => {
      await navigator.geolocation.getCurrentPosition(
        (position) =>
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        (err) => console.log(err)
      );
    };
    position();
  }, []);

  if (coords != null) {
    return <Map coords={coords} />;
  }

  return (
    <>
      <div className="App"></div>
    </>
  );
}

export default App;
