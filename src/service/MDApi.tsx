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

export interface MDDeleteRequest {
    id: string;
    updateKey: string;
}

export interface MDSearchParams {
    text?: string;
    limit?: number;
    skip?: number;
    sort?: MDSortBy;
}

export enum MDSortBy {
    CREATEDATE_DESC = 'createDate_DESC',
    CREATEDATE_ASC = 'createDate_ASC'
}

const apiHost = process.env.REACT_APP_API_HOSTNAME;
const apiUser = process.env.REACT_APP_API_USER;
const apiPass = process.env.REACT_APP_API_PASS;

/**
 * Make an API call to MDSnips API to fetch a Markdown Snippet.
 *
 * @param {string} id
 * @returns {Promise<MDSnippet>}
 */
export async function getSnippet(id: string): Promise<MDSnippet> {
    const headers = new Headers();
    headers.append('Authorization', getAuthToken());
    const response = await fetch(`${apiHost}/md/${id}`, {
        headers: headers
    });
    if (response.ok) {
        return response.json();
    }

    throw new Error(`${response.status}: ${response.statusText}`);
}

/**
 * Make an API call to MDSnips API to fetch a list of Markdown Snippets.
 * @param {MDSearchParams} searchParams
 * @returns {Promise<Array<MDSnippet>>>}
 */
export async function getSnippetList(searchParams: MDSearchParams): Promise<Array<MDSnippet>> {
    const {text, limit=10, skip=0, sort=MDSortBy.CREATEDATE_DESC} = searchParams;

    try {
        let queryParams = `?sort=${sort}`;
        queryParams += `&limit=${limit}`;

        if (text) {
            queryParams += `&text=${text}`;
        }
        if (skip) {
            queryParams += `&skip=${skip}`;
        }

        const headers = new Headers();
        headers.append('Authorization', getAuthToken());
        const response = await fetch(`${apiHost}/md/search${queryParams}`, {
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
 * Make an API call to MDSnips API to create a Markdown Snippet.
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
 * Make an API call to MDSnips API to update a Markdown Snippet.
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
    }

    console.error(response.statusText);
    throw Error(await response.text());
}


/**
 * Make an API call to MDSnips API to delete a Markdown Snippet.
 *
 * @param {MDDeleteRequest} req
 * @returns {Promise<boolean>}
 */
export async function deleteMDSnippet(req: MDDeleteRequest): Promise<boolean> {
    const payload = {
        updateKey: req.updateKey
    };
    const headers = new Headers();
    headers.append('Authorization', getAuthToken());
    headers.append('Content-Type', 'application/json');

    const response = await fetch(`${apiHost}/md/${req.id}`, {
        headers: headers,
        method: 'DELETE',
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        return true;
    }

    throw new Error(`${response.status}: ${response.statusText}`);
}

/**
 * Creates Basic Authoization token in Base64.
 */
function getAuthToken() {
    return 'Basic ' + Buffer.from(`${apiUser}:${apiPass}`).toString('base64');
}
