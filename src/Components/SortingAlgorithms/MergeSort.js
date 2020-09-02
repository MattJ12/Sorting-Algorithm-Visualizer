// Merge sort algorithm.  This is a divide and conquer algorithm where
// the array is continually divided in half and the sub-arrays are sorted,
// then merged together to sort the entire array.
// Time complexity: O(nlog(n)) average and worst case.
// Space complexity: O(n).
export const MergeSort = (arr) => {
   const animations = [];
   const helperArr = new Array(arr.length);
   mergeSort(arr, helperArr, animations, 0, arr.length - 1);
   return animations;
}

// Accepts array arr, array helperArr, array animations, integer low,
// integer high and splits up sub-arrays to sort based on the low and high
// indexes until low and high are equal, meaning the array is down to one element.
const mergeSort = (arr, helperArr, animations, low, high) => {
   if (low < high) {
      const middle = Math.floor((low + high) / 2);
      mergeSort(arr, helperArr, animations, low, middle);
      mergeSort(arr, helperArr, animations, middle + 1, high);
      merge(arr, helperArr, animations, low, middle, high);
   }
}

// Accepts array arr, array helperArr, array animations, integer low,
// integer middle, integer high and marges both halves of helperArr together
// based on low, middle and high indexes.  Updates animations to
// store a history of how elements were sorted.
const merge = (arr, helperArr, animations, low, middle, high) => {
   // Fills helperArr copy of arr for elements being considered.
   for (let i = low; i <= high; i++) {
      helperArr[i] = arr[i];
   }
   let left = low;
   let curr = low;
   let right = middle + 1;
   // While there are elements on both sides of the array to be compared.
   while (left <= middle && right <= high) {
      // Push once to change the color of the bars being compared.
      animations.push([left, right]);
      // Push a second time to change the color of the bars
      // being compared back to their default color.
      animations.push([left, right]);
      // If left element <= right element.
      if (helperArr[left] <= helperArr[right]) {
         // Push the index in arr whose value needs to be set to
         // the value of helperArr[left].
         animations.push([curr, helperArr[left]])
         arr[curr] = helperArr[left];
         left++;
      } else { // If right element < left element
         // Push the index in arr whose value needs to be set to
         // the value of helperArr[right].
         animations.push([curr, helperArr[right]]);
         arr[curr] = helperArr[right];
         right++;
      }
      curr++;
   }
   // One half of helperArr has at least one element to be added onto arr.
   let lower = middle - left >= 0 ? left : right;
   let upper = middle - left >= 0 ? middle : high;
   for (let i = lower; i <= upper; i++) {
      // Push once to change the color of the bars being compared.
      animations.push([i, i]);
      // Push a second time to change the color of the bars
      // being compared back to their default color.
      animations.push([i, i]);
      // Push the index in arr whose value needs to be set to
      // the value of helperArr[i].
      animations.push([curr, helperArr[i]]);
      arr[curr] = helperArr[i];
      curr++;
   }
}
