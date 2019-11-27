import { GoogleSignin } from 'react-native-google-signin';
import ImagePicker from 'react-native-image-picker';

/**
 * @author Himangi Patel <himangi.patel@credencys.com>
 */

export const signOut = async () => {
  try {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
  } catch (error) {
    console.error(error);
  }
};

export const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo);
    return userInfo;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const imagePicker = callback => {
  ImagePicker.showImagePicker(
    {
      title: 'Pick an Image',
    },
    res => {
      if (res.didCancel) {
        console.log('User cancelled!');
      } else if (res.error) {
        console.log('Error', res.error);
      } else {
        callback(res);
      }
    },
  );
};

export const videoPicker = callback => {
  ImagePicker.showImagePicker(
    {
      title: 'Pick a Video',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium',
    },
    res => {
      if (res.didCancel) {
        console.log('User cancelled!');
      } else if (res.error) {
        console.log('Error', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
      } else {
        callback(res);
      }
    },
  );
};

export const getFormData = async (formData) => {
  for (var key in formData) {
    var data = new FormData();
    data.append(key, formData[key]);
    if(typeof(formData[key]) === 'object'){
      console.log(formData[key]);
    }
  }
  return data;
}