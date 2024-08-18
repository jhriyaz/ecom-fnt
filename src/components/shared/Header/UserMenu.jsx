import LoginForm from "@/components/auth/LoginForm";
import { Dropdown } from "antd";
import { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";

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
        placement="bottomLeft"
        className="drop"
        overlayClassName="navbar-dropdown"
        // menu={{
        //   items,
        // }}
        trigger={['click']}
        dropdownRender={() => (
          <div onClick={(e) => e.stopPropagation()}>
            <LoginForm setIsOpen={setIsOpen} />
          </div>
        )}
      >
        <a
          onClick={(e) => {
            e.preventDefault();
            handleDropdown();
          }}
        // className="drop"
        >
          <span onClick={handleClickUser}>
            <HiOutlineUserCircle size={25} />
          </span>
        </a>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
