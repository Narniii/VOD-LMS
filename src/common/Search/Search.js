import { string } from "prop-types"
import { useState, useEffect } from "react"






const Search = ({ data, setResults }) => { //-- q is the value of a key inside the data object

    const [value, setValue] = useState(undefined)

    // const handleSearch = (event) => {
    useEffect(() => {
        // event.preventDefault();
        // setValue(event.target.value);
        var resultss = []
        if (value != undefined) {
            if (value != "") {
                for (var d = 0; d < data.length; d++) {
                    for (const key in data[d]) {
                        var _value = data[d][key]
                        if (_value != null) {
                            if (typeof _value != string) {
                                _value = _value.toString()
                            }
                            if (_value.includes(value)) {
                                if (!resultss.includes(data[d])) {
                                    resultss.push(data[d])
                                    console.log(resultss)

                                }
                            }
                        }
                    }
                }
                setResults(resultss)
                console.log(resultss)

            } else {
                setResults([])
            }
        }
    }, [value])
    return (
        <div >
            <input value={value} placeholder="search..." onChange={e => setValue(e.target.value)} />
        </div>
    );
}

export default Search;

