import Link from "next/link";
import Search from "./Search";
import dynamic from "next/dynamic";
import { HiMiniBars3CenterLeft, HiOutlineShoppingCart } from "react-icons/hi2";
import { FaChevronDown } from "react-icons/fa";
const UserMenu = dynamic(async () => await import("./UserMenu"), {
  ssr: false,
});

const Header = () => {
  return (
    <header id="header">
      <div className="main_nav_container">
        <nav className="main_nav">
          <div className="main_container">
            <div className="logo">
              <i
                onClick={() => setUserDrawerOpen(true)}
                className="fas fa-bars mr-3"
              ></i>
              <Link href="/">
                <img src="/logo_white.png"></img>
              </Link>
              {/* <Link href="/"><a>Protocol Inc</a></Link> */}
            </div>
            <Search />
            <div className="header_info">
              <span
                className="icon"
              // onClick={() => handleCartOpen()}
              >
                <HiOutlineShoppingCart size={24} />
              </span>
              {/* {
                                    isAuthenticated && <NotificationComp />
                                } */}
              <UserMenu />
            </div>
          </div>
        </nav>

        <nav className="bottom_nav">
          <div className="main_container">
            <div className="categories">
              {/* <i
                onClick={() => setUserDrawerOpen(true)}
                className="fas fa-bars"
              ></i> */}
              <span onClick={() => setUserDrawerOpen(true)}>
                <HiMiniBars3CenterLeft size={24} />
              </span>
              <div className="cat_menu_hover">
                <span className="mr-2 be-vietnam-pro">Categories</span>
                <FaChevronDown />
              </div>

              {/* {
                                    showDropCat && <CategoryDropdown categories={categories} />
                                } */}
            </div>
            <div className="pages_list">
              <li>
                <Link href="/campaigns">Campaigns</Link>
              </li>
              <li>
                <Link href="/brands">Brands</Link>
              </li>
              <li>
                <Link href="/categories">Categories</Link>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
