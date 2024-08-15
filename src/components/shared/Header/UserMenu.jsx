import LoginForm from "@/components/auth/LoginForm";
import { Dropdown } from "antd";
import { useEffect, useState } from "react";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const isDropdown = event.target.closest(".drop");
      const isLoginContainer = event.target.closest(".user_login_container");

      if (!isDropdown && !isLoginContainer) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick); //side effect

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const items = [
    {
      key: "1",
      label: <LoginForm />,
    },
  ];

  const handleClickUser = () => {
    console.log("test");
  };

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Dropdown
        open={isOpen}
        placement="bottom"
        className="drop"
        menu={{
          items,
        }}
      >
        <a
          onClick={(e) => {
            e.preventDefault();
            handleDropdown();
          }}
        // className="drop"
        >
          <span onClick={handleClickUser}>
            <i className="far fa-user"></i>
          </span>
        </a>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
