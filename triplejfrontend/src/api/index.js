const API_BASE_ADDRESS = "https://localhost:7216";

export default class Api {

    static getSongs(userId){
        const uri = API_BASE_ADDRESS + "/Song/" + userId
        return fetch(uri, {
            method: 'GET',
        });
    }

    static getUserVotedSongs(userId){
        const uri = API_BASE_ADDRESS + "/Song/" + userId + "/Votes"
        return fetch(uri, {
            method: 'GET',
        });
    }

    static postVotes(votes, userId){
        const uri = API_BASE_ADDRESS + "/Song/" + userId + "/Vote";
        return fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(votes)
        });
    }

    static validateUser(userId) {
        const uri = API_BASE_ADDRESS + "/User/Validate/" + userId
        return fetch(uri, {
            method: 'GET',
        });
    }
}