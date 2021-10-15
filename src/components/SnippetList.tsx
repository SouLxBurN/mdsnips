import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSnippetList, MDSnippet, MDSortBy } from '../service/MDApi';

export default function SnippetList() {
    const [snippetList, setSnippetList] = useState<Array<MDSnippet>>([]);


    useEffect(() => {
        async function getWrapper() {
            const list = await getSnippetList({limit: 12, sort: MDSortBy.CREATEDATE_DESC});
            setSnippetList(list);
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
