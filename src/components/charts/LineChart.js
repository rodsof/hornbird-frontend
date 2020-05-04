import React from 'react';
import Chart from 'chart.js';

class LineChart extends React.Component {
    constructor(props) {
      super(props);
      this.chartRef = React.createRef();
    }
  
    componentDidUpdate() {
      this.myChart.data.labels = this.props.data.map(d => d.label);
      this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
      this.myChart.update();
    }
  
    componentDidMount() {
      this.myChart = new Chart(this.chartRef.current, {
        type: 'line',
        options: {
          responsive: true,

          scales: {
            xAxes: [
              {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 15
            }
          }
            ],
            yAxes: [
              {
                ticks: {
                  min: 0
                },
                scaleLabel: {
                  display: true,
                  labelString: this.props.unit
                }
              }
            ]
          }
        },
        data: {
          labels: this.props.data.map(d => d.label),
          datasets: [{
            label: this.props.title,
            data: this.props.data.map(d => d.value),
            fill: 'none',
            backgroundColor: this.props.color,
            pointRadius: 2,
            borderColor: this.props.color,
            borderWidth: 1,
            lineTension: 0
          }]
        }
      });
    }
  
    render() {
      return <canvas ref={this.chartRef} style={{height:"200px",width:"300px"}} />;
    }
  }

  export default LineChart;