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
        content = content.replaceAll(str_array[i],`<span style="color: red">${str_array[i]} </span> `)
    }
    // const content = data.state.text.replaceAll(seachq,`<span style="color: red">${seachq} </span> ` );
    console.log(content)
    return (
        <div style={{ padding: "1rem" }}>
      <h2>Score: {data.state.score}</h2>
      <p>
        {ReactHtmlParser (content)}
      </p>
      </div>
    );
}

