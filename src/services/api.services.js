import axios from 'axios';

class ApiService {
    constructor() {
        this.api = axios.create();
    }

    getProducts = async () => {
        const { data } = await this.api.get`${process.env.REACT_APP_PORT}` / api / products;
        return data;
    }
}

export default new ApiService();