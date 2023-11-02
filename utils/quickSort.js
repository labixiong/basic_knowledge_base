var quickSort = function(arr) {

  if (arr.length <= 1) { return arr; }
  
  // 获取中间的索引
  var pivotIndex = Math.floor(arr.length / 2);
  // 取出当前索引的值
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++){
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  // 将左边进行排序 再进行拼接第一次的中间值 再拼接右边的排序结果
  return quickSort(left).concat([pivot], quickSort(right))
};


const arr = [85, 24, 63, 45, 17, 31, 96, 50]
console.log(quickSort(arr));
