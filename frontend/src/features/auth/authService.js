import axios from 'axios';

const API_URL = '/api/v1/users/register'

const register = async (userData)=>{
    const response = await axios.post(API_URL, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;

};

const logout = ()=>{
    localStorage.clear('user');
};


const authService = {
    register,
    logout
};

export default authService;