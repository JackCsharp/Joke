import classes from "./UserInfoTab.module.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../Context";
import UserService from "../../../API/UserService";

const UserInfoTab = () => {
  const { userId } = useContext(AuthContext);
  const [userData, setUserData] = useState({});

  async function fetchUser() {
    const response = await UserService.getUser(userId);
    setUserData(response);
  }
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <h1>Username</h1>
      {userData.username}
    </div>
  );
};
export default UserInfoTab;
