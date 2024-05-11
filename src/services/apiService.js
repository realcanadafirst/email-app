export async function fetchData(url, method = 'GET', postData = {}, formData = false) {
    try {
        const requestOptions = {};
        if (formData) {
           // requestOptions.headers = { 'Content-Type': 'multipart/form-data' };
        } else{
            requestOptions.headers = { 'Content-Type': 'application/json' };
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
            return { status: 'failed', data: null };
        }
        const data = await response.json();
        return { status: 'success', data: data?.data ? data.data : [] };
    } catch (error) {
        return { status: 'failed', data: null };
    }
}
