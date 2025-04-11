// utils/submitForm.ts
export async function submitForm(url: string, data: FormData, csrfToken: string) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken, // Add CSRF token header
                'Accept': 'application/json', // Optional: set the expected response type
            },
            body: data,
        });

        if (!response.ok) {
            throw new Error(`Failed to submit to ${url}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Form submission error:', error);
        throw error;
    }
}
