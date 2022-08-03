import React from 'react';
import style from "./editPage.module.scss";
import Header from "../../components/Header/Header";
import {NavLink} from "react-router-dom";
import {ArrowBack, PaperСlip} from "../../components/SVG";
import dogImg from "../../images/authPage/dog.png";
import catImg from "../../images/authPage/cat.png";

const EditPage = () => {

    return (
        <div className={style.container}>
            <Header/>
            <div className={style.editPage}>
                <div>
                    <NavLink className={style.editPage__link} to={"/admin"}><ArrowBack/>Назад</NavLink>
                    <h1 className={style.editPage__title}>Редактировать профиль</h1>
                </div>
                <form className={style.editPage__form} method="post">
                    <div className={style.editPage__bg}>
                        <label htmlFor="login" className={style.editPage__label}>Логин</label>
                        <input className={style.editPage__input} type="text" id="login" placeholder="qwertyuiopasdfghj"
                               required/>
                        <label htmlFor="old_password" className={style.editPage__label}>Старый пароль</label>
                        <input className={style.editPage__input} type="password" id="old_password"
                               placeholder="qwertyuiopasdfghj" required/>
                        <label htmlFor="new_password" className={style.editPage__label}>Новый пароль</label>
                        <input className={style.editPage__input} type="password" id="new_password"
                               placeholder="qwertyuiopasdfghj" required/>
                        <label htmlFor="first_name" className={style.editPage__label}>Имя</label>
                        <input className={style.editPage__input} type="text" id="first_name" placeholder="Иван" required/>
                        <label htmlFor="surname" className={style.editPage__label}>Фамилия</label>
                        <input className={style.editPage__input} type="text" id="surname" placeholder="Иванов" required/>
                        <label htmlFor="name_shelter" className={style.editPage__label}>Приют (полное название)</label>
                        <input className={style.editPage__input} type="text" id="name_shelter"
                               placeholder="Кутёнки и котёнки" required/>
                        <label htmlFor="link_shelter" className={style.editPage__label}>Приют (ссылка на сайт)</label>
                        <input className={style.editPage__input} type="url" id="link_shelter"
                               placeholder="http://find-friend.site/" required/>
                        <div className={style.editPage__download}>
                            <p>Логотип приюта (формат PNG или JPEG с белым фоном)</p>
                            <div className={style.editPage__download__down}>
                                <div className={style.dogAndCat}>
                                    <img style={{marginRight: "9px"}} width="49px" height="48px" src={dogImg} alt="dog"/>
                                    <img width="49px" height="48px" src={catImg} alt="cat"/>
                                </div>
                                <label htmlFor="photo"><PaperСlip/>Загрузить фото</label>
                                <input type="file" name="photo" id="photo" multiple accept="image/*,image/jpeg"/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input className={style.editPage__download__save} type="submit" value="Сохранить"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPage;
