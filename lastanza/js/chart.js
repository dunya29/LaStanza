console.log("dd")
window.addEventListener("load", () => {
    const data3 = ["31.01.2024", "01.02.2024", "02.02.2024", "04.02.2024", "05.02.2024", "06.02.2024"]
    let labelsItems = [30000, 180000, 7000, 150000, 100000, 1010000]
    const ctx = document.getElementById('myChart').getContext("2d")
    const gradientBg = ctx.createLinearGradient(0, 500 , 0 , 0)//xleft ytop xright ybottom 500 visota canvasa
    gradientBg.addColorStop(0,'#fff')
    //gradientBg.addColorStop(0.3,'lime')
    gradientBg.addColorStop(0.5,'pink')
    gradientBg.addColorStop(1,'pink')
    pointRad = function(context) { 
      if (context.dataIndex == context.dataset.data.length-1) {      
         return 5; 
      } else { 
        return 0;  } 
    }
    const data = {
      labels: data3,
      datasets: [ 
      {
        tension: 0.4,
        borderColor: "#000",
        borderWidth: 1,
        pointRadius:0,// pointRad,
        pointBackgroundColor: "#000",
        pointBorderWidth: 5,
        pointBorderColor: "red",//krasniy
        data: labelsItems,
        hoverRadius: 0,
        hoverBorderWidth: 0,
        //hoverBorderColor: "red",
        pointStyle: "triangle",
        pointRotation: 180,
        fill: true,
        backgroundColor: gradientBg,
        hoverOffset: true,
        datalabels: {
          align: function(context) {
            return context.active ? 'start' : 'center';
          }
        }
        //fill: {
        //  target: 'origin',
        //  above: 'rgb(255, 0, 0)',   // Area will be red above the origin
        //  below: '#000'    // And blue below the origin
        //} 
      }]
    };
    
    // config 
    const config = {
      type: 'line',
      data,
      options: {
        maintainAspectRatio:false,//ctobi mojno bilo zadat shirinu i visotu
        clip: false,
        layout: {
          padding: {
              left: 0,
              right: 4,
              top: 0,
              bottom: 0
          }
      },
        interaction: {
          intersect: false
        }, 
        plugins: {
          responsive: true,
          legend: {
            display: false
          },
          title: {
            display: true,
            text: '',
            color: "rgba(255, 255, 0, 1)"
          },
          tooltip: {
            displayColors: false,//ubiraem kvadrat
            backgroundColor: "black",
            titleColor: "#fff",
            bodyColor: "#fff",
            yAlign: "bottom",
            xAlign: "center",
            active:true,
            callbacks: {
              title: function( context) {
                return false
              },
              label: function( context) {
                let label = context.dataset.label || '';
                 if (label) {
                    label += ': ';
                }
                 if (context.parsed.y !== null) {
                    label = String(context.parsed.y).replace(/\B(?=(\d{3})+(?!\d))/g, " ").trim() + " ₽";
                } 
                let title = context.label
                return label + ", " + title ;
              }  
            }
          }
        },
        scales: {
          y: {
            type: "linear",//po vozr i znac ne povtoraetsa
            //beginAtZero: true,     
            grid: {
              display: false,
              //lineWidth: 30,//border ko vixodit za ramki peresec c x-om
              borderWidth: 3,//razmer border
              borderColor: '#000'//cvet osi y
            },
            ticks: {
              color: "#000",//cvet na osi y
              //padding: 10,
              stepSize: 5,
            },
          },
          x: {
            grid: {
              display: false,
              borderWidth: 3,//razmer border
              borderColor: '#000'//cvet osi y
            },
            ticks: {
              autoSkip: false,
              color: "#000",//cvet na osi x
              //padding: 10,
              /* autoSkip: true,
              maxTicksLimit: 4, */
               callback: function(val, index) {
                if( index === 0 || index === 11 || index === 21|| index === labelsItems.length-1) {
                  return this.getLabelForValue(val)
                }
              },    
            },
          }
        },
      },
      plugins: [{
        afterDraw: chart => {
          if (chart.tooltip._active && chart.tooltip._active.length) {
            const ctx = chart.ctx
            ctx.save()
            const activePoint = chart.tooltip._active[0]
            ctx.beginPath()
            ctx.setLineDash([6,6])
          ctx.moveTo(activePoint.element.x, chart.chartArea.top)
          ctx.lineTo(activePoint.element.x, activePoint.element.y)
          ctx.lineWidth = 1
          ctx.strokeStyle = "red"
          ctx.stroke()
          ctx.restore()
    
          ctx.beginPath()
         ctx.setLineDash([6,6])
        ctx.moveTo(activePoint.element.x, activePoint.element.y)
        ctx.lineTo(activePoint.element.x, chart.chartArea.bottom)
        ctx.lineWidth = 1
        ctx.strokeStyle = "red"
        ctx.stroke()
        ctx.restore()
        ctx.setLineDash([6,0])
          }
        },
        afterDatasetUpdate: chart => {
          if (!chart.tooltip.getActiveElements().length) {
            chart.tooltip.setActiveElements([{
              datasetIndex: 0,
              index: chart.data.datasets[0].data.length - 1
            }]);
            chart.update();
          }
        }
      }],
    };
    
    // render init block
    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );
    })
    
    
    