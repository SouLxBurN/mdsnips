export interface MDSnippet {
    id: string,
    title: string,
    body: string,
    updateKey: string,
    createDate: Date
}

export interface MDCreateRequest {
    title: string,
    body: string
}

export interface MDUpdateRequest {
    id: string,
    title: string,
    body: string,
    updateKey: string
}

/**
 * Make an API call to SouLxSnips API to fetch a Markdown Snippet.
 *
 * @param {string} id
 * @returns {Promise<MDSnippet|null>}
 */
export async function getSnippet(id: string): Promise<MDSnippet|null> {
    try {
        const headers = new Headers();
        headers.append(
            'Authorization',
            'Basic ' + Buffer.from('soul:burn').toString('base64')
        );
        const response = await fetch(`http://localhost:3001/md/${id}`, {
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
 * Make an API call to SouLxSnips API to create a Markdown Snippet.
 *
 * @param {MDCreateRequest} req
 * @returns {Promise<MDSnippet|null>}
 */
export async function createMDSnippet(req: MDCreateRequest): Promise<MDSnippet|null> {
    const payload = {
        title: req.title,
        body: req.body
    };
    try {
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + Buffer.from('soul:burn').toString('base64'));
        headers.append('Content-Type', 'application/json');

        const response = await fetch(`http://localhost:3001/md`, {
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
export async function updateMDSnippet(req: MDUpdateRequest): Promise<MDSnippet|null> {
    const payload = {
        id: req.id,
        title: req.title,
        body: req.body,
        updateKey: req.updateKey
    };
    try {
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + Buffer.from('soul:burn').toString('base64'));
        headers.append('Content-Type', 'application/json');

        const response = await fetch(`http://localhost:3001/md`, {
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
