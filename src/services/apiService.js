export async function fetchData(url, method = 'GET', postData = {}, formData = false) {
    try {
        const requestOptions = {};
        if (formData) {
           // requestOptions.headers = { 'Content-Type': 'multipart/form-data' };
        } else{
            requestOptions.headers = { 'Content-Type': 'application/json'};
        }
        if (typeof window === 'undefined') {
            let userdata = localStorage.getItem('userdata');
            if(userdata){
                userdata = JSON.parse(userdata);
                requestOptions.headers['access-token'] = userdata['access_token'];
                requestOptions.headers['userhash'] = userdata['userhash'];
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
            if(data && data?.error){
                return { status: 'failed', data: data.error };
            } else {
                return { status: 'failed', data: null };
            }
        }
        const data = await response.json();
        return { status: 'success', data: data?.data ? data.data : [] };
    } catch (error) {
        return { status: 'failed', data: null };
    }
}
