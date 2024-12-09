import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchUsuarios = () => {
  const api = axios.create({
    baseURL: 'https://localhost:7060/api/',
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get('usuario');
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  return { data, loading, error };
};

export const useFetchUsuarioById = (id) => {
  const api = axios.create({
    baseURL: 'https://localhost:7060/api/',
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('useEffect disparado com id:', id);
    const fetchUsuarioById = async () => {
      try {
        const response = await api.get(`usuario/${id}`);
        console.log('Resposta da API:', response.data);
        setData(response.data);
      } catch (err) {
        console.error('Erro ao buscar dados:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUsuarioById();
    }
  }, [id]);

  return { data, loading, error };
};

export const useAdicionarUsuario = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const adicionarUsuario = async (request) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `https://localhost:7060/api/usuario`,
        request,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setIsLoading(false);
      return response.data;
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data || 'Erro ao adicionar usuário');
      console.error(err);
      return null;
    }
  };

  return { adicionarUsuario, isLoading, error };
};

export const useAtualizarUsuario = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const atualizarUsuario = async (id, request) => {
    try {
      setLoading(true);
      await axios.put(
        `https://localhost:7060/api/usuario/${id}`,
        request,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { atualizarUsuario, loading, error };
};

export const useDeletarUsuario = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletarUsuario = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7060/api/usuario/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deletarUsuario, loading, error };
};
