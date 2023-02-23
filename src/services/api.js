import axios from "axios";


//url da api https://api.themoviedb.org/3/movie/550?api_key=ac9fc5dd3082e655d1dcf6cc361b8f26&language=pt-BR

//base da url: https://api.themoviedb.org/3/

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api