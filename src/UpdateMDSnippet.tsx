import { useState } from 'react';
import { useHistory, useParams} from 'react-router-dom';
import Page from './components/Page';
import { MDSnippet } from './service/MDApi';
import UpdateMDForm from './components/UpdateMDForm';
import SnippetList from './components/SnippetList';
import './index.css';
import './MDEditor.css';
import './CreateMDSnippet.css';

interface UpdateMDSnippetParams {
    id: string;
}
export default function UpdateMDSnippet() {
    const { id } = useParams<UpdateMDSnippetParams>();
    const [bannerMessage, setBannerMessage] = useState('');
    const history = useHistory();

    function onSuccess(snippet: MDSnippet) {
        history.push({
            pathname: `/${snippet.id}`
        });
    }

    /**
     * onFailure
     * Handler function when a submission fails.
     *
     * @param {string} errorMessage
     */
    function onFailure(errorMessage: string) {
        setBannerMessage(errorMessage);
        console.log(errorMessage)
    }

    function onDelete() {
        history.push({
            pathname: '/'
        });
    }

    /**
     * onBannerClose
     * onClick handler for when a user closes the banner.
     */
    function onBannerClose() {
        setBannerMessage('');
    }

    return (
        <Page bannerMessage={bannerMessage} bannerColor='#bf616a' onBannerClose={() => onBannerClose}>
            <div className="snipContent">
                <div className="snipContent__main">
                <UpdateMDForm
                    id={id}
                    onSaveSuccess={(snippet: MDSnippet) => onSuccess(snippet)}
                    onError={(error: Error) => onFailure(error.message)}
                    onDelete={() => onDelete()}
                />
                </div>
                <div className="snipContent__sidebar">
                    <p className="snipContent__sidebar__title">Recent Snips</p>
                    <hr/>
                    <SnippetList/>
                </div>
            </div>
        </Page>
    );
}
