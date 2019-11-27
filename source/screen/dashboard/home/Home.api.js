import Axios from 'axios';
import { API } from '../../../utils/APIUtils';

export const getAllPosts = async () => {

    const response = await Axios.get(
        API.GET_ALL_POST
    );
    return response.data;


}