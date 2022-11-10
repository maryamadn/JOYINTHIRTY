import { Outlet } from "react-router-dom";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { IconContext } from "react-icons";

const Start = () => {
  return (
    <>
      <div className="startPage">
        <IconContext.Provider value={{ size: "3em", className: "logo" }}>
          <MdOutlineLibraryMusic />
        </IconContext.Provider>
        <h1 className="brand">JOY IN THIRTY</h1>
        <Outlet />
      </div>
    </>
  );
};

export default Start;
