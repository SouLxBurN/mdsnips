import { useHistory, useParams } from 'react-router-dom';
import { MDSnippet } from './service/MDApi';
import UpdateMDForm from './components/UpdateMDForm';
import Header from './components/Header';
import Footer from './components/Footer';
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
        <div className="appContainer">
            <Header/>
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
            <Footer/>
        </div>
    );
}
