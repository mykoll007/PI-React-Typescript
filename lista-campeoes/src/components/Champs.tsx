import "../assets/champs.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


interface Champion {
  id: string;
  name: string;
  title: string;
  image: {
    full: string;
  };
}

function Champs() {
  const navigate = useNavigate();

  const [champions, setChampions] = useState<Champion[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showArrow, setShowArrow] = useState(false);

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

   //  Detectar scroll para mostrar a seta
   useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //  Voltar ao topo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

    //  Campeões filtrados com base na busca
  const filteredChampions = champions.filter((champ) =>
    champ.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
            <button id="btn-1">Lista</button>
            <button id="btn-2" onClick={() => navigate("/favoritos")}>Favoritos</button>
        </div>
      </div>

      <h2 id="h2-champs">Campeões LoL</h2>

    <div id="align-input">
      <input type="text" placeholder="Pesquisar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
    </div>

      <div className="grid-view">
      {filteredChampions.map((champ) => (
    <div key={champ.id} className="cards-champ" onClick={() => navigate(`/champ/${champ.id}`)}
        style={{ cursor: "pointer" }}>
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

      <div id="back-to-top" className={showArrow ? "show" : ""} onClick={scrollToTop}>
        <img src="/arrow-right.png" alt="seta-cima" />
      </div>
    </div>
  );
}

export default Champs;
