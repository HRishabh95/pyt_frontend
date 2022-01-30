import {Outlet, NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import React from 'react';
import axios from 'axios';
import Slider from 'react-rangeslider';
import RangeSlider from "./RangeSlider";

const Loader = () => (
  <div class="divLoader">
    <svg class="svgLoader" viewBox="0 0 100 100" width="10em" height="10em">
      <path stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#51CACC" transform="rotate(179.719 50 51)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></path>
    </svg>
  </div>
);




const Search = () => {
    let params = useParams();
    let [docs, setdocs] = useState([]);
    let [sortType, setSortType] = useState('Topical');
    let [loading,setloading]=useState(true);
    const [sliderValue, setSliderValue] = useState(0);
    const [sliderProps, setSliderProps] = useState({
     min: 0,
     max: 100,
     value: 20,
     label: 'Weights'
   });
    useEffect(() => {
        fetchdocs();
        // sortArray(sortType);
    }, [params.searchValue]);
    const fetchdocs = () => {
        axios
            .get(`http://127.0.0.1:5000/search?query=${params.searchValue}`)
            .then((response) => {
                setloading(false);
                console.log(response);
                setdocs(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(()=>{
         sortArray(sortType)
    },[sortType])

    const sortArray = type =>{
        const types= {
            Topical:'score',
            Credible:'cred_score',
        };
        const sortProperty = types[type];
        const sorted =[...docs].sort((a,b) => b[sortProperty]-a[sortProperty]);
        setdocs(sorted);
    };

   const handleSliderChange = e => {
     setSliderValue(e.target.value);
   };
    return (
            <div style={{display:'flex'}}>
                {loading? <Loader />:null}
       <nav
         style={{
           borderRight: "solid 1px",
           padding: "1rem"}}>
           <select onChange={(e) => setSortType(e.target.value)}>
               <option value='Topical'>Topical</option>
               <option value='Credible'>Credible</option>
           </select>
           {/*<Slider*/}
           {/*     min={0}*/}
           {/*     max={100}*/}
           {/*     step={10}*/}
           {/*     value={sliderValue}*/}
           {/*     orientation="vertical"*/}
           {/*     onChange={handleSliderChange}/>*/}
          <div>
           <input
                {...sliderProps}
                type="range"
                value={sliderValue}
                id="Weight"
                name='Weight'
                onChange={handleSliderChange}
            />
              <label style={{display: "inline-block"}}>Weight Credible</label>
           </div>
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