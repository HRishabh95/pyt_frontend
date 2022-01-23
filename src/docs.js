import {useLocation} from "react-router-dom";


export default function Docs() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let data = useLocation();
    return (
        <main style={{ padding: "1rem" }}>
      <h2>Score: {data.state.score}</h2>
      <p>
        {data.state.text}
      </p>
      </main>
    );
}