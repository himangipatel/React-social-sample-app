import Axios from 'axios';
import { API } from '../../../utils/APIUtils';
import { storeUserInfor } from '../../../utils/AsyncUtil';

 
 export const addCoverImage = async(userID, uri) => {
    var data = new FormData();
    data.append('userID', userID);

    data.append('userCoverPhoto', {
        uri: uri,
        name: userID + '.jpg',
        type: 'image/jpg',
    });

    const response = await Axios.post(
        API.UPLOAD_COVER_IMAGE,
        data,
    );
    console.log(response);
    await storeUserInfor(response.data.user);
    return response;
}