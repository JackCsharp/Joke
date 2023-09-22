import axios from "axios";
export default class GuildService {
  static async getAll() {
    const response = await axios.get("https://localhost:7223/api/Guild");
    const guilds = response.data;
    //guilds.splice(0, 1); this is for future tests
    return guilds;
  }
  static async addGuild(guild) {
    const response = await axios.post(
      "https://localhost:7223/api/Guild",
      guild
    );
    return response;
  }
  static async getGuild(id) {
    const response = await axios.get(`https://localhost:7223/api/Guild/${id}`);
    return response.data[0];
  }
  static async getAllMembers(id) {
    try {
      const response = await axios.get(
        `https://localhost:7223/api/Guild/AllMembers/${id}`
      );
      const members = response.data;
      return members;
    } catch (e) {
      return null;
    }
  }
}
