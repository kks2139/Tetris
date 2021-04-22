import React from 'react';

function Panel({style = {}, title = "", children}){
    return (
        <div style={style}>
            <div className="panel-box">
                <div className="panel-title">{title}</div>
                <div className="panel-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Panel;