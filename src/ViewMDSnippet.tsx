import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Page from './components/Page';
import MDEditor from '@uiw/react-md-editor';
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
    const [title, setTitle] = useState('Greetings Stranger!');
    const [content, setContent] = useState('I\'m not surprized to see your kind here.');

    let initBanner = '';
    if (updateKey) {
        initBanner = `Keep this to edit your snippet: ${updateKey}`;
    }
    const [bannerMessage, setBannerMessage] = useState(initBanner);

    useEffect(() => {
        async function getWrapper(id: string) {
            try {
                const snippet = await getSnippet(id);
                if (snippet != null) {
                    setTitle(snippet.title);
                    setContent(snippet.body);
                }
            } catch (err: any) {
                onFailure('We\'re Sorry, we are unable to load this snippet at this time.');
                console.log(err.message);
            }
        }
        getWrapper(id);
    }, [id]);


    /**
     * onBannerClose
     * onClick handler for when a user closes the banner.
     */
    function onBannerClose() {
        setBannerMessage('');
    }

    /**
     * onFailure
     * Handler function when a submission fails.
     *
     * @param {string} errorMessage
     */
    function onFailure(errorMessage: string) {
        setBannerMessage(errorMessage);
    }

    return (
        <Page bannerMessage={bannerMessage} bannerColor="#a3be8c" onBannerClose={() => onBannerClose}>
            <div className="viewMDSnippet">
                <h1 className="mdTitle">{title}</h1>
                <hr />
                <MDEditor.Markdown source={content} />
            </div>
        </Page>
    );
}
