import "./assets/champs.css";
import { useEffect, useState } from "react";

interface Champion {
  id: string;
  name: string;
  title: string;
  image: {
    full: string;
  };
}

function Champs() {
  const [champions, setChampions] = useState<Champion[]>([]);

  useEffect(() => {
    const fetchChamps = async () => {
      try {
        const res = await fetch(
          "https://ddragon.leagueoflegends.com/cdn/14.9.1/data/pt_BR/champion.json"
        );
        const data = await res.json();
        const champsArray = Object.values(data.data) as Champion[];
        setChampions(champsArray);
      } catch (err) {
        console.error("Erro ao buscar campeões:", err);
      }
    };

    fetchChamps();
  }, []);

  return (
    <div className="container-app">
      <div className="align-arrow">
        <a href="/"><img src="/arrow-right.png" alt="seta-esquerda" /></a>
      </div>

      <div id="align-logoChamps">
        <img src="/Logo.png" alt="logo" />
      </div>

      <div id="desc-pag">
        <p>Descubra tudo sobre os campeões de League of Legends.</p>
      </div>

      <div id="display-btns"> 
        <div id="align-btns">
            <button id="btn-1">Lista</button>
            <button id="btn-2">Favoritos</button>
        </div>
      </div>

      <h2 id="h2-champs">Campeões LoL</h2>

      <div className="grid-view">
      {champions.map((champ) => (
  <div key={champ.id} className="cards-champ">
    <img
      src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`}
      alt={champ.name}
      className="champions-img"
    />
    <p className="desc-nome">{champ.name}</p>
    <p className="desc-titul">{champ.title}</p>
  </div>
))}

      </div>

      <div id="back-to-top">
        <img src="/arrow-right.png" alt="seta-cima" />
      </div>
    </div>
  );
}

export default Champs;
