import {Link} from "react-router-dom";

const MainPage = () => {
    return (
        <div>
            <h1>Welcome to the Terrier search engine</h1>
            <Link to='/search'>Search Here</Link>
        </div>
    );
};

export default MainPage;