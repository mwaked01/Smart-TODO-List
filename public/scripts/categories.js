$(document).ready(function() {


const updateTask = function(taskID, currentTitle) {
  console.log("updateTask", taskID);
  const currentTask = $(`#${taskID}`);
  let taskTitle = currentTask.find(".title")[0];
  let taskUpdateOptions = currentTask.find(".task-update-options")[0];
  $(taskTitle).toggle();
  $(taskUpdateOptions).toggle();
  let inputVal=  $(taskUpdateOptions).find('#task')[0];
  console.log(
  );
  $(inputVal).val(`${currentTitle}`);

};

const showCategories = function() {
  let currentBlock = $(this);
  console.log(currentBlock);
}

});
