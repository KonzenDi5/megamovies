import { useEffect, useState } from "react"
import api from '../../services/api'
import {Link} from 'react-router-dom'
import './home.css'
// https://api.themoviedb.org/3/movie/now_playing?api_key=ac9fc5dd3082e655d1dcf6cc361b8f26&language=pt-BR

function Home(){
    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        async function loadFilmes(){
            const response = await api.get('movie/now_playing', {
                params:{
                    api_key: 'ac9fc5dd3082e655d1dcf6cc361b8f26',
                    language: 'pt-BR',
                    page: 1,
                }
            })
            //console.log(response.data.results.slice(0, 10))
            setFilmes(response.data.results.slice(0, 10))
            setLoading(false)
        }
        loadFilmes()
    }, [])
    if(loading){
        return(
            <h2 className="loading">Carregando filmes...</h2>
        )
    }

    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) =>{
                    return(
                        <article key={filme.id}>
                        <strong>{filme.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} />
                        <Link to={`/filme/${filme.id}`}>ACESSAR</Link>
                        </article>
                    )
                })}
            </div>
           
        </div>
    )
}
export default Home