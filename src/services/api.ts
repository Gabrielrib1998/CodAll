// services/api.ts
import axios from 'axios';

// Cria a instância do Axios
const api = axios.create({
  baseURL:'http://10.6.79.86:5000', // IP do Flask
});

// Função para setar o token de autenticação nas requisições
export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

// Função para login
export async function apiLogin(email: string, senha: string) {
  const response = await api.post('/usuarios/login', { email, senha }); // rota POST /login
  return response.data; // retorna os dados do backend
}

// Exporta a instância do Axios
export default api;