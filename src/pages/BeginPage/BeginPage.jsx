import React, {useState} from "react";
import {Link} from "react-router-dom";
import HeaderBegin from "../../components/Filter/HeaderBegin";
import SelfButton from "../../components/Filter/SelfButton";
import {Container} from "@mui/material";
import choiceStore from "../../store/Choice";
import {ModalIcon} from "../../components/SVG";
import {observer} from "mobx-react";
import cookieStore from "../../store/Cookie";
import {useCookies} from "react-cookie";

const BeginPage = observer(() => {
    const [cookie,] = useCookies(["type"]);
    let isCookieUsed = false
    if (cookie.type) {
        isCookieUsed = true
    }
    const [modal, setModal] = useState(!isCookieUsed);

    document.addEventListener("click", function (e) {
        const target = e.target;

        if (target.closest("#startButton")) return;

        if (!target.closest(".ModalBeginPageBlock")) {
            cookieStore.cookie = false;
            setModal(false);
        }
    });

    return (
        <>
            <Container
                style={{
                    maxWidth: "360px",
                    position: "relative",
                    height: "fit-content",
                    margin: "auto auto",
                    marginTop: "-4rem",

                }}
            >               
                <div className="BeginPageBlock">
                    <div className="BeginPageBlock__text">
                        <HeaderBegin />
                    </div>
                                       
                    <p className="BeginPageBlock__text">                        
                        Найди себе<br/>четвероногого друга<br/>из приюта!
                    </p>
                    <img src={"..//static/BeginImage.png"} alt="пёсик" />
                    
                    <Link
                        to="/type"
                        style={{width: "100%"}}
                        onClick={choiceStore.setDefault()}
                    >
                        <SelfButton
                            color = {"true"}
                            text={"Найти друга"}
                            width={"100%"}
                            id={"startButton"}
                        />
                    </Link>

                    <Link
                        to="/login"
                        style={{width: "100%"}}
                    >
                        <SelfButton
                            color = {"true"}
                            text={"Войти в ЛК приюта"}
                            width={"100%"}
                            id={"startButtonShE"}
                        />
                    </Link>
                </div>
            </Container>
            <div className={modal ? "ModalBeginPage" : "ModalBeginPage-none"}>
                <div className="ModalBeginPageBlock">
                    <div className="ModalBeginPageBlock__block">
                        <ModalIcon/>
                        <p className="ModalBeginPageBlock__block__text">
                            Этот сайт использует cookie для хранения данных. Продолжая
                            использовать сайт, Вы даете согласие на работу с этими файлами.
                        </p>
                    </div>
                    <div className="ModalBeginPageBlock__blockButton">
                        <div
                            id="button"
                            style={{borderRadius: "30px"}}
                            onClick={() => {
                                cookieStore.cookie = true;
                                setModal(!modal);
                            }}
                        >
                            <SelfButton
                                color={false}
                                text={"Принять и продолжить"}
                                width={"100%"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default BeginPage;
