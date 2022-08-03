import {makeAutoObservable, runInAction} from "mobx";
import {getHostInformation, POSTCORS} from "./getHostInformation";

const host = getHostInformation()

class Auth {

    constructor() {
        makeAutoObservable(this)
    }

    // данные типа {
    //         "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTc5MzA1MzEsImlhdCI6MTY1NzkyODczMSwic2NvcGUiOiJhY2Nlc3NfdG9rZW4iLCJzdWIiOiJ1c2VyIn0.EqQXxk0DKon1xisVXOmqr69Xte6UkgoI1n2xCEM1MZw",
    //         "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTgwMTUxMzEsImlhdCI6MTY1NzkyODczMSwic2NvcGUiOiJyZWZyZXNoX3Rva2VuIiwic3ViIjoidXNlciJ9.Db62JMi1qnY48NLgD_VIN84Awf25hh0My-KcKCl3QoE",
    //         "shelter_id": 2
    //     }
    token = JSON.parse(localStorage.getItem('TOKEN_AUTH')) || null;

    login = (data) => {
        return this.getToken(data)
    };

    logout = () => {
        this.setToken(null)
    };


    getAUTH_CORS = () => {
        this.getTokenFromRefresh().then()
        return this.AUTH_CORS
    };

    getAUTH_POSTCORS = () => {
        this.getTokenFromRefresh().then()
        return this.AUTH_POSTCORS()
    };

    AUTH_POSTCORS = (data) => {
        return ({
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.token?.access_token,
                "X-ACCESS-TOKEN": process.env.REACT_APP_TOKEN,
            }
        })
    }

    AUTH_CORS = {
        headers: {
            "Authorization": this.token?.access_token,
            "X-ACCESS-TOKEN": process.env.REACT_APP_TOKEN,
        },
    };

    // узнать дату окончания жизни токена
    getExpirationDate = (jwtToken = null) => {
        if (jwtToken === null) {
            return null;
        }

        const jwt = JSON.parse(atob(jwtToken.split('.')[1]));
        return jwt.exp * 1000 || null;
    };

    // узнать просрочен ли токен
    isExpired = (exp) => {
        return Date.now() > exp;
    };

    getToken = async (data) => {
        if (!data) {
            return null;
        }

        const tokenAUTH_CORS = POSTCORS(data)

        const req = await fetch(`${host}/login`, tokenAUTH_CORS);
        const res = await req.json();
        if (req.ok && res?.status_code === 201) {
            this.setToken(res.detail);
            console.log(req.ok)
            return false
        } else {
            return JSON.stringify(res.detail)
        }
    }

    getTokenFromRefresh = async () => {
        if (!this.token) {
            return null;
        }

        if (this.isExpired(this.getExpirationDate(this.token.access_token))) {
            const AUTH = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "X-ACCESS-TOKEN": process.env.REACT_APP_TOKEN,
                    "Authorization": `Bearer ${this.token?.refresh_token}`
                }
            }

            const updatedToken = await fetch(`${host}/refresh_token`, AUTH).then(r => r.json());
            if (updatedToken.access_token) {
                this.setToken(updatedToken, true)
            } else {
                this.setToken(null)
            }
        }
        return this.token
    };

    setToken = (token, onlyAccess = false) => {
        if (token) {
            localStorage.setItem('TOKEN_AUTH', JSON.stringify(token));
        } else {
            localStorage.removeItem('TOKEN_AUTH');
        }
        runInAction (() => {
            if (onlyAccess) {
                this.token = {...this.token, access_token: token}
            } else {
                this.token = token;
            }
        })
        console.log('обновление токена', this.token)

    };

}

export default new Auth();