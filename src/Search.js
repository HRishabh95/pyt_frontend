import {Outlet, NavLink, useParams, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import React from 'react';
import axios from 'axios';
//
// const Loader = () => (
//   <div class="divLoader">
//     <svg class="svgLoader" viewBox="0 0 100 100" width="10em" height="10em">
//       <path stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#51CACC" transform="rotate(179.719 50 51)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></path>
//     </svg>
//   </div>
// );
//



const Search = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let params = useParams();
    let extra_data = useLocation();
    let [docs, setdocs] = useState([]);
    let [sortType, setSortType] = useState('Topical');
    const [sliderValue, setSliderValue] = useState(0);
    const [sliderProps] = useState({
     min: 0,
     max: 1.0,
        step:0.1,
     value: 0,
     label: 'Weights'
   });
    let misinformation_checked=extra_data.state.misinformation
    let agg_checked=extra_data.state.agg

    useEffect(() => {
     // eslint-disable-next-line
        fetchdocs();
    }, [params.searchValue]);

    const fetchdocs = () => {
        axios
            .get(`http://127.0.0.1:5000/search?query=${params.searchValue}&mis_check=${misinformation_checked}`)
            .then((response) => {
                console.log(response);
                setdocs(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(()=>{
     // eslint-disable-next-line
         sortArray(sortType)
    },[sortType,sliderValue])

    const sortArray = type =>{
        const types= {
            Topical:'score',
            Credible:'cred_score',
            Agg:'agg_score',
        };
        const sortProperty = types[type];
        const sorted =[...docs].sort((a,b) => b[sortProperty]-a[sortProperty]);
        setdocs(sorted);
    };

   const handleSliderChange = e => {
     setSliderValue(e.target.value);
     var newList = docs.map((doc)=> {
         const aggList = {
             ...doc,
             agg_score:(1-parseFloat(sliderValue))*parseFloat(doc.score)+parseFloat(sliderValue)*parseFloat(doc.cred_score),
         };
         return aggList;
     });
     setdocs(newList)
   };




    return (
            <div style={{display:'flex'}}>
                {/*{loading? <Loader />:null}*/}

       <nav
         style={{
           borderRight: "solid 1px",
           padding: "1rem"}}>


           {misinformation_checked? (
           <select onChange={(e) => setSortType(e.target.value)}>
               <option value='Topical'>Topical</option>
               <option value='Credible'>Credible</option>
               <option value="Agg">Agg</option>
           </select>):null}


           {agg_checked?(
           <div>
           <input
                {...sliderProps}
                type="range"
                value={sliderValue}
                id="Weight"
                onChange={handleSliderChange}
            />
              <label style={{display: "inline-block"}}>Weight {sliderValue}</label>
           </div>):null}


           <h1>Results</h1>
                {docs
                    // .sort((a,b)=>(a[sortType] > b[sortType]) ? -1 : 1)
                    .map((doc) => (
                    <NavLink style={{ display: "block", margin: "1rem 0"}}
                          to={`/search/${params.searchValue}/${doc.docno}`}
                          state={{text: doc.text, docid: doc.docno, score:doc.score, term:params.searchValue, misinfo_score:doc.cred_score, a_score:doc.agg_score}}>
                        <h3>{doc.docno}</h3>
                    </NavLink>
                ))}
           </nav>
                <Outlet />
        </div>
    );
};

export default Search;