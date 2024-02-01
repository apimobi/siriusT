const BASE_API_URL = 'http://localhost:8080/';


export default class ApiClient {
    base_url: string;
    auth_required: string[] = [
      'users/me',
      'users/me/boats',
      'boats',
      'users/me/coboatings',
      'boat-models/search/',
      'coboatings/search/',
      'coboatings',
      'coboatings/',
    ];

    constructor() {
        this.base_url =  BASE_API_URL;
    }

    async request(options:{query:string, url:string, headers:object, body:object, method:string}) {
        let query = '';
        if(options.url == "boat-models/search/" || options.url == "coboatings/search/" || options.url == "coboatings/") {
            query = options.query;
        } else {
            query = new URLSearchParams(options.query || {}).toString();
        
            if (query !== '') {
                query = '?' + query;
            }
        }

        let response;
        try {

            const headers:any = {
              'Content-Type': 'application/json',
              ...options.headers,
            };

            if(
                this.auth_required.includes(options.url)
                || options.url == "boat-models/search/" 
                || options.url == "coboatings/search/"
                || options.url == "coboatings/"
            ) {
                headers['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken');
            }

            response = await fetch(this.base_url + options.url + query, {
            method: options.method,
            headers: headers,
            body: options.body ? JSON.stringify(options.body) : null,
            });
        }
        catch (error: any) {
            response = {
            ok: false,
            status: 500,
            json: async () => { return {
                code: 500,
                message: 'The server is unresponsive',
                description: error.toString(),
            }; }
            };
        }

        return {
            ok: response.ok,
            status: response.status,
            body: response.status !== 204 ? await response.json() : null
        };
    }

    async get(url:string, query:string|null, options:any|null) {
        return this.request({method: 'GET', url, query, ...options});
    }

    async post(url:string, query:string, body:object, options:any) {
        return this.request({query:query, method: 'POST', url, body, ...options});
    }

    async put(url:string, query:string, body:object, options:any) {
        return this.request({query:query, method: 'PUT', url, body, ...options});
    }

    async delete(url:string, options:any) {
        return this.request({query:'', method: 'DELETE', url, ...options});
    }

    public async login(username:string, password:string) {

        let formData = new FormData();
        formData.append('username', username);   //append the values with key, value pair
        formData.append('password', password);
        formData.append('grant_type: ', "");
        formData.append('scope: ', "");
        formData.append('client_id: ', "");
        formData.append('client_secret: ', "");

        const response = await this.apiLogin(formData);
        if (response.status == 200) {
            localStorage.setItem('accessToken', response.body.access_token);
            // localStorage.setItem('refreshToken', response.body.refreshToken);
        }
        return response;
    }

    async apiLogin(body:any) {
        let response;
        try {
            response = await fetch(this.base_url + 'oauth/token', {
                method: 'POST',
                body: body,
            });
        }
        catch (error: any) {
            response = {
            ok: false,
            status: 500,
            json: async () => { return {
                code: 500,
                message: 'The server is unresponsive',
                description: error.toString(),
            }; }
            };
        }

        if (response.status == 200) {
            localStorage.setItem('accessToken', (response?.body as any)?.access_token);
            // localStorage.setItem('refreshToken', response.body.refreshToken);
        }

        return {
            ok: response.ok,
            status: response.status,
            body: response.status !== 204 ? await response.json() : null
        };
    }

    async logout() {
        await this.delete('/tokens', {});
        localStorage.removeItem('accessToken');
    }

    public isAuthenticated() {
        return localStorage.getItem('accessToken') !== null;
    }
}