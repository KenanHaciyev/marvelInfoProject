import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {
    const {request, loading, error, clearError} = useHttp()
    const _apiBase = "https://gateway.marvel.com:443/v1/public/characters"
    const _apiKey="apikey=a20386a51b53ad7d37db713c476f2b0d"
    const _baseOffset = 210

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacters)
    }

    const getAllComics = async (offset=0) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics)
    }

    const getComics = async (id) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}/${id}?${_apiKey}`)
        return _transformCharacters(res.data.results[0])
    }

    const _transformCharacters = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 200)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homePage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || "There is no description",
            pageCount: comics.pageCount
                ? `${comics.pageCount} p.`
                : "No information about the number of pages",
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            language: comics.textObjects[0]?.language || "en-us",
            // optional chaining operator
            price: comics.prices[0].price
                ? `${comics.prices[0].price}$`
                : "not available",
        };
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComics}
}

export default useMarvelService
