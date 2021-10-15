import { useState } from 'react';
import {  useHistory } from 'react-router-dom';
import { MDSnippet } from './service/MDApi';
import CreateMDForm from './components/CreateMDForm';
import Page from './components/Page';
import SnippetList from './components/SnippetList';

import './CreateMDSnippet.css';
import './MDEditor.css';

export default function CreateMDSnippet() {
    const [bannerMessage, setBannerMessage] = useState('');
    const history = useHistory();

    function onSuccess(snippet: MDSnippet) {
        history.push({
            pathname: `/${snippet.id}`,
            state: {
                updateKey: snippet.updateKey
            }
        });
    }

    function onBannerClose() {
        setBannerMessage('');
        console.log('Closing Banner');
    }

    function onFailure(errorMessage: string) {
        setBannerMessage(errorMessage);
        console.log(errorMessage)
    }

    return (
        <Page bannerMessage={bannerMessage} bannerColor='#bf616a' onBannerClose={() => onBannerClose}>
            <div className="snipContent">
                <div className="snipContent__main">
                    <CreateMDForm
                        onSuccess={(snippet: MDSnippet) => onSuccess(snippet)}
                        onFailure={(error: Error) => onFailure(error.message)}/>
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
