import React from 'react';

const StepChoice = (props) => {
    return (
        <div className="StepChoiceBlock">
            <div className="StepChoiceBlock__circle StepChoiceBlockCircle-active">
                <p className="StepChoiceBlockCircle__text">1</p>
            </div>

            <div className="StepChoiceBlock__line" />

            <div className={props.page === 'gender' || props.page === 'other'
                ? "StepChoiceBlock__circle StepChoiceBlockCircle-active"
                :"StepChoiceBlock__circle StepChoiceBlockCircle"
            }>
                <p className="StepChoiceBlockCircle__text">2</p>
            </div>

            <div className="StepChoiceBlock__line" />

            <div className={props.page === 'other'
                ? "StepChoiceBlock__circle StepChoiceBlockCircle-active"
                :"StepChoiceBlock__circle StepChoiceBlockCircle"
            }>
                <p className="StepChoiceBlockCircle__text">3</p>
            </div>
        </div>
    );
};

export default StepChoice;
