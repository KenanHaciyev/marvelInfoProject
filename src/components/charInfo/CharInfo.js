import './charInfo.scss';
import { useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import PropTypes from "prop-types"

const CharInfo = (props) => {
    const {loading, error, getCharacter, clearError} = useMarvelService()
    const [char, setChar] = useState(null)

    useEffect(() => {
        updateChar()
    }, [props.charId])


    const updateChar = () => {
        const {charId} = props
        if (!charId) {
            return
        }

            clearError()
            getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const skeleton = char || loading || error ? null : <Skeleton/>
    const spinner = loading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    const content = !(loading || error || !char) ? <View char={char} /> : null
    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {errorMessage}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, thumbnail, wiki, homepage, description, comics} = char
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.length? null : "There is no comics with this character"
                }
                {
                    comics.map((item, i) => {
                        if (i > 9) return
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }


            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;
