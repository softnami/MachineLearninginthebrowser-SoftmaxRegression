import {logs} from './data.js';
import {actions, categories} from './constants/constants.js';

let callback = (data) => {
    console.log(data);
};

let returnIndexOf = (arr, item) => {
    return arr.indexOf(item);
}

let getDayofWeek = (timeStamp) =>{
  let currDate = new Date();
  currDate.setTime(timeStamp);
  return currDate.getDay();
};

let transformJSON = (dataLogs) => {
   let dataX = [];
   let dataY = [];

   for(let i = 0; i<dataLogs.length; i++){

      let X = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let Y = [0,0,0,0];
      let dayOfWeek = getDayofWeek(dataLogs[i].reminderTimeStamp);
      let category = returnIndexOf(categories, dataLogs[i].reminderCategory);
      if(dataLogs[i].finalAction){
        let action = returnIndexOf(actions, dataLogs[i].finalAction);
            Y[action] = 1;
      }

      X[dayOfWeek] = 1;
      X[7+category] = 1;

      dataX.push(X);
      dataY.push(Y);

   }

   return {dataX, dataY};
};

window.onload = ()=>{
    let sft = new window.SoftmaxRegression({
        'notify_count': 100,
        'momentum': 0.5,
        'parameter_size': [11, 4], //[number of input features, total number of output classes]
        'max_epochs': 100,
        'weight_initialization_range': [Math.random()*-1, Math.random()],
        'threshold': 0.1,
        'batch_size': 64,
        'iteration_callback': callback,
        'learningRate': 0.0009,
        'regularization_parameter': Math.exp(-5)
    });

    let {dataX, dataY} = transformJSON(logs);
    let matX = math.matrix(dataX);
    let matY = math.matrix(dataY);
    sft.startRegression(matX, matY);

    let sampleInput = [{"reminderCategory":"office","reminderText":"Meeting with Business","reminderTimeStamp":1549759400000}];
    dataX = (transformJSON(sampleInput)).dataX;
    matX = math.matrix(dataX);

    let prediction = sft.predict(matX);

    console.log(prediction);
};
