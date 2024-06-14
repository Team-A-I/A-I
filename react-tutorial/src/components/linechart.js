import ApexCharts from 'apexcharts' // 차트 생성해주는 ApexCharts를 import
// 누적 포인트를 담을 리스트 생성
var list1 = []
var list2 = []
// lineChart 함수 생성
function lineChart(data, keys) {
    // 누적 포인트 리스트에 데이터 저장
    const responseList = data;
    list1 = responseList[Object.keys(responseList)[0]];
    list2 = responseList[Object.keys(responseList)[1]];
    
    // 차트 옵션 설정
    var options = {
        chart: {
            type: 'line',
            stacked: false,
            height: 300,
        },
        // 차트 선을 부드럽게 만들어줌
        stroke: {
            curve: 'smooth'
        },
        // name: 이름, data: 누적 포인트
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
    // 차트 생성
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    // 차트 렌더링
    chart.render();
    

    
};
// lineChart 함수를 export
export default lineChart;