export interface Root {
	success: boolean
	status_code: number
	status_message: string
}

export async function verifTokenApi(tokenKey: string): Promise<Root> {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${tokenKey}`,
		},
	}

	const res = await fetch("https://api.themoviedb.org/3/authentication", options)
	return res.json()

}
