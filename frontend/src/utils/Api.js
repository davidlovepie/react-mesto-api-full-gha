class Api {
  constructor(options) {
   this.baseUrl = options.baseUrl;
   this.headers = options.headers;
   
  }

  editProfileAvatar({ avatar }) {

    return fetch(`${this.baseUrl}/users/me/avatar`, {
       method: 'PATCH',
       headers: this.headers,
       body: JSON.stringify({ avatar })
     })
 
     .then(this.checkResponse);
     
   }

  deleteLike(_id) {

    return fetch(`${this.baseUrl}/cards/${_id}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    })

    .then(this.checkResponse);
    
  

  }


  addLike(_id) {

    return fetch(`${this.baseUrl}/cards/${_id}/likes`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({_id})
    })

    .then(this.checkResponse);
    
  }

  deleteCard(_id) {

    return fetch(`${this.baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: this.headers,
    })

    .then(this.checkResponse);
    
  

  }

  postCard({ name, link }) {

    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({name, link})
    })

    .then(this.checkResponse);
    
  

  }


  editProfileInfo({ name, about }) {

   return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({name, about})
    })

    .then(this.checkResponse);
    
  }

  getProfileInfo() {

    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
        .then(this.checkResponse);

  }

   getInitialCards() {

    return fetch(`${this.baseUrl}/cards`, {
  headers: this.headers
})
    .then(this.checkResponse);
}

   checkResponse(res) {
    
      if (res.ok) {
        return res.json();
 }

    return Promise.reject(`Ошибка: ${res.status}`);
}
  


}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '3ed8239e-8734-4aff-9406-f23bc2058906',
    'Content-Type': 'application/json'
  }

}); 




