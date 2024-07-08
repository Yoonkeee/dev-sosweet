import axios from 'axios';

const mockBaseUrl = '/mocks';
const mockInstance = axios.create({
  baseURL: mockBaseUrl,
});
