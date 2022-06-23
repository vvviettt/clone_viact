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
};

export default authApi;
