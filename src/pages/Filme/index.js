import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./filme.css";

import api from "../../services/api";
import { toast } from 'react-toastify'


function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "ac9fc5dd3082e655d1dcf6cc361b8f26",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("FILME NÃO ENCONTRADO");
          navigate("/", { replace: true });
          return;
        });
    }
    loadFilme();

    return () => {};
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@megamovie");
    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === filme.id);

    if (hasFilme) {
     toast.warn('Esse filme já está na sua lista!')
      return;
    }
    filmesSalvos.push(filme);
    localStorage.setItem("@megamovie", JSON.stringify(filmesSalvos));
    toast.success('Filme salvo com sucesso!')
  }

  if (loading) {
    return (
      <div>
        <h1>Carregando filme...</h1>
      </div>
    );
  }
  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />

      <h3>Sinopse:</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target="_blank"
            href={`https://youtube.com/results?search_query=${filme.title} trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}
export default Filme;
