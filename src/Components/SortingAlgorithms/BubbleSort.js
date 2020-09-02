// Bubble sort algorithm.  Iterate through array, comparing
// every pair of elements and swap if the first value is greater
// than the second value.  Keep doing this until array is completely sorted.
// Time complexity: O(n^2) average and worst case.
// Space complexity: O(1).
export const BubbleSort = (arr) => {
   const animations = [];
   bubbleSort(arr, animations);
   return animations;
}

// Accepts array arr and array animations as parameters and applies the
// bubble sort algorithm to sort arr.  Updates animations to
// store a history of how elements were sorted.
const bubbleSort = (arr, animations) => {
   // 0 -> default color
   // 1 -> non-default color
   const indexes = [0, 1];
   // Making a number of passes equal to the number of elements
   // in arr ensures the array is sorted.
   // Loop breaks if arr is sorted before arr.length iterations.
   for (let i = 0; i < arr.length; i++) {
      let hasSwapped = false;
      // Iterate through arr, swapping elements to ensure ascending value.
      for (let j = 0; j < arr.length - 1; j++) {
         // Animation for bar at index j and j + 1 changing
         // to non-default color to show comparison.
         animations.push([indexes[1], j, j + 1]);
         // Animation for bar at index j and j + 1 changing
         // to default color after comparison.
         animations.push([indexes[0], j, j + 1]);
         // Swapping of values.
         if (arr[j] > arr[j + 1]) {
            // Animation to swap values in arr.
            animations.push([j, j + 1, arr[j], arr[j + 1]])
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            hasSwapped = true;
         }
      }
      if (!hasSwapped) break;
   }
}
