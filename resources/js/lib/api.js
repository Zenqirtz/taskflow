/**
 * Fetch wrapper that attaches the auth token and JSON headers.
 *
 * @param {string} url
 * @param {object} options
 * @returns {Promise<Response>}
 */
export async function apiFetch(url, options = {}) {
    const token = localStorage.getItem('token');

    const headers = {
        'Accept': 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...(options.headers || {}),
    };

    return fetch(url, { ...options, headers });
}

/**
 * Parse a response, throwing on non-2xx.
 *
 * @param {Response} response
 * @returns {Promise<any>}
 */
async function parse(response) {
    if (response.status === 204) {
        return null;
    }

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}

/** @returns {Promise<Array>} */
export async function getTasks() {
    const response = await apiFetch('/api/tasks');

    return parse(response).then((data) => data.data ?? data);
}

/** @returns {Promise<Array>} */
export async function getCategories() {
    const response = await apiFetch('/api/categories');

    return parse(response).then((data) => data.data ?? data);
}

/**
 * @param {object} payload
 * @returns {Promise<object>}
 */
export async function createTask(payload) {
    const response = await apiFetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(payload),
    });

    return parse(response).then((data) => data.data ?? data);
}

/**
 * @param {number} id
 * @param {object} payload
 * @returns {Promise<object>}
 */
export async function updateTask(id, payload) {
    const response = await apiFetch(`/api/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    });

    return parse(response).then((data) => data.data ?? data);
}

/**
 * @param {number} id
 * @returns {Promise<null>}
 */
export async function deleteTask(id) {
    const response = await apiFetch(`/api/tasks/${id}`, { method: 'DELETE' });

    return parse(response);
}
