import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import firebaseConfig from './firebase-config';

const app = initializeApp(firebaseConfig);

let messaging;
if (typeof window !== 'undefined') {
  messaging = getMessaging(app);
}

export async function requestPermission() {
  console.log('Requesting permission...');
  return new Promise((resolve, reject) =>
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        resolve(permission);
      } else {
        reject(permission);
      }
    }),
  );
}

export const getMessagingToken = async () => {
  let currentToken = '';
  if (!messaging) return null;

  try {
    currentToken = await getToken(messaging, {
      vapidKey: firebaseConfig.vapidKey,
    });
  } catch (error) {
    console.log('An error occurred while retrieving token. ', error);
  }

  return currentToken;
};

export const onMessageListener = () => {
  console.log('Listening notification message...');
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
};

export const postSaveToken = async (channel, userid, token) => {
  console.log('@registryMessagingToken', token);

  // const url = 'http://localhost:8115/api-push-notification/v1/save-token'
  const url = 'https://apiutil.mobifone9.vn/api-push-notification/v1/save-token';

  // TODO: Call API here
  axios
    .post(url, {
      channel,
      userid,
      token,
    })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((e) => {
      console.error(JSON.stringify(e.message));
    });
};

export const registryMessagingToken = async (channel, userid) => {
  const granted = await requestPermission();
  if (granted) {
    const token = await getMessagingToken();
    console.log('@registryMessagingToken', token);
    postSaveToken(channel, userid, token);
  }
};
