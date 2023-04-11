const onResponse = (res) => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

class Api {
    constructor({baseUrl, headers}) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    getProductList(token) {
        return fetch(`${this._baseUrl}/products`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(onResponse)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then(onResponse)
    }

    getProductById(idProduct, token) {
        return fetch(`${this._baseUrl}/products/${idProduct}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(onResponse)
    }

    setUserInfo(dataUser) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(dataUser),
        }).then(onResponse)
    }

    search(searchQuery, token) {
        return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(onResponse)
    }

    changeLikeProduct(productId, isLike, token) {
        return fetch(`${this._baseUrl}/products/likes/${productId}`, {
            method: isLike ? 'DELETE' : 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(onResponse)
    }

    register(dataUser) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(dataUser),
        }).then(onResponse)
    }

    login(dataUser) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(dataUser),
        }).then(onResponse)
    }

    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(onResponse)
    }
}

const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'Content-Type': 'application/json',
        // Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VhYTYxZjU5Yjk4YjAzOGY3N2I1ZTMiLCJncm91cCI6ImZyb250MTAiLCJpYXQiOjE2NzY5OTQxODIsImV4cCI6MTcwODUzMDE4Mn0.qhDc1OR9TsQoqnA0InEjGiStTnoSmVaOmVLyytWSxXU'
        // Authorization: `Bearer ${token}`
    }
}

const api = new Api(config);

export default api;
