export async function fetchData(url, method = 'GET', postData = {}, formData = false) {
    try {
        const requestOptions = {};
        if (formData) {
            // requestOptions.headers = { 'Content-Type': 'multipart/form-data' };
        } else {
            requestOptions.headers = { 'Content-Type': 'application/json' };
        }
        if (typeof window !== 'undefined') {
            let access_token = localStorage.getItem('access_token');
            let user_hash = localStorage.getItem('user_hash');
            if (access_token && user_hash) {
                requestOptions.headers['access_token'] = JSON.parse(access_token);
                requestOptions.headers['user_hash'] = JSON.parse(user_hash);
            }
        }
        requestOptions.method = method;
        if (method === 'POST') {
            if (formData) {
                requestOptions.body = postData;
            } else {
                requestOptions.body = JSON.stringify(postData);
            }
        }
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            const data = await response.json();
            if (data && data?.error) {
                return { status: 'failed', data: data.error };
            } else {
                return { status: 'failed', data: null };
            }
        }
        if (response.headers.get('access_token') && response.headers.get('user_hash') && typeof window !== 'undefined') {
            localStorage.setItem('access_token', JSON.stringify(response.headers.get('access_token')))
            localStorage.setItem('user_hash', JSON.stringify(response.headers.get('user_hash')))
        }
        const data = await response.json();
        return { status: 'success', data: data?.data ? data.data : [] };
    } catch (error) {
        return { status: 'failed', data: null };
    }
}
