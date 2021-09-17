import { useHistory, useParams } from 'react-router-dom';
import { MDSnippet } from './service/MDApi';
import UpdateMDForm from './components/UpdateMDForm';
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
        <div className="createMDSnippet">
            <h1>SouLxSnips</h1>
            <UpdateMDForm
                id={id}
                onSuccess={(snippet) => onSuccess(snippet)}
                onFailure={(error) => console.log(error)}
            />
        </div>
    );
}
