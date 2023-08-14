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
  async ontest(param, sucess) {
    await axios
      .get("https://jsonplaceholder.typicode.com/posts/1", "")
      .then((res) => {
        sucess(res);
      })
      .catch((res) => {
        sucess(res);
      });
  },
  GetEmpInfo(params) {
    return axios.post(
      "/employee",
      params,
      this.config()
    );
  },
  GetDepInfo(params) {
    return axios.post(
      "/department",
      params,
      this.config()
    );
  },
  GetApproverInfo(params) {
    return axios.post(
      "/approver",
      params,
      this.config()
    );
  },
  GetCommandInfo(params) {
    return axios.post(
      "/command",
      params,
      this.config()
    );
  },
  GetShiftInfo(params) {
    return axios.post(
      "/shift",
      params,
      this.config()
    );
  },
  GetShift_memberInfo(params) {
    return axios.post(
      "/shift_member",
      params,
      this.config()
    );
  },
  GetProfile_picture(params){
    return axios.post(
      "/profile_picture",
      params,
      this.config()
    );
  },
  
};
