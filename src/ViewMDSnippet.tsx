import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import Banner from './components/Banner';
import { getSnippet } from './service/MDApi';
import './ViewMDSnippet.css';
import './MDEditor.css';
import Footer from './components/Footer';
import Header from './components/Header';

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
        <div className="appContainer">
            <Header/>
            {displayBanner && <Banner message={`Keep this to edit your snippet: ${updateKey}`} color="#a3be8c" onClose={onBannerClose}/>}
            <div className="viewMDSnippet">
                <h1 className="mdTitle">{title}</h1>
                <hr />
                <MDEditor.Markdown source={content} />
            </div>
            <Footer/>
        </div>
    );
}
