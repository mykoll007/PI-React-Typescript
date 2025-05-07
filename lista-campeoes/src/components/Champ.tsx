import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/champ.css";
import "../assets/responsivel.css"

interface ChampionData {
  id: string;
  key: string;
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

interface SelectedSkill {
  name: string;
  description: string;
  key: "P" | "Q" | "W" | "E" | "R";
}

function Champ() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [champ, setChamp] = useState<ChampionData | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SelectedSkill | null>(null);
  const [isFavorito, setIsFavorito] = useState(false);

  const traducaoFuncoes: Record<string, string> = {
    Assassin: "Assassino",
    Fighter: "Lutador",
    Mage: "Mago",
    Marksman: "Atirador",
    Support: "Suporte",
    Tank: "Tanque",
  };


  useEffect(() => {
    const fetchChampData = async () => {
      try {
        const res = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/14.9.1/data/pt_BR/champion/${id}.json`
        );
        const data = await res.json();
        const champData = data.data[id as string] as ChampionData;
        setChamp(champData);

        setSelectedSkill({
          name: champData.passive.name,
          description: champData.passive.description,
          key: "P",
        });

        const favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
        setIsFavorito(favoritos.includes(champData.id));
      } catch (err) {
        console.error("Erro ao buscar detalhes do campeão:", err);
      }
    };

    fetchChampData();
  }, [id]);

  const toggleFavorito = () => {
    if (!champ) return;
    const favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
    let atualizados;
    if (favoritos.includes(champ.id)) {
      atualizados = favoritos.filter((favId: string) => favId !== champ.id);
    } else {
      atualizados = [...favoritos, champ.id];
    }
    localStorage.setItem("favoritos", JSON.stringify(atualizados));
    setIsFavorito(!isFavorito);
  };

  if (!champ) return <p>Carregando...</p>;

  const dificuldade = champ.info.difficulty;
  let dificuldadeTexto = "Fácil";
  if (dificuldade > 1 && dificuldade <= 3) {
    dificuldadeTexto = "Médio";
  } else if (dificuldade > 3) {
    dificuldadeTexto = "Difícil";
  }

  let niveisExibidos;
  if (dificuldade <= 1) {
    niveisExibidos = ["/nivel-claro.png", "/nivel-escuro.png", "/nivel-escuro.png"];
  } else if (dificuldade <= 3) {
    niveisExibidos = ["/nivel-claro.png", "/nivel-claro.png", "/nivel-escuro.png"];
  } else {
    niveisExibidos = ["/nivel-claro.png", "/nivel-claro.png", "/nivel-claro.png"];
  }

  const getVideoUrl = (tecla: "P" | "Q" | "W" | "E" | "R") => {
    const habilidadesCodigos = { P: "P1", Q: "Q1", W: "W1", E: "E1", R: "R1" };
    const formattedKey = champ.key.padStart(4, "0");
    return `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${formattedKey}/ability_${formattedKey}_${habilidadesCodigos[tecla]}.mp4`;
  };

  return (
    <div className="container-app" id="champ-container">
      <div className="align-arrow" id="align-arrow">
        <button id="btn-retroceder" onClick={() => navigate(-1)}>
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

      <div id="aligns-stars">
        <h2 id="campeao-selecionado">{champ.name}</h2>
        <img
          src={isFavorito ? "/Star-yellow.png" : "/Star-white.png"}
          alt="Favoritar"
          onClick={toggleFavorito}
          style={{ cursor: "pointer" }}
        />
      </div>

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
            <p id="funcao">{traducaoFuncoes[champ.tags[0]] || champ.tags[0]}</p>
          </div>
        </div>

        <div id="dificuldade">
          <p id="dificuldade-p1">Dificuldade</p>
          <p id="dificuldade-p2">{dificuldadeTexto}</p>
          <div id="nivel">
            {niveisExibidos.map((img, i) => (
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
          onClick={() =>
            setSelectedSkill({
              name: champ.passive.name,
              description: champ.passive.description,
              key: "P",
            })
          }
          className={selectedSkill?.key === "P" ? "selected" : ""}
        />
        {champ.spells.map((spell, index) => {
          const key = ["Q", "W", "E", "R"][index] as "Q" | "W" | "E" | "R";
          return (
            <img
              key={spell.id}
              src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/spell/${spell.image.full}`}
              alt={spell.name}
              title={spell.name}
              id={`habilidade-${key.toLowerCase()}`}
              onClick={() =>
                setSelectedSkill({
                  name: spell.name,
                  description: spell.description,
                  key,
                })
              }
              className={selectedSkill?.key === key ? "selected" : ""}
            />
          );
        })}
      </div>

      {selectedSkill && (
        <div id="habilidade-desc">
          <h3>{selectedSkill.name}</h3>
          <p dangerouslySetInnerHTML={{ __html: selectedSkill.description }} />

          <div id="video-habilidade">
            <video
              key={selectedSkill.key}
              controls
              autoPlay
              loop
              muted
              onLoadedData={(e) => (e.currentTarget.style.visibility = "visible")}
              style={{ visibility: "hidden", borderRadius: "8px" }}
            >
              <source src={getVideoUrl(selectedSkill.key)} type="video/mp4" />
              Seu navegador não suporta o elemento de vídeo.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

export default Champ;
