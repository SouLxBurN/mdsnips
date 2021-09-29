export interface MDSnippet {
    id: string;
    title: string;
    body: string;
    updateKey: string;
    createDate: Date;
}

export interface MDCreateRequest {
    title: string;
    body: string;
}

export interface MDUpdateRequest {
    id: string;
    title: string;
    body: string;
    updateKey: string;
}

const apiHost = process.env.REACT_APP_API_HOSTNAME;
const apiUser = process.env.REACT_APP_API_USER;
const apiPass = process.env.REACT_APP_API_PASS;

/**
 * Make an API call to SouLxSnips API to fetch a Markdown Snippet.
 *
 * @param {string} id
 * @returns {Promise<MDSnippet|null>}
 */
export async function getSnippet(id: string): Promise<MDSnippet | null> {
    try {
        const headers = new Headers();
        headers.append('Authorization', getAuthToken());
        const response = await fetch(`${apiHost}/md/${id}`, {
            headers: headers
        });
        if (response.ok) {
            return response.json();
        } else {
            console.error(response.status, response.statusText);
            // TODO Fix this? Its not always because of auth.
        }
    } catch (err: any) {
        console.log(err.message);
    }
    return null;
}

/**
 * Make an API call to SouLxSnips API to fetch a list of Markdown Snippets.
 *
 * @returns {Promise<Array<MDSnippet>>>}
 */
export async function getSnippetList(): Promise<Array<MDSnippet>> {
    try {
        const headers = new Headers();
        headers.append('Authorization', getAuthToken());
        const response = await fetch(`${apiHost}/md`, {
            headers: headers
        });
        if (response.ok) {
            return response.json();
        } else {
            console.error(response.status, response.statusText);
        }
    } catch (err: any) {
        console.log(err.message);
    }
    return [];
}

/**
 * Make an API call to SouLxSnips API to create a Markdown Snippet.
 *
 * @param {MDCreateRequest} req
 * @returns {Promise<MDSnippet|null>}
 */
export async function createMDSnippet(req: MDCreateRequest): Promise<MDSnippet | null> {
    const payload = {
        title: req.title,
        body: req.body
    };
    try {
        const headers = new Headers();
        headers.append('Authorization', getAuthToken());
        headers.append('Content-Type', 'application/json');

        const response = await fetch(`${apiHost}/md`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            return response.json();
        } else {
            console.error(response.statusText);
        }
    } catch (err: any) {
        console.error(err.message);
    }

    return null;
}

/**
 * Make an API call to SouLxSnips API to update a Markdown Snippet.
 *
 * @param {MDUpdateRequest} req
 * @returns {Promise<MDSnippet|null>}
 */
export async function updateMDSnippet(req: MDUpdateRequest): Promise<MDSnippet | null> {
    const payload = {
        id: req.id,
        title: req.title,
        body: req.body,
        updateKey: req.updateKey
    };
    try {
        const headers = new Headers();
        headers.append('Authorization', getAuthToken());
        headers.append('Content-Type', 'application/json');

        const response = await fetch(`${apiHost}/md`, {
            headers: headers,
            method: 'PATCH',
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            return response.json();
        } else {
            console.error(response.statusText);
        }
    } catch (err: any) {
        console.error(err.message);
    }

    return null;
}

/**
 * Creates Basic Authoization token in Base64.
 */
function getAuthToken() {
    return 'Basic ' + Buffer.from(`${apiUser}:${apiPass}`).toString('base64');
}
