import {  useHistory } from 'react-router-dom';
import { MDSnippet } from './service/MDApi';
import CreateMDForm from './components/CreateMDForm';
import Header from './components/Header';
import Footer from './components/Footer';
import SnippetList from './components/SnippetList';
import './CreateMDSnippet.css';
import './MDEditor.css';

export default function CreateMDSnippet() {
    const history = useHistory();

    function onSuccess(snippet: MDSnippet) {
        history.push({
            pathname: `/${snippet.id}`,
            state: {
                updateKey: snippet.updateKey
            }
        });
    }

    return (
        <div>
            <Header/>
            <div className="content">
                <div className="content__main">
                    <CreateMDForm
                        onSuccess={(snippet) => onSuccess(snippet)}
                        onFailure={(error) => console.log(error)}/>
                </div>
                <div className="content__sidebar">
                    <p className="content__sidebar__title">Recent Snips</p>
                    <hr/>
                    <SnippetList/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
