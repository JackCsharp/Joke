import DefaultButton from "../Components/UI/Button/DefaultButton";
import WhiteButton from "../Components/UI/Button/WhiteButton";
import classes from "./Styles/ProfilePage.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../Context";
import UserInfoTab from "./ProfilePageTabs/UserInfoTab/UserInfoTab";
import AllJokesTab from "./ProfilePageTabs/UserInfoTab/AllJokesTab";
const ProfilePage = () => {
  const { setIsAutorized, setUserId } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("info");
  const handlerTabChange = async (tab) => {
    setActiveTab(tab);
  };
  function exit() {
    setIsAutorized(false);
    setUserId(null);
    localStorage.removeItem("userId");
  }
  return (
    <div className={classes.main}>
      <div className={classes.leftBar}>
        <DefaultButton onClick={() => handlerTabChange("info")}>
          Информация про Джокера
        </DefaultButton>
        <WhiteButton onClick={() => handlerTabChange("myJokes")}>
          Свои шутки
        </WhiteButton>
        <DefaultButton onClick={() => handlerTabChange("favorite")}>
          Избранное
        </DefaultButton>
        <WhiteButton onClick={() => exit()}>Выйти</WhiteButton>
      </div>
      <div className={classes.rightBar}></div>
      {activeTab === "info" && <UserInfoTab></UserInfoTab>}
      {activeTab === "myJokes" && <AllJokesTab></AllJokesTab>}
      {activeTab === "favorite" && (
        <div>
          <h1>Favorite</h1>
        </div>
      )}
      {activeTab === "exit" && <div>exit</div>}
    </div>
  );
};
export default ProfilePage;
