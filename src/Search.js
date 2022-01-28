import {Outlet, NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import React from 'react';
import axios from 'axios';
import useCollapse from 'react-collapsed';





const Search = () => {
    let params = useParams();
    const [docs, setdocs] = useState([]);
    let [sortType, setSortType] = useState('Topical');
    useEffect(() => {
        fetchdocs();
        // sortArray(sortType);
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
    //
    // const sortArray = type =>{
    //     const types= {
    //         Topical:'score',
    //         Credible:'cred_score',
    //     };
    //     const sortProperty = types[type];
    //     const sorted =[...docs].sort((a,b) => b[sortProperty]-a[sortProperty]);
    //     setdocs(sorted);
    // };
    return (
            <div style={{display:'flex'}}>
       <nav
         style={{
           borderRight: "solid 1px",
           padding: "1rem"}}>
           {/*<select onChange={(e) => setSortType(e.target.value)}>*/}
           {/*    <option value='Topical'>Topical</option>*/}
           {/*    <option value='Credible'>Credible</option>*/}
           {/*</select>*/}
            <h1>Results</h1>
                {docs
                    .sort((a,b)=>(a[sortType] > b[sortType]) ? -1 : 1)
                    .map((doc) => (
                    <NavLink style={{ display: "block", margin: "1rem 0"}}
                          to={`/search/${params.searchValue}/${doc.docno}`}
                          state={{text: doc.text, score:doc.score, term:params.searchValue, misinfo_score:doc.cred_score}}>
                        <h3>{doc.docno}</h3>
                    </NavLink>
                ))}
           </nav>
                <Outlet />
        </div>
    );
};

export default Search;