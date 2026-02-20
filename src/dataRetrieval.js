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

export const fetchCatImgs = async () => {
    let data = null;
    let error = null;
    try {
        const init = await fetch('https://api.thecatapi.com/v1/images/search?limit=10')
        if (init.ok) {
            data = await init.json()
        } else {
            console.log('error: ', init.status, init.statusText)
            error = init.status + ':' + init.statusText
        }
    }
    catch (err) {
        console.log('oops something went wrong')
        error=err
    }
    return { data, error }
}
