import axios from "axios";

export default class CommentService {
  static async getAll() {
    try {
      const response = await axios.get("https://localhost:7223/api/Joke");
      return response;
    } catch (e) {}
  }
  static async addComment(p) {}
  static async deleteJoke(id) {
    await axios.delete(`https://localhost:7223/api/Joke/${id}`);
  }
  static async getJoke(id) {
    const response = await axios.get(`https://localhost:7223/api/Joke/${id}`);
    return response.data[0];
  }
}
