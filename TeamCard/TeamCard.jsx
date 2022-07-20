import React from "react";
import { Grid, Typography } from '@mui/material'
import { Telegram } from "../SVG/Telegram"
import { Be } from "../SVG/Be"
import { Github } from "../SVG/Github"

class memberItem {
    constructor(role, memname, image, cont1 = "", cont2 = "", cont3 = "", description = "") {
        this.role = role;
        this.memname = memname;
        this.image = image;
        this.cont1 = cont1;
        this.cont2 = cont2;
        this.cont3 = cont3;
        this.description = description;
    }
}

const roles = ["UI-дизайн", "Frontend", "Backend", "ML"];

const designers = [
    new memberItem(
        roles[0],
        "Дмитриева Елизавета",
        "de",
        "https://www.behance.net/abstraducks",
        "https://t.me/abstraducks",
        "",
        "Разработка каркаса сайта, дизайн всех экранов, создание и отрисовка логотипа."
    ),
    new memberItem(
        roles[1],
        "Кудряшова Анастасия",
        "ka",
        "",
        "https://t.me/kudryashova_a_v",
        "https://github.com/Kudryashova-Nastya",
        "Координирование действий команды фронта (тимлидерство), реализация карточек питомцев и бургер-меню, построение запросов на сервер, работа с куки"
    ),
    new memberItem(
        roles[2],
        "Суровицкий Михаил",
        "sm",
        "",
        "https://t.me/zakhep66",
        "https://github.com/zakhep66",
        "Сервис раздачи статических файлов, подкачка картинок из сети на локальное хранилищe"
    ),
    new memberItem(
        roles[2],
        "Шукуров Фаррух",
        "shf",
        "",
        "https://t.me//yuuumei",
        "",
        "Team Lead Backend"
    ),
    new memberItem(
        roles[2],
        "Коростелёв Евгений",
        "ke",
        "",
        "https://t.me/KorostelevEA",
        "https://github.com/Kearus?tab=repositories",
        "Сервис по определению типа животного в ML приложении и дальнейшей записи результата в базу данных"
    ),
    new memberItem(
        roles[1],
        "Осипов Арсен",
        "oa",
        "",
        "https://t.me/proffi01",
        "https://github.com/ArsMen1",
        "Frontend. Подсказывал менее опытным участникам команды. Сам работал над главной страницей (лентой), асихроными запросами, куки и страничкой понравившихся животных."
    ),
    new memberItem(
        roles[3],
        "Першин Андрей",
        "",
        "",
        "https://t.me/Cailen",
        "https://github.com/Ca1len",
        "Разработка алгоритмов классификации типов животных и их пород по изображению"
    ),
    new memberItem(
        roles[2],
        "Рахымов Мухаммет",
        "",
        "",
        "https://t.me/dlwhi",
        "https://github.com/DLWHI",
        "Вытягивание информации из описаний животных.Прописывание логики эндпоинтов"
    ),
    new memberItem(
        roles[2],
        "Мусаева Алина",
        "",
        "",
        "https://t.me/jseventeenth",
        "https://github.com/a1ine",
        "Парсинг сайтов"
    ),
    new memberItem(
        roles[1],
        "Левин Никита",
        "",
        "",
        "https://t.me/NikeLevis",
        "https://github.com/NickoLevin",
        "Реализация страниц - фильтров поиска животных"
    ),
    new memberItem(
        roles[2],
        "Разиков Фаррух",
        "rf",
        "",
        "",
        "https://github.com/Farrukhraz",
        "Занимался задачами DevOps’а и Backend разработчика"
    ),
    new memberItem(
        roles[1],
        "Растрига Маргарита",
        "",
        "",
        "https://t.me/Margarita_RME",
        "https://github.com/RastrigaMargarita",
        "Реализация странички о команде, верстка, рефакторинг"
    ),
];

const TeamCard = () => {
    return (
        <div className="team-card">
            {roles.map((r, id) => (
                <div key={id}>
                    <span className="team-card__header">{r}</span>
                    {GetMemberCard(r)}
                    <span className="team-card__footer"> </span>
                </div>
            ))}
        </div>
    );
}

function GetMemberCard(r) {
    return (
        <>
            {designers.filter(el => el.role === r).map((m, id, arr) => (
                <Grid key={id} container rowSpacing={1} columns={6} className="team-card__about">
                    {GetPhoto(m.image)}
                    <Grid item xs >
                        <Typography className="team-card__name">{m.memname}</Typography>
                        {GetContactButton(1, `${m.cont1}`)}
                        {GetContactButton(2, `${m.cont2}`)}
                        {GetContactButton(3, `${m.cont3}`)}
                    </Grid>
                    <Grid item xs={5}>
                        <Typography className="team-card__description">{m.description}</Typography>
                    </Grid>

                    {GetLine(id, arr.length)}
                </Grid>
            ))}
        </>
    );
}

function GetContactButton(Conttype, ContString) {
    if (ContString !== "") {
        switch (Conttype) {
            case 1:
                return (
                    <a href={ContString} target="_blank" rel="noreferrer">
                        <span className="team-card__icons" ><Be /></span>
                    </a>
                );

            case 2:
                return (
                    <a href={ContString} target="_blank" rel="noreferrer">
                        <span className="team-card__icons" ><Telegram /></span>
                    </a>
                );

            case 3:
                return (
                    <a href={ContString} target="_blank" rel="noreferrer">
                        <span className="team-card__icons" > <Github /></span>
                    </a>
                );

            default:
                return "";
        }
    } else return "";
}

function GetPhoto(imagestring) {
    if (imagestring !== "") {
        return (
            <Grid item xs={3} >
                <img src={require(`./store/${imagestring}.jpg`)} alt="Фотография участника" />
            </Grid>)
    }
    else {
        return ""
    }

}

function GetLine(id, arrlength) {
    if (arrlength - 1 !== id) {
        return (
            <Grid item xs={5}>
                <hr className="team-card__line" />
            </Grid>
        );
    } else {
        return "";
    }
}

export default TeamCard;
