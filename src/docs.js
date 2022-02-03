import {useLocation} from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import React, {useEffect, useState} from "react";
import axios from "axios";
import downloadjs from "downloadjs";

export default function Docs() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let data = useLocation();
    const docid= data.state.docid;
    let [relevance, setrelevance] = useState(true);
    const seachq=data.state.term;
    var str_array=seachq.split(' ');
    var content=data.state.text;
    for(var i=0; i < str_array.length; i++)
    {
        var regEx = new RegExp(str_array[i], "ig");
        content = content.replaceAll(regEx,`<span style="background-color: red">${str_array[i]} </span> `)
    }
    // const content = data.state.text.replaceAll(seachq,`<span style="color: red">${seachq} </span> ` );
    // console.log(content)
    const handleMouseUp=()=> {
        alert(`Selected text: ${window.getSelection().toString()}`);
    }

     useEffect(()=> {
           get_rel();
     },[docid]);

    const get_rel = () =>{
        axios
        .get(`http://127.0.0.1:5000/getRel?docid=${data.state.docid}&query=${seachq}`)
            .then((response) => {
                console.log(response);
                setrelevance(response.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(()=>{
        post_rel()
    },[relevance]);
    const post_rel = () => {
        axios.post('http://127.0.0.1:5000/updateRel',{'docid':data.state.docid,'rel':relevance,'query':seachq})
            .then((response)=>{
                console.log(response);
            })
            .catch((err)=>{
                console.log(err);
            });
    }

    const getAnnoData = () => {
        axios
            .get('http://127.0.0.1:5000/getAnno')
            .then(function(r){
                let blob = new Blob([JSON.stringify(r.data)],{type: 'application/json'})
                let link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download='anno_all.json'
                link.click()
            })
    }

    return (
        <div style={{ padding: "1rem" }}>
            <button onClick={getAnnoData}>Download Annotation</button>
      <h2>Topical Score: {data.state.score}</h2>
            {relevance? (
        <button style={{right: '10px'}} onClick={(e)=> setrelevance(!relevance)} className='Relevant'>
             Relevant
        </button>):<button style={{right: '10px'}} onClick={(e)=> setrelevance(!relevance)} className='Relevant'>
             Non-Relevant
        </button>}
            {data.state.misinfo_score ? (
      <h2>Cred Score: {data.state.misinfo_score}</h2>):null}
            {data.state.a_score? (
      <h2>Agg Score: {data.state.a_score}</h2>):null}
      <p onMouseUp={handleMouseUp}>
        {ReactHtmlParser (content)}
      </p>
      </div>
    );
}

