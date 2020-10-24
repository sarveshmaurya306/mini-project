import React from 'react';
import { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

const state = {
  labels: ['totoalLikes', 'totalUser'],
  datasets: [
    {
      label: 'likes',
      backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#2FDE00',
        '#00A6B4',
        '#6800B4'
      ],
      hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
      ],
      data: []
    }
  ]
}

function Publicity(props) {
  state.datasets[0].data = [props.likes, props.totalUsers];
  return (
    <div style={{
      borderRadius: 10
    }}>
      <Pie
        data={state}
        options={{
          title: {
            display: true,
            text: 'Total Publicity',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
      />
    </div>
  );
}

export default React.memo(Publicity)