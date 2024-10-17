import { useQuery } from "@apollo/client";
import { GET_USER_POSTS_OVER_TIME } from "../../queries/userQueries";
import { Line } from "react-chartjs-2";

function UserPostsGraph({ userId, startDate, endDate }) {
  const { data, loading, error } = useQuery(GET_USER_POSTS_OVER_TIME, {
    variables: { userId, startDate, endDate },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  s;
  // Prepare data for Chart.js
  const chartData = {
    labels: data.userPostsCreateds.map((post) =>
      new Date(post.timestamp * 1000).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Posts Over Time",
        data: data.userPostsCreateds.map((post) => ({
          x: new Date(post.timestamp * 1000),
          y: 1, // Assuming each post represents a single count
        })),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        fill: false,
        lineTension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: "ll",
          },
          scaleLabel: {
            display: true,
            labelString: "Date",
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            stepSize: 1,
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: "Number of Posts",
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: "400px", width: "600px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default UserPostsGraph;
