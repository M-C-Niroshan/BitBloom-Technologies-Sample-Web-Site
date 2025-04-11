export async function fetchData(url: string) {
    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch from ${url}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Data fetch error:', error);
        throw error;
    }
}
