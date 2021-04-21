import React from 'react';

function ComboBox({onSelected, items = [], style={}}){

    return (
        <div style={style}>
            <select className="combobox" onChange={(e)=>{onSelected(e.currentTarget.value)}}>
                <option value="" selected>none</option>
                {items.map((d, idx)=>{
                    return <option value={d} key={idx}>{d}</option>
                })}
            </select>
        </div>
    );
}

export default ComboBox;