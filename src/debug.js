const fetch_rest = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response.json();
    } catch(err) {
        console.error('Error!', err);
        return null;
    }
};

console.log(fetch_rest('https://api.github.com/users/hoxxo'));