import React, { useState } from 'react';

function SearchBar({onSearch}){
    const [text, setText] = useState("");

    const onChange = (e)=>{
        setText(e.target.value);
    }
    const onKeyDown = (e)=>{
        if(e.keyCode === 13) onSearch(text);
    }
    const onClick = ()=>{
        onSearch(text);
    }

    return (
        <div>
            <div className="search-bar">
                <input className="input-search" onChange={onChange} onKeyDown={onKeyDown} value={text} placeholder="Search by user name"></input>
                <div className="search-btn" onClick={onClick}>➤</div>
            </div>
        </div>
    );
}

export default SearchBar;