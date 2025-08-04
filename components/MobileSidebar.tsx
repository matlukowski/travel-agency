// @ts-nocheck
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { Link } from "react-router";
import { useRef, useEffect } from "react";
import NavItems from "./NavItems";

const MobileSidebar = () => {
  const sidebarRef = useRef<SidebarComponent>(null);

  const toggleSidebar = () => {
    if (sidebarRef.current) {
      console.log("Toggle clicked, isOpen:", sidebarRef.current.isOpen);
      sidebarRef.current.toggle();
    }
  };

  useEffect(() => {
    // Ensure sidebar is hidden on mount
    if (sidebarRef.current) {
      sidebarRef.current.hide();
    }
  }, []);

  return (
    <div className="mobile-sidebar wrapper">
      <header>
        <Link to="/">
          <img
            src="/assets/icons/logo.svg"
            alt="Logo"
            className="size-[30px]"
          />
          <h1>Tourvisto</h1>
        </Link>

        <button onClick={toggleSidebar}>
          <img src="/assets/icons/menu.svg" alt="menu" className="size-7" />
        </button>
      </header>

      <SidebarComponent
        ref={sidebarRef}
        width={270}
        type="over"
        closeOnDocumentClick={true}
        showBackdrop={true}
        position="Left"
      >
        <NavItems handleClick={toggleSidebar} />
      </SidebarComponent>
    </div>
  );
};

export default MobileSidebar;
