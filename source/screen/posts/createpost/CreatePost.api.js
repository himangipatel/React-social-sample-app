import Axios from 'axios';
import { API } from '../../../utils/APIUtils';


export const createPost = async (userID,description, photos) => {
    var data = new FormData();
    data.append('postedBy', userID);
    data.append('description',description)

    photos.forEach((element, i) => {
        const newFile = {
            uri: element,
            name: userID + '.jpg',
            type: 'image/jpg'
        }
        data.append('postImages', newFile)
    });

    const response = await Axios.post(
        API.CREATE_POST,
        data,
    );
    console.log(response);
    return response;
}