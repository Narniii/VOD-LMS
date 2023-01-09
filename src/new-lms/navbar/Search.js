import { useRef } from "react"
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import API from "../../utils/api"
import { PUBLIC_URL } from "../../utils/utils"
import '../style/home.css'




const Search = () => {
    const [value, setValue] = useState(undefined)
    const history = useHistory();

    const getSearchResults = () => {
        history.push(`/search/${value}`)
    }

    return (
        <div className={'searchInputWrapper'}>
            <input className={'searchInput'} value={value} onChange={e => setValue(e.target.value)} />
            {/* <Image width={20} height={20} layout='fixed' src='/svg/search.svg' /> */}
            <img src={PUBLIC_URL('svg/search.svg')} style={{ width: '20px', height: '40px', cursor: "pointer" }} onClick={getSearchResults} />
        </div>
    );
}

export default Search;

