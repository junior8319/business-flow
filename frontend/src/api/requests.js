import axios from 'axios';

const api_url = process.env.VUE_APP_API_URL;

const api = axios.create({
  baseURL: api_url,
});

export const requestGet = async (endpoint) => {
  const { data } = await api.get(
    endpoint,
  );
  return data;
};

export const requestPost = async (endpoint, body) => {  
  const { data } = await api.post(
    endpoint,
    body,
  );

  return data;
};

export const requestPut = async (endpoint, body) => {
  const data = await api.put(endpoint, body);
  return data;
};

export const requestDelete = async (endpoint) => {
  const { data } = await api.delete(endpoint);  

  return data;
};

