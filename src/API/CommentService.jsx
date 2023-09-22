import axios from "axios";

export default class CommentService {
  static async addComment(comment) {
    await axios.post(`https://localhost:7223/api/Comment`, comment);
  }
  static async deleteJoke(id) {
    await axios.delete(`https://localhost:7223/api/Comment/${id}`);
  }
}
