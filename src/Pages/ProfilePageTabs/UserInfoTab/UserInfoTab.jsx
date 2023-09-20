import classes from "./UserInfoTab.module.css"
import  {useContext, useState, useEffect} from "react";
import {AuthContext} from "../../../Context";
import UserService from "../../../API/UserService";

const UserInfoTab =  () => {
    const {userId} = useContext(AuthContext)
    const [userData, setUserData] = useState("Username")

    async function fetchUser(){
        const response = await UserService.getUser(userId)
        setUserData(response.data);
    }
    useEffect(()=>{
        fetchUser();
    },[])
  return(
      <div>
          <h1>Имя пользователя</h1>{userData[0].username}

      </div>
  )
}
export default UserInfoTab;