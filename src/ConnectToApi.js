import axios from "axios";

const BASE_URL = "https://cc-backend-p23d.onrender.com"

class ConnectToBackend {
    
    static token;

    static async request (endpoint, data = {}, method = "get"){
        console.debug("API Call:", endpoint, data, method);
        const url = `${BASE_URL}/${endpoint}`
        const headers = { Authorization : `Bearer ${ConnectToBackend.token}`};
        const params = (method === "get")
        ? data
        : {};
        try {
            const res = await axios({url, method, data, params, headers});
            return res.data;
        }
        catch(err){
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async register(newUser){
            const data = await this.request("auth/register", newUser, "post");
            const token = data.token;
            return token;
    }

    static async login (user){
        const data = await this.request("auth/token", user, "post");
        const token = data.token;
        return token;
    }

    static async save (story) {
        const data = await this.request("stories/save", story, "post");
        const savedStory = data.story
        return savedStory
    }

    static async getStoriesByUser(username) {
        const data = await this.request(`stories/${username}`, {} , "get");
        const stories = data.stories
        return stories
    }

    static async getRecentStoriesByUser(username) {
        const data = await this.request(`stories/${username}/recent`, {} , "get");
        const stories = data.stories
        return stories
    }

    static async getStoryById(id) {
        const data = await this.request(`stories/${id}/read`, {}, "get");
        const story = data.story
        return story
    }

    static async editStory (id, info) {
        const data = await this.request(`stories/${id}/update`, info, "patch");
        const story = data.story
        return story
    }

    static async deleteStory (id) {
        const data = await this.request(`stories/${id}/delete`, {}, "delete");
        const story = data.story
        return story
    }

    static async discover (user) {
        const data = await this.request(`stories/getall`, user, "post");
        return data
    }

    static async getFollowing (user) {
        const resp = await this.request("users/following", user, "post");
        const data = resp.followingList
        return data
    }

    static async follow (data) {
        const resp = await this.request("users/follow", data, "post");
        return resp
    }

    static async unfollow (data) {
        const resp = await this.request("users/unfollow", data, "delete");
        return resp
    }

    static async feed (username) {
        const data = await this.request(`users/${username}/feed`, {}, "get");
        const feed = data.stories
        return feed
    }

    static async getAPIKEY () {
        const data = await this.request(`users/getAPIKEY`, {}, "get");
        return data.key
    }
}

export default ConnectToBackend;