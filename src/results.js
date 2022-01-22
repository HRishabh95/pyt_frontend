import React, {Component} from "react";
import { useParams } from "react-router-dom";
//
//
// class Results extends Component {
//
//     handleSearch = () => {
//         this.makeApiCall(this.state.searchValue);
//     };
//
//   //   constructor(props) {
//   //   super(props);
//   //   console.dir(props);
//   //   this.state = {
//   //     searchValue: props.state || 'unknown'
//   //   }
//   // }
//     makeApiCall = searchInput => {
//         var searchUrl = `http://127.0.0.1:5000/search?query=${searchInput}`;
//         fetch(searchUrl)
//             .then(response => {
//                 return response.json();
//             })
//             .then(jsonData => {
//                 this.setState({docs: jsonData});
//             });
//     };
//
//     render() {
//         // const { navigation } = this.props;
//         // const searchvalue = navigation.getParam('searchValue','corona side effects')
//         const { data } = this.props;
//
//         return (
//             <div>
//             <h1>this is {this.state}</h1>
//             {/*{this.state.docs ? (*/}
//             {/*<div id="results-container">*/}
//             {/*    {this.state.docs.map((docs, index) => (*/}
//             {/*  <div class="single-docs" key={index}>*/}
//             {/*    <div className='score'><h3>{docs.score}</h3></div>*/}
//             {/*    <div className='text'> <h3>{docs.text}</h3> </div>*/}
//             {/*    /!*<PostShort key={docs.docno} title={docs.text} score={docs.score} />*!/*/}
//             {/*  </div>*/}
//             {/*    ))}*/}
//             {/*</div>*/}
//             {/*)*/}
//             {/*}*/}
//         </div>
//         );
//     };
// }

export default function Results(){
    let searchValue = useParams();
    return <h2>Invoice: {searchValue}</h2>;
}