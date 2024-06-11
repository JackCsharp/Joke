import axios from "axios";

export default class UserService {
  static async Register(user) {
    try {
      const response = await axios.post(
        "https://localhost:7223/api/User/register",
        user
      );
      return response;
    } catch (error) {
      return null;
    }
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
    const response = await axios.get(`https://localhost:7223/api/User/${id}`);
    return response.data[0];
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
      await axios.put(
        `https://localhost:7223/api/User/UpdateGuild${userId},${guildId}`
      );
      return true;
    } catch (e) {
      return false;
    }
  }
  static async getAllUsers() {
    const users = await axios.get(`https://localhost:7223/api/User`);
    return users;
  }
}
