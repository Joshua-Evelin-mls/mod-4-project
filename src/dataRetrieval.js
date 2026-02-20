export const fetchCatFacts = async () => {
    try {
    const response = await fetch('https://meowfacts.herokuapp.com/')
        if (!response.ok) {
            throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
        }
            const responseData = await response.json();

            return { data: responseData, error: null};
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        return{ data: null, error: error };
    }
}