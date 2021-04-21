import React from 'react';

function Option({onBack}){
    return (
        <>
            <div className="option-box">
                Option
            </div>
        <div className="label1" onClick={() => onBack()}>Back</div>
        </>
    );
}

export default Option;