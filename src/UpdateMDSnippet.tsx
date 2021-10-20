import { useHistory, useParams } from 'react-router-dom';
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
    const history = useHistory();

    function onSuccess(snippet: MDSnippet) {
        history.push({
            pathname: `/${snippet.id}`
        });
    }
    return (
        <Page>
            <div className="snipContent">
                <div className="snipContent__main">
                <UpdateMDForm
                    id={id}
                    onSuccess={(snippet) => onSuccess(snippet)}
                    onFailure={(error) => console.log(error)}
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
