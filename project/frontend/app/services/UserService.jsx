import axios from 'axios';


export default class UserService {
  constructor() {
    this.baseURL = `http://192.168.1.8:4000/api/user`;
  }

  async login () {
    let route = `${this.baseURL}/login`;
    return fetch(route, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-type': 'multipart/form-data'
      },
      body: JSON.stringify({
        username: 'janeDoe@gmail.com',
        password: '12345678',
      }),
    })
      .then((response) =>  response.json())
      .then(json => {
        console.log(json)
        return json;
      })
      .catch(error => {
        console.error(error)
      })
  }

  // logout(callback) {
  //   const token = localStorage.getItem('token');
  //   axios
  //     .post(
  //       `${this.basePath}/logout`,
  //       {},
  //       {
  //         headers: { Authorization: `Token ${token}` },
  //       },
  //     )
  //     .then(response => {
  //       localStorage.setItem('token', '');
  //       callback(response);
  //     })
  //     .catch(error => {
  //       callback(error);
  //     });
  // }
}
