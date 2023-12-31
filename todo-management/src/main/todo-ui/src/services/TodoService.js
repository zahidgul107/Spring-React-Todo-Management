import axios from "axios";
import { getToken } from "./AuthService";

const REST_API_BASE_URL = 'http://localhost:8091/'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();
    return config;
  }, function (error) {

    return Promise.reject(error);
  });

export const getAllTodos = () => axios.get(REST_API_BASE_URL + 'getAllTodos');

export const createTodo = (todo) => axios.post(REST_API_BASE_URL + 'addTodo', todo);

export const getTodo = (id) => axios.get(REST_API_BASE_URL + 'getTodo/' + id);

export const updateTodo = (id, todo) => axios.put(REST_API_BASE_URL + 'updateTodo/' + id, todo);

export const deleteTodo = (id) => axios.delete(REST_API_BASE_URL + 'deleteTodo/' + id);

export const completeTodo = (id) => axios.patch(REST_API_BASE_URL + 'completeTodo/' + id);

export const inCompleteTodo = (id) => axios.patch(REST_API_BASE_URL + 'inCompleteTodo/' + id);