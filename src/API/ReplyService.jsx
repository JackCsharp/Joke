import axios from "axios";

export default class ReplyService {
  static async addReply(reply) {
    await axios.post(`https://localhost:7223/api/CommentReply`, reply);
  }
  static async getRepliesByComment(commentId) {
    const response = await axios.get(
      `https://localhost:7223/api/CommentReply/${commentId}`
    );
    return response.data;
  }
}
