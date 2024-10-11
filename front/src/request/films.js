import axios from "axios";
import React, { useState,  } from "react";


function Requestfilms(){

const [characters, setcharacters] = useState([]);
const [searchQuery, setSearchQuery] = useState(''); 
const [data, setData] = useState({});


const Fetchsearch = async () =>{
try {
    let id = searchQuery;

    if (id) {
      const result = await axios(`http://localhost:5000/Peliculas/modulo/`);
      const characterData = result.data;
      setData(characterData);
      
    } 
  } catch (error) {
    console.error("Error al buscar el personaje:", error);
  }
}

}


export default Requestfilms;
