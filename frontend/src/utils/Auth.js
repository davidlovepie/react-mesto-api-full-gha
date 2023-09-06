class Auth {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getUser(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this.checkResponse);
  }

  login({ password, email }) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(this.checkResponse);
  }

  registration({ password, email }) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(this.checkResponse);
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const auth = new Auth({
  baseUrl: "https://api.davidthebest.nomoredomainsicu.ru",
  headers: {
    // authorization: "3ed8239e-8734-4aff-9406-f23bc2058906",
    "Content-Type": "application/json",
  },
});
