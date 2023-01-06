class MainApi {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

  //Установка токена
  setToken(token) {
    this._token = token;
    this._headers = {
      ...this._headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
  
    // вернуть инфу
    getUser(token) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      }).then(this._checkResponse);
    }

    // редакктирование инфы 
    editUser({name, email}) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name,
          email,
        }),
      }).then(this._checkResponse);
    }

    getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: this._headers,

        }).then(this._checkResponse);

    }
  
    saveMovie(id, isLiked) {
        if(isLiked) {
        return fetch(`${this._baseUrl}/movies/${id}/likes`, {
          method: 'PUT',
          headers: this._headers
        })
          .then(this._checkResponse)
        } else {
          return fetch(`${this._baseUrl}/movies/${id}/likes`, {
              method: 'DELETE',
              headers: this._headers,
          }).then(this._checkResponse);
        }
      }
  
    deleteMovie(movieId) {
        return fetch(`${this._baseUrl}/movies/${movieId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._checkResponse);

    }
}
  
let token = localStorage.getItem("token");

  const mainApi = new MainApi({
      baseUrl: 'http://localhost:3004',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'content-type': 'application/json'
      }
  });
  
  export default mainApi;
  