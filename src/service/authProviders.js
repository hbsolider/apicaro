import axios from 'axios';

export default {
  // eslint-disable-next-line camelcase
  facebook: async (access_token) => {
    try {
      const fields = 'id, name, email, picture';
      const url = 'https://graph.facebook.com/me';
      const params = { access_token, fields };
      const response = await axios.get(url, { params });
      const { id, name, email, picture } = response.data;
      return {
        service: 'facebook',
        picture: picture.data.url,
        id,
        name,
        email,
      };
    } catch (err) {
      console.log('err', err);
      return null;
    }
  },

  // eslint-disable-next-line camelcase
  google: async (access_token) => {
    try {
      const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
      const params = { access_token };
      const response = await axios.get(url, { params });
      const { sub, name, email, picture } = response.data;
      return {
        service: 'google',
        avatar: picture,
        id: sub,
        name,
        email,
      };
    } catch (err) {
      console.log('err', err);
      return null;
    }
  },
};
