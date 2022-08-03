import React, { useState } from "react";
import style from './authPage.module.scss';
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header";
import Auth from "../../store/helper/Auth";
import Button from "../../components/buttons/Button/Button";
import ModalPopupUni from "../../components/ModalPopupUni";
import dogImg from "../../images/authPage/dog.png";
import catImg from "../../images/authPage/cat.png";

const AuthPage = () => {

    const [login, setLogin] = useState("")
    const [pass, setPass] = useState("")
    const [open, setOpen] = useState(false);
    const [messagesToUser, setMessagesToUser] = useState(false);

    const history = useNavigate()

    const handleSubmitForm = async (e) => {

        e.preventDefault();
        setOpen(false);
        let autoProcess = true;

        if (login.length === 0) {
            setMessagesToUser(<p>Укажите логин</p>);
            setOpen(true);
            autoProcess = false;
        }
        if (autoProcess && (pass.length === 0)) {
            setMessagesToUser(<p>Укажите пароль</p>);
            setOpen(true);
            autoProcess = false;
        }
        if (autoProcess) {
            const data = {
                "login": login,
                "password": pass
            }
            // console.log(data)

            if (await Auth.login(data)) {
                setAuthErrors(await Auth.login(data))

            } else {
                history("/admin")
            }
        }
    }

    const setAuthErrors = (prop) => {
        setOpen(false);
        if (prop === "\"User was not found\"") {
            setMessagesToUser(<p>Такого пользователя нет в базе. Проверьте внимательно логин или обратитесь по ссылке внизу</p>);
        }
        if (prop === "\"Wrong password\"") {
            setMessagesToUser(<p>Неверный пароль. Попробуйте еще раз</p>);
        }
        setOpen(true);
    }

    const handleOnChangeLogin = (e) => {
        setLogin(e.target.value.trim());
    }

    const handleOnChangePass = (e) => {
        setPass(e.target.value.trim());
    }

    return (
        <div className={style.container}>{ }
            <Header />
            <ModalPopupUni open={open} setOpen={setOpen} contentInfo={messagesToUser} />
            <div className={style.authPage}>
                <div>
                    <div className={style.dogAndCat}>
                        <img style={{marginRight: "9px"}} width="49px" height="48px" src={dogImg} alt="dog"/>
                        <img width="49px" height="48px" src={catImg} alt="cat"/>
                    </div>
                    <h1 className={style.authPage__title}>Кабинет администратора приюта</h1>
                </div>

                <form className={style.authPage__form} onSubmit={handleSubmitForm}>
                    <input className={style.authPage__inp} onChange={handleOnChangeLogin} type="text" placeholder="Логин" name="login" value={login} />
                    <input className={style.authPage__inp} onChange={handleOnChangePass} type="password" placeholder="Пароль" name="password" value={pass} />
                    <Button colorBtn="red" typeBtn="middle" submit="submit">{"Войти"}</Button>
                </form>
                <span className={style.authPage__text}>Напиши нам – создадим аккаунт<br /> для твоего приюта</span>
            </div>
        </div>
    );
};

export default AuthPage;