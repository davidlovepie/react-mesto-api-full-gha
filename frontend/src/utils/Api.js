class Api {
  constructor(options) {
   this.baseUrl = options.baseUrl;
   this.headers = options.headers;
   
  }

  editProfileAvatar({ avatar }) {

    return fetch(`${this.baseUrl}/users/me/avatar`, {
       method: 'PATCH',
       headers: {
        authorization: `Bearer ${localStorage.getItem('JWT')}`,
        "Content-Type": "application/json",
      },
       body: JSON.stringify({ avatar })
     })
 
     .then(this.checkResponse);
     
   }

  deleteLike(_id) {

    return fetch(`${this.baseUrl}/cards/${_id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('JWT')}`,
        "Content-Type": "application/json",
      },
    })

    .then(this.checkResponse);
    
  

  }


  addLike(_id) {

    return fetch(`${this.baseUrl}/cards/${_id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('JWT')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({_id})
    })

    .then(this.checkResponse);
    
  }

  deleteCard(_id) {

    return fetch(`${this.baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('JWT')}`,
        "Content-Type": "application/json",
      },
    })

    .then(this.checkResponse);
    
  

  }

  postCard({ name, link }) {

    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('JWT')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, link})
    })

    .then(this.checkResponse);
    
  

  }


  editProfileInfo({ name, about }) {
    console.log('headers', this.headers);
   return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('JWT')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, about})
    })

    .then(this.checkResponse);
    
  }

  getProfileInfo() {

    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('JWT')}`,
        "Content-Type": "application/json",
      }
    })
        .then(this.checkResponse);

  }

   getInitialCards() {

    return fetch(`${this.baseUrl}/cards`, {
        headers: {
        authorization: `Bearer ${localStorage.getItem('JWT')}`,
        "Content-Type": "application/json",
      }
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
  baseUrl: 'https://api.davidthebest.nomoredomainsicu.ru',
  headers: {
    authorization: `Bearer ${localStorage.getItem('JWT')}`,
    "Content-Type": "application/json",
  },

}); 




