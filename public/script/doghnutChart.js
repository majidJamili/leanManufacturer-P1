
// const containerLogs = document.querySelectorAll('.workstation-container');
const containerLogs = document.querySelectorAll('.workstation-graph'); 


graphVisualData = {
    standardColors:
    ['rgba(11, 222, 11, 1)',
    'rgba(90, 16, 192, 0.8)',
    'rgba(239, 239, 0, 1)',
    'rgba(244, 122, 0, 1)', 
    'rgba(0, 122, 244, 1)', 
    'rgba(122, 0, 244, 1)'],
    types:['Value-adding', 'Non-value-adding', 'Essential', 'Allowed Wait', 
    'Transport','Waste'], 
    boarderColors:['rgba(66,66,66,1)']
    }






containerLogs.forEach(container => {

    const canvasEl = document.createElement("canvas"); 
    const canvasAttr = {class: 'myChart', width:150, height:150};

    setAttributes(canvasEl, canvasAttr); 
    container.appendChild(canvasEl);
    canvasEl.classList.add('workstation-graph');

    for( let workstation of workstations){

        if(workstation._id === container.id){
            
            const myChart = new Chart(canvasEl, {
                type: 'doughnut',
                data: {
                    labels: graphVisualData.types,
                    datasets: [{
                    label: 'Efficiency Chart',
                    data: workstation.chartData,
                    backgroundColor: graphVisualData.standardColors,
                    borderColor: graphVisualData.boarderColors,
                    borderWidth: 0.5
                    }]
                },
                options: {
                    //cutoutPercentage: 40,
                    responsive: false,
                    plugins:{
                        legend:{
                            display:false
                        }
                    }
 

                }
    });            
        }
    }
    
});


// var ctx = document.getElementsByClassName("myChart");





// const myChart = new Chart(ctx, {
//                     type: 'doughnut',
//                     data: {
//                         datasets: [{
//                         label: '# of Tomatoes',
//                         data: [12, 19, 3, 5],
//                         backgroundColor: [
//                             'rgba(255, 99, 132, 0.5)',
//                             'rgba(54, 162, 235, 0.2)',
//                             'rgba(255, 206, 86, 0.2)',
//                             'rgba(75, 192, 192, 0.2)'
//                         ],
//                         borderColor: [
//                             'rgba(255,99,132,1)',
//                             'rgba(54, 162, 235, 1)',
//                             'rgba(255, 206, 86, 1)',
//                             'rgba(75, 192, 192, 1)'
//                         ],
//                         borderWidth: 1
//                         }]
//                     },
//                     options: {
//                         //cutoutPercentage: 40,
//                         responsive: false,

//                     }
//         });

// const myChart = new Chart(ctx, {
//   type: 'doughnut',
//   data: {
//     datasets: [{
//       label: '# of Tomatoes',
//       data: [12, 19, 3, 5],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.5)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)'
//       ],
//       borderColor: [
//         'rgba(255,99,132,1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)'
//       ],
//       borderWidth: 1
//     }]
//   },
//   options: {
//    	//cutoutPercentage: 40,
//     responsive: false,

//   }
// });