import { useState, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import Cats from "./Cats";

async function getJSON(url) {
    const req = await fetch(url);
    const res = await req.json();
    return res;
}

export default function CatSearch() {
    const [cats, setCats] = useState([]);
    const [options, setOptions] = useState([]);
    const [history, setHistory] = useState([]);
    const [tags, setTags] = useState([]);

    function updateHistory(search_txt) {
        if (!search_txt) return 0;
        if (history.includes(search_txt)) return 0;

        history.unshift(search_txt);
        if (history.length > 5) history.pop();
        localStorage.setItem("cat_search_history", JSON.stringify(history));
        setHistory(history);
        setOptions([...history, ...tags]);
    }

    const cmdRegex = /{\s*cat\s+(\w*)}\s+says\s+(\w*)/i;

    async function searchCats(search_txt) {
        if (!search_txt) return setCats([]);

        if (cmdRegex.test(search_txt)) return cmdCat(search_txt);

        const url = `https://cataas.com/api/cats?tags=${search_txt}&type=sq`;
        setCats(await getJSON(url));
    }

    function cmdCat(search_txt) {
        const params = search_txt.match(cmdRegex);
        const cmdCat = {
            id: "command-cat",
            cmd: `https://cataas.com/cat/${params[1]}/says/${params[2]}?type=sq`,
            tags: [params[1], params[2]],
        };
        setCats([cmdCat]);
    }

    async function getTags() {
        const storedHistory = localStorage.getItem("cat_search_history");
        const history = JSON.parse(storedHistory) || [];
        const tags = await getJSON("https://cataas.com/api/tags");
        const commands = tags.map((tag) => `{cat ${tag}} says Hello`);
        setHistory(history);
        setTags([...tags, ...commands]);
        setOptions([...history, ...tags, ...commands]);
    }

    useEffect(() => getTags(), []);

    const handleEnterKey = (ev) => {
        if (ev.code !== "Enter") return 0;
        const search_txt = ev.target.value;
        document.body.click();
        handleChange([search_txt]);
    };

    const handleChange = (search_txt) => {
        updateHistory(search_txt[0]);
        searchCats(search_txt[0]);
    };

    return (
        <>
            <Typeahead
                id="cat-search"
                onKeyDown={handleEnterKey}
                onChange={handleChange}
                placeholder="search tags: cute, fluffy ... or use command: {cat tag} says Hello"
                options={options}
            />
            <Cats cats={cats} />
        </>
    );
}
