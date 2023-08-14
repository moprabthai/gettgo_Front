import axios from "axios";
export default {
    config() {
      return {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8;",
        Accept: "q=0.8;application/json;q=0.9",
        headers: {
          Authorization: "Basic " + sessionStorage.getItem("token"),
        },
      };
    },
    FormData(params) {
        return axios.post(
          "/request_ot",
          params,
          this.config()
        );
      },
    GetHistory(params){
      return axios.post(
        "/history",
        params,
        this.config()
      );
    }
}