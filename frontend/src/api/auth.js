import axios from "axios";
const authApi = {
  register: (values) => {
    return axios
      .post("http://localhost:5050/auth/register", {
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        email: values.email,
        username: values.username,
        password: values.password,
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error.response.data;
      });
  },
  login: (key, password) => {
    return axios
      .post("http://localhost:5050/auth/login", {
        key: key,
        password: password,
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error.response.data;
      });
  },
  verify: (email) => {
    return axios
      .post("http://localhost:5050/auth/forgot_password", {
        email: email,
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error.response.data;
      });
  },
  changePassword: (code, new_password, token) => {
    return axios
      .post("http://localhost:5050/auth/change_password", {
        code: code,
        new_password: new_password,
        token: token,
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error.response.data;
      });
  },
};

export default authApi;
