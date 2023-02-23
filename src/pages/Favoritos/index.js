import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'

import "./favoritos.css";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@megamovie");
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  function excluirItem(id){
    let filtroFilmes = filmes.filter((item) =>{
        return(item.id !== id)
    } )

    setFilmes(filtroFilmes)
    localStorage.setItem('@megamovie', JSON.stringify(filtroFilmes))
    toast.success('Filme removido com sucesso!')
  }
  
  return (
    <div className="meus-filmes">
      <h1>Meus filmes prediletos:</h1>

      {filmes.length === 0 && <span>Você não possuí nenhum filme salvo!</span>}
      <ul>
        {filmes.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
              <div>
                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                <button onClick={() => excluirItem(item.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Favoritos;
