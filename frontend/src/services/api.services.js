import axios from 'axios';

class ApiService {
    constructor() {
        this.api = axios.create();
    }

    getProducts = async () => {
        const {data} = await this.api.get("http://localhost:5000/api/products");
        return data;
    }
}

export default new ApiService();