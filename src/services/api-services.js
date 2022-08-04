import http from "../http-common";

class ApiCaller{

    signaler(signalement) {
        return http.post("/signalement", signalement);
    }
}

export default new ApiCaller();