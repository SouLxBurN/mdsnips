import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSnippetList, MDSnippet } from '../service/MDApi';

export default function SnippetList() {
    const [snippetList, setSnippetList] = useState<Array<MDSnippet>>([]);

    useEffect(() => {
        async function getWrapper() {
            const list = await getSnippetList();
            setSnippetList(list.length <= 12 ? list.reverse() : list.slice(list.length-12, list.length).reverse());
        }
        getWrapper();
    }, []);

    const snips = snippetList.map((snip: MDSnippet) => {
        return (
            <li className="snippetList__item" key={snip.id}>
                <p className="snippetList__item__title">
                    <Link to={snip.id}>{snip.title}</Link>
                </p>
                <p className="snippetList__item__date">{snip.createDate}</p>
            </li>
        );
    });

    return (
        <ul className="snippetList">
            {snips}
        </ul>
    );
}
