import {useEffect, useState} from 'react';
import './tagInput.css'

export const TagInput = (props) => {
    const [input, setInput] = useState('');
    const [tags, setTags] = useState(props.defaultValue);
    const [isKeyReleased, setIsKeyReleased] = useState(false);

    useEffect(() => {
        setTags(props.defaultValue)
    }, [props.defaultValue]);

    useEffect(() => {
        props.onChange({ target: { name: props.name, value: tags }})
    }, [tags]);

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    const onKeyDown = (e) => {
        const { key } = e;
        const trimmedInput = input.trim();

        if (key === 'Enter' && trimmedInput.length && !tags.includes(trimmedInput)) {
            e.preventDefault();
            setTags(prevState => [...prevState, trimmedInput]);
            setInput('');
        }

        if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop();
            e.preventDefault();
            setTags(tagsCopy);
            setInput(poppedTag);
        }

        setIsKeyReleased(false);
    };

    const onKeyUp = () => {
        setIsKeyReleased(true);
    }

    const deleteTag = (index) => {
        setTags(prevState => prevState.filter((tag, i) => i !== index))
    }

    return (<div className="container">
        {tags.map((tag, index) => (
            <div className="tag" key={index}>
                {tag}
                <button onClick={() => deleteTag(index)}>x</button>
            </div>
        ))}
        <input
            value={input}
            placeholder="Enter a tag"
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onChange={onChange}
        />
    </div>)
};
