import {useEffect, useState, useRef} from 'react';
import isDeepEqual from 'fast-deep-equal/react'
import './searchInput.css'

export const SearchInput = ({ id, name, placeholder, multiple, defaultValue, onChange, searchApi }) => {
    const [input, setInput] = useState('');
    const [selectedValues, setSelectedValues] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const defaultValueRef = useRef(defaultValue)

    if (!isDeepEqual(defaultValueRef.current, defaultValue)) {
        defaultValueRef.current = defaultValue
    }

    useEffect(async () => {
        if (!!input) {
            await triggerSearch(input)
        }
    }, [input])

    useEffect(() => {
        if (!multiple) {
            if (!defaultValue.id) return false;
            setSelectedValues([defaultValue])
        } else {
            setSelectedValues(defaultValue)
        }
    }, [defaultValueRef.current]);

    useEffect(() => {
        if (!selectedValues.length) return false;

        if (!multiple) {
            onChange({ target: { name, value: selectedValues[0].name }})
            onChange({ target: { id, value: selectedValues[0].id }})
        } else {
            onChange({ target: { name, value: selectedValues.map(({name}) => (name))}})
            onChange({ target: { id, value: selectedValues.map(({id}) => (id))}})
        }
    }, [selectedValues]);

    const handleInput = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    const onfocus = () => {
        setSearchResults([]);
    }

    const triggerSearch = async (name) => {
        const { data: { success, data } } = await searchApi(name);
        setSearchResults(data);
    }

    const pushToValues = (value) => {

        if (!multiple) {
            setSelectedValues([]);
            setSearchResults([]);
        }

        setSelectedValues([...selectedValues, value])
        setInput('');
    }

    const deleteValue = (index) => {
        setSelectedValues(prevState => prevState.filter((value, i) => i !== index))
    }

    return (<div className='container'>
        <div className='values'>
            {selectedValues.map((value, index) => (<div key={index}>
                {value.name}
                <button onClick={() => deleteValue(index)}>x</button>
            </div>))}
        </div>
        <input
            value={input}
            placeholder={placeholder}
            onChange={handleInput}
            onFocus={onfocus}
        />
        <div className='searchOutput'>
            {searchResults.map((result, index) => (
                <div key={index} className="result" key={index} onClick={() => pushToValues(result)}>
                    {result.name}
                </div>
            ))}
        </div>
    </div>)
};
