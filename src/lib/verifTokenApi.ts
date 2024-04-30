export interface Root {
	success: boolean
	status_code: number
	status_message: string
}

export async function createReqToken(tokenKey: string): Promise<Root> {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${tokenKey}`,
		},
	}

	const res = await fetch("https://api.themoviedb.org/3/authentication/token/new", options)
	return res.json()

}

export function redirectToAuthorization(requestToken: string) {
    const redirectUrl = encodeURIComponent('http://localhost:5173'); // Your redirect URL after approval
    window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${redirectUrl}`;
}


export async function createSessionId(requestToken: string, apiKey: string): Promise<string> {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ request_token: requestToken })
    };

    // Inclure l'API Key directement dans l'URL de la requête
    const url = `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`;
   
    const response = await fetch(url, options);

    const data = await response.json();
	
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return data.session_id; //
}

export async function getDetailsAcount(sessionId:string,apiKey:string) {

	const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
       
    };
  
	const url = `https://api.themoviedb.org/3/account?session_id=${sessionId}&api_key=${apiKey}`;

	const response = await fetch(url, options);

    const data = await response.json();
	
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return data; 
}



