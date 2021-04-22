import React, { useEffect, useState } from 'react';
import Panel from '../../component/Panel';

function Setting({onBack, keyset = "w/s/a/d/j"}){
    const [keys, setKeys] = useState([]);

    useEffect(()=>{
        const arr = keyset.split('/');
        setKeys(arr);
    }, []);

    return (
        <>
            <div className="option-box">
                <Panel title="Key Setting" style={{height : "70%", marginBottom : "15px"}}>
                    <div>
                        {keys.map((k, idx)=>{
                            return <div key={idx}>{k}</div>;
                        })}
                    </div>
                </Panel>
                <Panel title="Theme Color" style={{height : "30%"}}>
                    <div>

                    </div>
                </Panel>
            </div>
            <div className="label1" onClick={() => onBack()}>Back</div>
        </>
    );
}

export default Setting;