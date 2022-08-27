import { Outlet } from "react-router-dom";

const LayoutFooter = () => {
  return (
    <>
      <Outlet />

      <div className="App">
        <h1>maximised</h1>
        <h1>NOW PLAYING</h1>
        <p>Track Name</p>
        <p>Artist</p>
        <p>track image</p>
        <p>control icons</p>
        <audio src={''} autoPlay controls />
        <p>minimize button</p>
        <p>duration</p>
        <p>slider</p>
        <p>volume</p>

        <h1>minimised</h1>
        <p>track image</p>
        <p>Track Name</p>
        <p>Artist</p>
        <p>control icons</p>
        <audio src={''} autoPlay controls />
        <p>maximise button</p>
        <p>duration</p>
        <p>slider</p>
        <p>volume</p>
      </div>

      <img src="" alt="logo" />
      <h1>BRAND NAME</h1>
      <button>scroll to top</button>
    </>
  );
};

export default LayoutFooter;
