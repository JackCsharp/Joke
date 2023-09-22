import axios from "axios";

export default class ReplyService {
  static async addComment(p) {}
  static async deleteJoke(id) {
    await axios.delete(`https://localhost:7223/api/Comment/${id}`);
  }
}
