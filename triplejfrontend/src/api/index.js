const API_BASE_ADDRESS = "https://localhost:7216";

export default class Api {

    static getSongs(){
        const uri = API_BASE_ADDRESS + "{userId}/Song"
        return fetch(uri, {
            method: 'GET',
        });
    }

    static postVotes(votes, voter){
        const uri = API_BASE_ADDRESS + "/Vote?voter=" + voter;
        return fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(votes)
        });
    }
}