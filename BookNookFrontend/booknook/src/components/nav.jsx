import React, { useState, useContext, useEffect } from "react";
import { Input, Menu, Responsive, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import authContext from "../context/authContext";
import Cookies from "js-cookie";
import default_user_img from "../asstes/default_user_img.png";
import completeprofileContext from "../context/completeprofileContext";
import userContext from "../context/userContext";
import baseURL from "../urls/url";

const MyMenu = () => {
  const { auth, setAuth } = useContext(authContext);
  const [img, setImg] = useState(default_user_img);
  const { completeProfile, setCompleteProfile } = useContext(
    completeprofileContext
  );
  const { user, setUser } = useContext(userContext);

  useEffect(() => {
    setImg(
      completeProfile ? `${baseURL}${user.profile.image}` : default_user_img
    );
  }, [user]);

  const handleLogout = () => {
    setAuth(false);
    Cookies.remove("AuthToken");
    setCompleteProfile(false);
    setUser({
      user: { username: null, email: null },
      profile: { name: null, mobile: null, city: null, image: null },
    });
  };

  return (
    <div>
      <Menu color="blue" inverted>
        <Menu.Item as={Link} to="/">
          <span>
            <h3>
              <Icon name="home" />
              BookNook
            </h3>
          </span>
        </Menu.Item>
        <Menu.Menu position="right">
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Menu.Item>
              <Input
                placeholder="Search..."
                icon={{ name: "search", circular: true, link: true }}
              />
            </Menu.Item>
          </Responsive>
          {auth ? (
            <>
              <Menu.Item as={Link} to="/create">
                <Icon name="add circle" />
              </Menu.Item>
              <Menu.Item as={Link} to="/profile">
                <Image src={img} avatar />
              </Menu.Item>
              <Menu.Item icon="sign-out alternate" onClick={handleLogout} />
            </>
          ) : (
            <>
              <Menu.Item name="Login" as={Link} to="/login"></Menu.Item>
              <Menu.Item name="Sign up" as={Link} to="/signup"></Menu.Item>
            </>
          )}
        </Menu.Menu>
      </Menu>

      <Responsive {...Responsive.onlyMobile}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Input icon="search" placeholder="Search..." />
        </div>
      </Responsive>
    </div>
  );
};

export default MyMenu;
