import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./assets/champ.css"; // champ.css deve ser exclusivo para este componente

interface ChampionData {
  id: string;
  name: string;
  title: string;
  blurb: string;
  tags: string[];
  info: {
    difficulty: number;
  };
  spells: {
    id: string;
    name: string;
    description: string;
    image: {
      full: string;
    };
  }[];
  passive: {
    name: string;
    description: string;
    image: {
      full: string;
    };
  };
}

function Champ() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [champ, setChamp] = useState<ChampionData | null>(null);

  useEffect(() => {
    const fetchChampData = async () => {
      try {
        const res = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/14.9.1/data/pt_BR/champion/${id}.json`
        );
        const data = await res.json();
        const champData = data.data[id as string] as ChampionData;
        setChamp(champData);
      } catch (err) {
        console.error("Erro ao buscar detalhes do campeão:", err);
      }
    };

    fetchChampData();
  }, [id]);

  if (!champ) return <p>Carregando...</p>;

  const dificuldadeNivel = Math.ceil((champ.info.difficulty / 10) * 3);
  const nivelImgs = [1, 2, 3].map((n) =>
    `/${n <= dificuldadeNivel ? "nivel-claro" : "nivel-escuro"}.png`
  );

  return (
    <div className="container-app" id="champ-container">
      <div className="align-arrow">
        <button onClick={() => navigate(-1)}>
          <img src="/arrow-right.png" alt="Voltar" />
        </button>
      </div>

      <div id="align-imgChamp">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`}
          alt={champ.name}
          id="img-campeao"
        />
      </div>

      <h2 id="campeao-selecionado">{champ.name}</h2>
      <p id="campeao-titulo">{champ.title}</p>
      <p id="campeao-resumo">{champ.blurb}</p>

      <section id="funcao-dificuldade">
        <div id="align-funcao">
          <img
            src={`/${champ.tags[0]?.toLowerCase()}.png`}
            alt="Função"
            id="img-funcao"
          />
          <div>
            <p id="title-funcao">Função</p>
            <p id="funcao">{champ.tags[0]}</p>
          </div>
        </div>

        <div id="dificuldade">
          <p id="dificuldade-p1">Dificuldade</p>
          <p id="dificuldade-p2">{champ.info.difficulty}</p>
          <div id="nivel">
            {nivelImgs.map((img, i) => (
              <img key={i} src={img} alt={`Nível ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      <h2 id="title-habilidades">Habilidades</h2>

      <div id="skills">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/passive/${champ.passive.image.full}`}
          alt="Passiva"
          title={champ.passive.name}
          id="habilidade-p"
        />
        {champ.spells.map((spell, index) => (
          <img
            key={spell.id}
            src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/spell/${spell.image.full}`}
            alt={spell.name}
            title={spell.name}
            id={`habilidade-${["q", "w", "e", "r"][index]}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Champ;
