class MarvelService{
    _apiBase = "https://gateway.marvel.com:443/v1/public/characters"
    _apiKey="apikey=a20386a51b53ad7d37db713c476f2b0d"
    getResource = async (url) => {
        const res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, error status is: ${res.status}`)
        }

        return await res.json()
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}?limit=9&offset=210&${this._apiKey}`)
        return res.data.results.map(this._transformCharacters)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/${id}?${this._apiKey}`)
        return this._transformCharacters(res.data.results[0])
    }

    _transformCharacters = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 200)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homePage: char.urls[0].url,
            wiki: char.urls[1].url,
        }
    }
}

export default MarvelService
