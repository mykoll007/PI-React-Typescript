import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Champion {
  id: string;
  name: string;
  title: string;
  image: { full: string };
}

function Favoritos() {
  const [favoritos, setFavoritos] = useState<Champion[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoritos = async () => {
      const favoritosIds = JSON.parse(localStorage.getItem("favoritos") || "[]");
      const res = await fetch("https://ddragon.leagueoflegends.com/cdn/14.9.1/data/pt_BR/champion.json");
      const data = await res.json();
      const todosChamps = Object.values(data.data) as Champion[];
      const filtrados = todosChamps.filter((champ) => favoritosIds.includes(champ.id));
      setFavoritos(filtrados);
    };
    fetchFavoritos();
  }, []);

  return (
    <div className="container-app">
      <div id="align-logoChamps">
        <img src="/Logo.png" alt="logo" />
      </div>

      <div id="desc-pag">
        <p>Descubra tudo sobre os campeões de League of Legends.</p>
      </div>

      <div id="display-btns">
        <div id="align-btns">
          <button id="btn-2" onClick={() => navigate("/")}>Lista</button>
          <button id="btn-1">Favoritos</button>
        </div>
      </div>

      <h2 id="h2-champs">Favoritos</h2>

      {favoritos.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px", color:"white", fontFamily: "'inter'" }}>
          Você não tem nenhum personagem favorito.
        </p>
      ) : (
        <div className="grid-view">
          {favoritos.map((champ) => (
            <div key={champ.id} className="cards-champ" onClick={() => navigate(`/champ/${champ.id}`)}>
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
      )}
    </div>
  );
}

export default Favoritos;
