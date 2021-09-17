import { useHistory } from 'react-router-dom';
import { MDSnippet } from './service/MDApi';
import CreateMDForm from './components/CreateMDForm';
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
        <div className="createMDSnippet">
            <h1>SouLxSnips</h1>
            <CreateMDForm
                onSuccess={(snippet) => onSuccess(snippet)}
                onFailure={(error) => console.log(error)}/>
        </div>
    );
}
