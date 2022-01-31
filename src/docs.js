import {useLocation} from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

export default function Docs() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let data = useLocation();
    const seachq=data.state.term;
    var str_array=seachq.split(' ');
    var content=data.state.text;
    for(var i=0; i < str_array.length; i++)
    {
        var regEx = new RegExp(str_array[i], "ig");
        content = content.replaceAll(regEx,`<span style="background-color: red">${str_array[i]} </span> `)
    }
    // const content = data.state.text.replaceAll(seachq,`<span style="color: red">${seachq} </span> ` );
    console.log(content)
    return (
        <div style={{ padding: "1rem" }}>
      <h2>Topical Score: {data.state.score}</h2>
      <h2>Cred Score: {data.state.misinfo_score}</h2>
      <h2>Agg Score: {data.state.a_score}</h2>
      <p>
        {ReactHtmlParser (content)}
      </p>
      </div>
    );
}

