import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTable } from 'react-table';

const AdminDashboard = () => {
  const [reportData, setReportData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [filters, setFilters] = useState({ startDate: '', endDate: '' });

  useEffect(() => {
    // Simulando a busca de dados de relatórios
    const fetchData = async () => {
      const data = await fetchReports(); // Substitua pela sua função de busca de dados
      setReportData(data);
      generateChart(data);
    };

    fetchData();
  }, []);

  const fetchReports = async () => {
    // Substitua por chamada à API
    return [
      { id: 1, activity: 'Novos Perfis Cadastrados', count: 15 },
      { id: 2, activity: 'Solicitações Enviadas', count: 10 },
      { id: 3, activity: 'Denúncias Recebidas', count: 5 },
      { id: 4, activity: 'Usuários Ativos', count: 20 },
    ];
  };

  const generateChart = (data) => {
    const labels = data.map(item => item.activity);
    const counts = data.map(item => item.count);

    setChartData({
      labels: labels,
      datasets: [{
        label: 'Atividades',
        data: counts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }],
    });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Atividade', accessor: 'activity' },
      { Header: 'Quantidade', accessor: 'count' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: reportData });

  return (
    <div>
      <h1>Painel de Administração</h1>

      <div>
        <h2>Filtros de Relatório</h2>
        <label>
          Data de Início:
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Data de Fim:
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
          />
        </label>
        <button onClick={() => alert('Relatório gerado')}>Gerar Relatório</button>
      </div>

      <div>
        <h2>Gráfico de Atividades</h2>
        <Bar data={chartData} options={{ responsive: true }} />
      </div>

      <div>
        <h2>Tabela de Relatórios</h2>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;