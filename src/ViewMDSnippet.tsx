import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import Banner from './components/Banner';
import { getSnippet } from './service/MDApi';
import './ViewMDSnippet.css';
import './MDEditor.css';

interface ViewMDSnippetParams {
    id: string
}

interface ViewLocState {
    updateKey: string
}

export default function ViewMDSnippet() {
    const updateKey = useLocation<ViewLocState>().state?.updateKey;
    const { id } = useParams<ViewMDSnippetParams>();
    const [title, setTitle] = useState('loading...');
    const [content, setContent] = useState('loading...');
    const [renderBanner, setRenderBanner] = useState(true);

    const displayBanner = renderBanner && updateKey !== undefined;

    useEffect(() => {
        async function getWrapper(id: string) {
            const snippet = await getSnippet(id);
            setTitle(snippet!.title);
            setContent(snippet!.body);
        }
        getWrapper(id);
    }, [id]);

    function onBannerClose() {
        setRenderBanner(false);
    }

    return (
        <div className="viewMDSnippet">
            {displayBanner && <Banner message={`Keep this to edit your snippet: ${updateKey}`} color="green" onClose={onBannerClose}/>}
            <h1>{title}</h1>
            <hr />
            <MDEditor.Markdown source={content} />
        </div>
    );
}
