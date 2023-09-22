import axios from "axios";

export default class JokeService {
  static async getAll() {
    try {
      const response = await axios.get("https://localhost:7223/api/Joke");
      return response;
    } catch (e) {}
  }
  static async addJoke(p) {
    await axios.post("https://localhost:7223/api/Joke", {
      title: p.title,
      text: p.text,
      rating: 0,
      userId: p.userId,
    });
  }
  static async deleteJoke(id) {
    await axios.delete(`https://localhost:7223/api/Joke/${id}`);
  }
  static async getJoke(id) {
    const response = await axios.get(`https://localhost:7223/api/Joke/${id}`);
    return response.data[0];
  }
  static async getAllComments(jokeId) {
    const response = await axios.get(
      `https://localhost:7223/api/Joke/Comments/${jokeId}`
    );
    return response.data;
  }
}
