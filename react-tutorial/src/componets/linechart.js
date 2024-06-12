import ApexCharts from 'apexcharts'


var list1 = []
var list2 = []
function lineChart(data, keys) {
    const responseList = data;
    
    list1 = responseList[Object.keys(responseList)[0]];
    list2 = responseList[Object.keys(responseList)[1]];
    
    var options = {
        chart: {
           
            
            type: 'line',
            stacked: false
            
        },
        stroke: {
            curve: 'smooth'
        },
        series: [{
            name: keys[0],
            data: list1
        },
        {
            name: keys[1],
            data: list2
        }],
        xaxis: {
            labels: {
              show: false // x축 라벨 비활성화
            }
          },
          yaxis: {
            labels: {
              show: false // y축 라벨 비활성화
            }
          },
          elements: {
            line: {
                tension: 0.5
            }
        }
       
    }

    var chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();
    

    
};
export default lineChart;