import React, {useState} from 'react';
import style from './registrationPage.module.scss';
import Header from "../../components/Header/Header";
import Button from "../../components/buttons/Button/Button";
import {Box, TextField} from "@mui/material";
const RegistrationPage = ({title, nameBtn}) => {
    const [isValid, setIsValid] = useState(true)

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const form = e.target;
        const oldPass = form?.enterOldPass.value;
        const newPass = form?.enterNewPass.value;
        const repeatNewPass = form?.enterRepeatNewPass.value;

        if (newPass === repeatNewPass) {
            setIsValid(prevState => prevState = true)
            console.log('isValid',isValid)
        }
        if (newPass !== repeatNewPass) {
            setIsValid(prevState => prevState = false)
            console.log('isValid',isValid)
        }

        console.log({nameBtn})
        console.log('oldPass',oldPass)
        console.log('newPass',newPass)
        console.log('repeatNewPass',repeatNewPass)

        form.enterOldPass.value = '';
        form.enterNewPass.value = '';
        form.enterRepeatNewPass.value = '';
        setIsValid(true);
    };

    return (
        <div className={style.container}>
            <Header/>
            <div className={style.registrationPage}>
                <h1 className={style.registrationPage__title}>{title}</h1>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmitForm}
                >
                    <div className={style.registrationPage__main}>
                        <TextField
                            id="standard-required"
                            label="Старый пароль"
                            autoComplete="current-password"
                            variant="standard"
                            style={{marginBottom: '64px'}}
                            placeholder="Введите старый пароль"
                            name="enterOldPass"
                            required
                        />
                        <TextField
                            id="standard-error-helper-text"
                            label={isValid ? "Новый пароль" : "Ошибка"}
                            autoComplete="current-password"
                            variant="standard"
                            style={{marginBottom: '64px'}}
                            placeholder="Введите новый пароль"
                            name="enterNewPass"
                            error={!isValid}
                            helperText={!isValid ? 'Пароли не совпадают!' : ''}
                            required
                        />
                        <TextField
                            id={isValid ? "standard-required" : "standard-error-helper-text"}
                            label={isValid ? "Подтвердите пароль" : "Ошибка"}
                            autoComplete="current-password"
                            variant="standard"
                            placeholder="Подтвердите новый пароль"
                            name="enterRepeatNewPass"
                            error={!isValid}
                            helperText={!isValid ? 'Пароли не совпадают!' : ''}
                            required
                        />
                    </div>
                    <Button colorBtn="red" typeBtn="middle" submit="submit">{"Принять"}</Button>
                </Box>
            </div>
        </div>
    );
};

export default RegistrationPage;
