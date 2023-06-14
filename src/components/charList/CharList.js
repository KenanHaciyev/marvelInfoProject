import './charList.scss';
import useMarvelService from "../../services/MarvelService";
import {useEffect, useRef, useState} from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import PropTypes from "prop-types"

const CharList = (props) => {
    const {loading, error, getAllCharacters} = useMarvelService()
    const [charList, setCharList] = useState([])
    const [newItemsLoading, setNewItemsLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false
        if (newCharList < 9) {
            ended=true
        }

        setCharList(charList => [...charList, ...newCharList])
        setNewItemsLoading( false)
        setOffset(offset => offset + 9)
        setCharEnded( ended)
    }

    const itemsRef = useRef([])

    const focusRef = (id) => {
        itemsRef.current.forEach(item => item.classList.remove("char__item_selected"))
        itemsRef.current[id].classList.add("char__item_selected")
        itemsRef.current[id].focus()
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {"objectFit" : "cover"}
            if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {"objectFit" : "unset"}
            }

            return (
                <li className="char__item"
                    key={item.id}
                    ref={el => itemsRef.current[i] = el}
                    onClick={() => {
                        props.onCharSelected(item.id)
                        focusRef(i)
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name" >{item.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid" >
                {items}
            </ul>
        )
    }

    const items = renderItems(charList)
    const spinner = loading && !newItemsLoading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    return (
        <div className="char__list" >
            {spinner}
            {errorMessage}
            {items}
            <button
                className="button button__main button__long"
                disabled={newItemsLoading}
                style={{"display": charEnded ? "none" : "block"}}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;
