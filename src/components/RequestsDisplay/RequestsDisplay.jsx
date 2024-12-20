import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { format, subDays, subMonths } from 'date-fns';
import { BounceLoader } from 'react-spinners';
import { FaChartBar, FaEnvelope } from 'react-icons/fa';
import { useAuth } from './AuthContext'; // Importando o contexto de autenticação
import styles from './RequestsDisplay.module.css';

const RequestsDisplay = () => {
  const { isAuthenticated } = useAuth(); // Obtendo o estado de autenticação
  const [statistics, setStatistics] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('lastWeek');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('requests'); // 'requests' or 'views'

  // Função para buscar as estatísticas
  const fetchStatistics = async (period) => {
    setLoading(true);
    setError('');
    try {
      let startDate;
      if (period === 'lastWeek') {
        startDate = subDays(new Date(), 7);
      } else if (period === 'lastMonth') {
        startDate = subMonths(new Date(), 1);
      } else {
        startDate = subDays(new Date(), 30); // Período personalizado
      }

      const stats = Array.from({ length: 7 }, (_, i) => ({
        date: format(subDays(new Date(), 6 - i), 'yyyy-MM-dd'),
        requests: Math.floor(Math.random() * 50),
      }));

      // Simula tempo de carregamento
      await new Promise((res) => setTimeout(res, 1000));
      setStatistics(stats);
    } catch (err) {
      setError('Erro ao carregar os dados. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchStatistics(selectedPeriod); // Carregar estatísticas se o usuário estiver logado
    }
  }, [selectedPeriod, isAuthenticated]);

  // Controlando o período de exibição
  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  // Controlando a troca de abas
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Dados do gráfico
  const chartData = {
    labels: statistics.map((stat) => stat.date),
    datasets: [
      {
        label: 'Solicitações',
        data: statistics.map((stat) => stat.requests),
        borderColor: activeTab === 'requests' ? '#0078d4' : '#28a745',
        backgroundColor:
          activeTab === 'requests'
            ? 'rgba(0, 120, 212, 0.2)'
            : 'rgba(40, 167, 69, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Data',
        },
      },
      y: {
        title: {
          display: true,
          text: activeTab === 'requests' ? 'Solicitações' : 'Visualizações',
        },
      },
    },
  };

  // Redirecionar ou mostrar erro se não estiver autenticado
  if (!isAuthenticated) {
    return (
      <div className={styles.errorMessage}>
        Você precisa estar logado para acessar as estatísticas. <a href="/login">Clique aqui para fazer login.</a>
      </div>
    );
  }

  return (
    <div className={styles.requestsDisplayContainer}>
      <div className={styles.navTabs}>
        <button
          className={`${styles.navButton} ${activeTab === 'requests' ? styles.active : ''}`}
          onClick={() => handleTabChange('requests')}
        >
          <FaEnvelope /> Solicitações
        </button>
        <button
          className={`${styles.navButton} ${activeTab === 'views' ? styles.active : ''}`}
          onClick={() => handleTabChange('views')}
        >
          <FaChartBar /> Visualizações
        </button>
      </div>

      <div className={styles.requestsDisplayContent}>
        {loading ? (
          <div className={styles.loader}>
            <BounceLoader color="#0078d4" />
          </div>
        ) : error ? (
          <div className={styles.errorMessage}>{error}</div>
        ) : (
          <>
            <div className={styles.periodSelector}>
              <label htmlFor="period">Período:</label>
              <select id="period" value={selectedPeriod} onChange={handlePeriodChange}>
                <option value="lastWeek">Última semana</option>
                <option value="lastMonth">Último mês</option>
                <option value="custom">Período personalizado</option>
              </select>
            </div>

            <div className={styles.chartContainer}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RequestsDisplay;
