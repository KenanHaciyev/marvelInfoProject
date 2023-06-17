import './singleComicPage.scss';
import xMen from '../../resources/img/x-men.png';
import {Link, useParams} from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const SingleComicPage = () => {
    const {comicId} = useParams()
    const [comic, setComic] = useState("")
    const {loading, clearError, getComics, error} = useMarvelService()

    useEffect(() => {
        onUpdate()
    },[comicId])

    const onUpdate = () => {
        clearError()
        getComics(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    const spinner = loading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null

    return (
       <>
           {spinner}
           {errorMessage}
           {content}
       </>
    )
}

const View = ({comic}) => {
    const { title, description, pageCount, thumbnail, language, price} = comic

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>

    )
}

export default SingleComicPage;
