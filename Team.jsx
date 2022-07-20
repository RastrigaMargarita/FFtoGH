import {Container} from "@mui/material";
import React from "react";
import {Header, BackToList, TeamCard} from "../components";

function Team() {
    return (
        <Container sx={{width: "360px"}}>
            <Header/>
            <BackToList/>

            <div className="team-card-header">
                <span>Наша команда</span>
            </div>
            <TeamCard/>
        </Container>
    );
}

export default Team;
