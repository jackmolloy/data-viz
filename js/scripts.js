// my js

var data;
var title = [];
var year = [];
var score = [];
var facebook = [];
var gross = [];
var budget = [];
var fb08 = [];
var money08 = [];
var fb15 = [];
var money15 = [];
var moneyYear = [];



$(document).ready(function() {
    $('#example').DataTable( {
        "ajax": '../top50.txt',
        "order": [[ 1, "desc" ]]
    } );

    $('#example2').DataTable( {
        "ajax": '../top50_less.txt',
        "order": [[ 1, "desc" ]]
    } );

    loadData();



} );


// DYNAMIC DATA STUFF
function loadData(){

    $.ajax({
            type:"GET",
            url:"all_movie.json",
            dataType:"json",
            success: parseData
});

}


function parseData(data){
    // console.log(data);
    // dataObj = JSON.parse(data);
    // console.log(dataObj);

     for (var i = 0, len = data.length; i < len; ++i) {
            //sets data to arrays for charts
            title.push(data[i]["movie_title"]);
            year.push(data[i]["title_year"]);
            score.push(data[i]["imdb_score"]);
            facebook.push(data[i]["movie_facebook_likes"]);
            gross.push(data[i]["gross"]);
            budget.push(data[i]["budget"]);


            if (data[i]["title_year"] == 2008) {
                fb08.push(data[i]["movie_facebook_likes"]);
                money08.push(data[i]["gross"]);
            } else if (data[i]["title_year"] == 2015) {
                fb15.push(data[i]["movie_facebook_likes"]);
                money15.push(data[i]["gross"]);
            }

            if (data[i]["title_year"] > 2006) {
                moneyYear.push(data[i]["title_year"]);
            }

     }

     // console.log(title);
     // console.log(year);

    //
    //  var sum = age.reduce((previous, current) => current += previous);
    // avg = sum / age.length;
    //  console.log(avg);
    //console.log(person);
    //console.log(maleCount);

    loadCharts();

}







// CHART STUFF
function loadCharts() {




// function moneyLine() {
  var chart = c3.generate({
      bindto: '#chart',
      size: {
          height: 400,
          width: 700
      },
      data: {
          x: 'x',
          columns: [
              ['x',  2007,  2008,  2009,  2010,  2011,  2012,  2013,  2014,  2015,  2016],
              ['Average Budget',  35117483.7,  41804885.57,  37073287.04,  45476979.7,  37615372.44,  41143274.62,  40334376.48,  35325799.13,  38299777.42,  56642741.94],
              ['Average Gross Revenue',  46267501.02,  44573509.38,  46207440.2,  49908326.01,  45785836.64,  62873527.68,  56158357.78,  62412136.95,  66530966.48,  76924035.89],
          ],
          types: {
              'Average Budget': 'spline',
              'Average Gross Revenue': 'spline'
          }

        },
        axis: {
            x: {
              // type: 'category',
              // categories: ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7', 'cat8', 'cat9'],

                  label: 'Year',
                  // tick: {
                  //     fit: false,
                  //     format: d3.format(",")
                  // }
              },
            y: {
              label: 'Total Revenue',
              tick: {
                  fit: false,
                  format: d3.format("$,")
              }
            }
        }

  });

// }

// function moneyLine_SM() {
  var chart = c3.generate({
      bindto: '#chart6',
      size: {
          height: 300,
          width: 350
      },
      data: {
          x: 'x',
          columns: [
              ['x',  2007,  2008,  2009,  2010,  2011,  2012,  2013,  2014,  2015,  2016],
              ['Average Budget',  35117483.7,  41804885.57,  37073287.04,  45476979.7,  37615372.44,  41143274.62,  40334376.48,  35325799.13,  38299777.42,  56642741.94],
              ['Average Gross Revenue',  46267501.02,  44573509.38,  46207440.2,  49908326.01,  45785836.64,  62873527.68,  56158357.78,  62412136.95,  66530966.48,  76924035.89],
          ],
          types: {
              'Average Budget': 'spline',
              'Average Gross Revenue': 'spline'
          }
        }

  });



  var chart = c3.generate({
      bindto: '#chart2',
      size: {
          height: 400,
          width: 700
      },
      data: {
          xs: {
              total_rev: 'movie_facebook_likes',
              // versicolor: 'versicolor_x',
          },
          // iris data from R
          json: {
              total_rev: money15,
              'movie_facebook_likes': fb15
          },
          type: 'scatter',
          names: {
              total_rev: '2015'
          }
      },
      axis: {
          x: {
            // type: 'category',
            // categories: ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7', 'cat8', 'cat9'],
                min: 0,
                max: 200000,
                label: '# of Facebook Likes',
                tick: {
                    fit: false,
                    format: d3.format(",")
                }
            },
          y: {
            min: 0,
            max: 700000000,
            label: 'Total Revenue',
            tick: {
                fit: false,
                format: d3.format("$,")
            }
          }
      }
  });




// function fbScatter15_SM() {
var chart = c3.generate({
    bindto: '#chart4',
    size: {
        height: 300,
        width: 350
    },
    data: {
        xs: {
            total_rev: 'movie_facebook_likes',
            // versicolor: 'versicolor_x',
        },
        // iris data from R
        json: {
          total_rev: money15,
          'movie_facebook_likes': fb15
        },
        type: 'scatter',
        names: {
            total_rev: '2015'
        }
    },
    axis: {
        x: {
          min: 0,
          max: 200000,
          label: '# of Facebook Likes',
          tick: {
              fit: false,
              format: d3.format(","),
          }
        },
        y: {
          min: 0,
          max: 700000000,
          label: 'Total Revenue',
          tick: {
              fit: false,
              format: d3.format("$,")
          }
        }
    }
});



// function fbScatter08() {
var chart = c3.generate({
    bindto: '#chart3',
    size: {
        height: 400,
        width: 700
    },
    data: {
        xs: {
            total_rev: 'movie_facebook_likes',
            // versicolor: 'versicolor_x',
        },
        // iris data from R
        json: {
          total_rev: money08,
          'movie_facebook_likes': fb08
        },
        type: 'scatter',
        names: {
            total_rev: '2008'
        }
    },
    axis: {
        x: {
          min: 0,
          max: 200000,
            label: '# of Facebook Likes',
            tick: {
                fit: false,
                format: d3.format(",")
            }
        },

        y: {
          min: 0,
          max: 700000000,
          label: 'Total Revenue',
          tick: {
              fit: false,
              format: d3.format("$,")
          }
        }
    }
});

// function fbScatter08_SM() {
var chart = c3.generate({
    bindto: '#chart5',
    size: {
        height: 300,
        width: 350
    },
    data: {
        xs: {
            total_rev: 'movie_facebook_likes',
            // versicolor: 'versicolor_x',
        },
        // iris data from R
        json: {
          total_rev: money08,
          'movie_facebook_likes': fb08
        },
        type: 'scatter',
        names: {
            total_rev: '2008'
        }
    },
    axis: {
        x: {
          min: 0,
          max: 200000,
          label: '# of Facebook Likes',
          tick: {
              fit: false,
              format: d3.format(","),
          }
        },

        y: {
          min: 0,
          max: 700000000,
            label: 'Total Revenue',
            tick: {
                fit: false,
                format: d3.format("$,")
            }
        }
    }
});

// }

}





// function loadData(){
//   $.ajax data.json
//   on success parseData(data)
// }
//
// function parseData() {
//   do my processing for:
//   men v women
//   standard dev
//   set arrays
//     gender
//     age
//
//   generateCloseScatter();
//   generateChartGenderPie();
//   buildDataTable();
// }
//
//
//
// function generateCloseScatter() {
//
//   var chart = c3.generate({
//       bindto: '#chart',
//       data: {
//           xs: {
//               setosa: 'setosa_x',
//               versicolor: 'versicolor_x',
//           },
//           // iris data from R
//           columns: [
//               ["setosa_x",  3.5,  3.0,  3.2,  3.1,  3.6,  3.9,  3.4,  3.4,  2.9,  3.1,  3.7,  3.4,  3.0,  3.0,  4.0,  4.4,  3.9,  3.5,  3.8,  3.8,  3.4,  3.7,  3.6,  3.3,  3.4,  3.0,  3.4,  3.5,  3.4,  3.2,  3.1,  3.4,  4.1,  4.2,  3.1,  3.2,  3.5,  3.6,  3.0,  3.4,  3.5,  2.3,  3.2,  3.5,  3.8,  3.0,  3.8,  3.2,  3.7,  3.3],
//               ["versicolor_x",  3.2,  3.2,  3.1,  2.3,  2.8,  2.8,  3.3,  2.4,  2.9,  2.7,  2.0,  3.0,  2.2,  2.9,  2.9,  3.1,  3.0,  2.7,  2.2,  2.5,  3.2,  2.8,  2.5,  2.8,  2.9,  3.0,  2.8,  3.0,  2.9,  2.6,  2.4,  2.4,  2.7,  2.7,  3.0,  3.4,  3.1,  2.3,  3.0,  2.5,  2.6,  3.0,  2.6,  2.3,  2.7,  3.0,  2.9,  2.9,  2.5,  2.8],
//               ["setosa",  0.2,  0.2,  0.2,  0.2,  0.2,  0.4,  0.3,  0.2,  0.2,  0.1,  0.2,  0.2,  0.1,  0.1,  0.2,  0.4,  0.4,  0.3,  0.3,  0.3,  0.2,  0.4,  0.2,  0.5,  0.2,  0.2,  0.4,  0.2,  0.2,  0.2,  0.2,  0.4,  0.1,  0.2,  0.2,  0.2,  0.2,  0.1,  0.2,  0.2,  0.3,  0.3,  0.2,  0.6,  0.4,  0.3,  0.2,  0.2,  0.2,  0.2],
//               ["versicolor",  1.4,  1.5,  1.5,  1.3,  1.5,  1.3,  1.6,  1.0,  1.3,  1.4,  1.0,  1.5,  1.0,  1.4,  1.3,  1.4,  1.5,  1.0,  1.5,  1.1,  1.8,  1.3,  1.5,  1.2,  1.3,  1.4,  1.4,  1.7,  1.5,  1.0,  1.1,  1.0,  1.2,  1.6,  1.5,  1.6,  1.5,  1.3,  1.3,  1.3,  1.2,  1.4,  1.2,  1.0,  1.3,  1.2,  1.3,  1.3,  1.1,  1.3],
//           ],
//           type: 'scatter'
//       },
//       axis: {
//           x: {
//               label: 'Sepal.Width',
//               tick: {
//                   fit: false
//               }
//           },
//           y: {
//               label: 'Petal.Width'
//           }
//       }
//   });
//
// }
//
// function generateChartAgeBar() {
//   make bar chart about age
// }
//
// function buildDataTable() {
//   call datables json
// }
