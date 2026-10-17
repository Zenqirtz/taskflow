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
