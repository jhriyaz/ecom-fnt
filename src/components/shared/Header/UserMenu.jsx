import LoginForm from "@/components/auth/LoginForm";
import { reset } from "@/redux/features/auth/authSlice";
import { Drawer, Dropdown } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userDrawer, setUserDrawer] = useState(false)
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(s => s.auth)
  const { userInfo } = useSelector(s => s.user)

  const Router = useRouter()

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

  console.log(userInfo)


  const handleLogout = () => {
    Cookies.remove("myshop_auth2");
    Router.push('/')
    dispatch(reset())
    setUserDrawer(false)
    setIsOpen(false)
  }

  const handleDropdown = () => {
    !isAuthenticated ? setIsOpen(!isOpen) : setUserDrawer(!userDrawer)
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
          <span>
            <HiOutlineUserCircle size={25} />
          </span>
        </a>
      </Dropdown>

      <Drawer
        className="sidebar_drawer"
        title={
          <div className="header">

            <h3 className="title">{userInfo?.user?.name}</h3>
            <button className="primary_outline_btn" onClick={handleLogout}>Logout</button>

          </div>
        }
        placement={"left"}
        closable={false}
        onClose={() => setUserDrawer(false)}
        open={userDrawer}
        key={'lest'}
      >
      </Drawer>
    </div>
  );
};

export default UserMenu;
