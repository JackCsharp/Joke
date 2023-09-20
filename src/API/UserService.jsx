import axios from "axios";

export default class UserService {
  static async Register(user) {
    console.log(user);
    try {
      await axios.post("https://localhost:7223/api/User/register", user);
    } catch (error) {}
  }
  static async Login(user) {
    try {
      const userId = await axios.post(
        "https://localhost:7223/api/User/login",
        user
      );
      return userId;
    } catch {
      return null;
    }
  }
  static async getUser(id) {
    return await axios.get(`https://localhost:7223/api/User/${id}`);
  }

  static async getJokes(id) {
    try {
      const response = await axios.get(
        `https://localhost:7223/api/User/getjokes${id}`
      );
      return response;
    } catch (error) {
      return null;
    }
  }
  static async updateGuild(userId, guildId) {
    try {
      console.log(userId, guildId);
      await axios.put(
        `https://localhost:7223/api/User/UpdateGuild${userId},${guildId}`
      );
      return true;
    } catch (e) {
      return false;
    }
  }
}
