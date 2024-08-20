import LoginForm from "@/components/auth/LoginForm";
import { reset } from "@/redux/features/auth/authSlice";
import { Dropdown } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(s => s.auth)

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


  console.log(isAuthenticated)

  const handleLogout = () => {
    Cookies.remove("myshop_auth2");
    window.location.pathname = '/'
    dispatch(reset())
  }

  const handleDropdown = () => {
    setIsOpen(!isOpen)
  }

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
            {
              !isAuthenticated ? <LoginForm setIsOpen={setIsOpen} /> :
                <div className="form" style={{ minWidth: '200px' }}>
                  <button className="default_input" onClick={handleLogout}>Logout</button>
                </div>
            }
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
          <span>
            <HiOutlineUserCircle size={25} />
          </span>
        </a>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
