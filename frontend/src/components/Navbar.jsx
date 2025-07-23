import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import styled from "styled-components";
import { FiBell, FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  // const queryClient = useQueryClient();

  // const { mutate: logoutMutation, isLoading } = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["authUser"] });
  //     window.location.href = "/";
  //   },
  // });

  const { logoutMutation } = useLogout()

  return (
    <NavbarWrapper>
      <nav className="navbar">
        <div className="container">
          {isChatPage ? (
            <Link to="/" className="logo">
              VibeChat
            </Link>
          ) : (
            <div />
          )}

          {/* Right Side - Always aligned to right */}
          <div className="nav-right">
            <Link to="/notifications" className="icon-btn" title="Notifications">
              <FiBell size={22} />
            </Link>

            <div className="avatar" title={authUser?.fullName}>
              <img src={authUser?.profilePic} alt="User avatar" />
            </div>

            <button
              onClick={() => logoutMutation()}
              className="icon-btn"
              title="Logout"
              
            >
              <FiLogOut size={22} />
            </button>
          </div>
        </div>
      </nav>
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.header`
  .navbar {
    background-color: #161617;
    border-bottom: 1px solid #222;
    position: sticky;
    top: 0;
    z-index: 40;
    height: 46px;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  }

  .container {
    width: 100%;
    max-width: 1280px;
    padding: 0 1rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }

  .logo {
    font-size: 1.6rem;
    font-weight: 700;
    color: #05ac3a;
    text-decoration: none;
    letter-spacing: 0.5px;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    margin-left: auto; /* Pushes to far right */
  }

  .icon-btn {
    background: none;
    border: none;
    color: #e5e7eb;
    transition: color 0.2s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0.2rem;

    &:hover {
      color: #09ad14;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #31e50d;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media (max-width: 640px) {
    .logo {
      font-size: 1.2rem;
    }

    .nav-right {
      gap: 0.8rem;
    }

    .avatar {
      width: 32px;
      height: 32px;
    }
  }
`;

export default Navbar;
