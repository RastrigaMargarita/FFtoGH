import { useState } from "react";
import { Box, useTheme, Button, MobileStepper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
    ArrowBackIosNewRounded,
    ArrowForwardIosRounded,
} from "@mui/icons-material/";
import SwipeableViews from "react-swipeable-views";

const PetPhotos = (props) => {
    const images = props.images;
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    // для невидимости точек
    const useStyles = makeStyles({
        dot: {
            display: "none",
        },
        dotActive: {
            display: "none",
        },
    });
    const classes = useStyles();

    return (
        <>
            <div className="card__photo" style={{ position: "relative" }}>
                <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {images.map((step, index) => (
                        <div
                            key={index}
                            style={{
                                height: "100%",
                                display: "flex",
                            }}
                        >
                            {Math.abs(activeStep - index) <= 2 ? (
                                <Box
                                    className="card__photo--img"
                                    component="img"
                                    sx={{
                                        height: 326,
                                        display: "block",
                                        overflow: "hidden",
                                        width: "100%",
                                        objectFit: "cover",
                                        cursor: "zoom-in",
                                        // margin: "auto",
                                    }}
                                    src={step}
                                    alt="фото питомца"
                                />
                            ) : null}
                        </div>
                    ))}
                </SwipeableViews>
                <MobileStepper
                    classes={{
                        dotActive: classes.dotActive,
                        dot: classes.dot,
                    }}
                    sx={{
                        // position: 'relative',
                        // top: '-70px',
                        background: "none",
                        position: "absolute",
                        bottom: "44%",
                        padding: 0,
                        width: "100%",
                    }}
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleNext();
                            }}
                            disabled={activeStep === maxSteps - 1}
                        // sx={{position: 'relative', top: '-250px'}}
                        >
                            {activeStep < maxSteps - 1 ? (
                                <ArrowForwardIosRounded
                                    sx={{ fontSize: "2.1rem", color: "black" }}
                                />
                            ) : null}
                        </Button>
                    }
                    backButton={
                        <Button
                            size="small"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleBack();
                            }}
                            disabled={activeStep === 0}
                        // sx={{position: 'relative', top: '-250px'}}
                        >
                            {activeStep ? (
                                <ArrowBackIosNewRounded
                                    sx={{ fontSize: "2.1rem", color: "black" }}
                                />
                            ) : null}
                        </Button>
                    }
                />
            </div>
        </>
    );
};

export default PetPhotos;
