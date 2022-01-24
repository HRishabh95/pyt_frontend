import {Outlet, Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import React from 'react';
import axios from 'axios';

const Search = () => {
    let params = useParams();
    const [docs, setdocs] = useState([]);
    useEffect(() => {
        fetchdocs();
    }, []);
    const fetchdocs = () => {
        axios
            .get(`http://127.0.0.1:5000/search?query=${params.searchValue}`)
            .then((response) => {
                console.log(response);
                setdocs(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
            <div style={{ display: "flex"}}>
       <nav
         style={{
           borderRight: "solid 1px",
           padding: "1rem"
         }}>
            <h1>Results</h1>
                {docs.map((doc) => (
                    <Link style={{ display: "block", margin: "1rem 0"}}
                          to={`/search/${params.searchValue}/${doc.docno}`}
                          state={{text: doc.text, score:doc.score, term:params.searchValue}}>
                        <h3>{doc.docno}</h3>
                    </Link>
                ))}
           </nav>
                <Outlet />
        </div>
    );
};

export default Search;