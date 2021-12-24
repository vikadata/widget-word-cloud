import React from "react";
import WordCloud from './wordcloud/index';
// import Form from './form/index';
// import './main.css';
// import styles from './style.module.css'



export default (props) => {
  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%"}}>
      <div style={{height: "100%", width:"100%"}}>
        <WordCloud />
      </div>
    </div>
  );
};