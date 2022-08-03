import React, {useEffect} from 'react';
import style from './adminPage.module.scss';
import Header from "../../components/Header/Header";
import {Link} from "react-router-dom";
import Auth from "../../store/helper/Auth";
import AdminMainStore from "../../store/AdminMainStore";
import {Container} from "@mui/material";
import {Loader} from "../../components";
import {observer} from "mobx-react";

const AdminPage = observer(() => {

    useEffect(() => {
        (async () => {
            await AdminMainStore.fetchInfo();
        })();
    }, []);

    return (
        <>
            {
                AdminMainStore.isLoading ? (
                        <Container className='loader-container'><Loader/></Container>
                    ) :
                    (<div className={style.container}>
                            <Header/>
                            <div className={style.adminPage}>
                                <h1 className={style.adminPage__title}>Профиль</h1>
                                <main className={`${style.adminPage__main} ${style.main}`}>
                                    <div className={style.logo}>
                                        <img src={AdminMainStore.shelterInfo.shelter_logo} alt="logo"/>
                                    </div>
                                    <h2 className={style.main__title}>{AdminMainStore.shelterInfo.name}</h2>
                                    <a className={style.main__link} target="_blank"
                                       href={AdminMainStore.shelterInfo.shelter_href}>{AdminMainStore.shelterInfo.shelter_href}</a>
                                </main>
                                <Link to={'/admin/add'} className={style.button__link}>
                                    <button className={style.adminPage__btn_big}>Добавить карточку животного</button>
                                </Link>
                                <Link to={'/admin/pets'} className={style.button__link}>
                                    <button className={style.adminPage__btn_big}>Открыть ленту моего приюта</button>
                                </Link>
                                <div>
                                    <Link className={style.adminPage__btn_small} to={'/edit'}>
                                        <button>Изменить данные</button>
                                    </Link>
                                    <Link className={style.adminPage__btn_small} onClick={() => Auth.logout()} to={'/'}>
                                        <button>Выйти</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    );
});

export default AdminPage;
