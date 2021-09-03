import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import CreateMDSnippet from './CreateMDSnippet'
import ViewMDSnippet from './ViewMDSnippet'

export default function App() {
    return (
        <Router>
            <Switch>
                {/* <Route path='/:id/:token'> */}
                {/*     <UpdateMDSnippet /> */}
                {/* </Route> */}
                <Route path='/:id'>
                    <ViewMDSnippet />
                </Route>
                <Route path='/'>
                    <CreateMDSnippet />
                </Route>
            </Switch>
        </Router>
    );
}
