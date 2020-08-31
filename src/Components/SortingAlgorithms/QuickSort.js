// Quick sort algorithm.  A random element (the pivot) is selected and the array
// is partitioned such that all values less than the pivot come before it in the
// array and all values large than the pivot come after it.  If sub-arrays are
// repeatedly partitioned around a pivot, the array will become sorted.
// Time complexity: O(nlog(n)) average, O(n^2) worst case.
// Space complexity: O(log(n)).
export const QuickSort = (arr) => {
   const animations = [];
   quickSortHelper(arr, animations, 0, arr.length - 1);
   return animations;
}

// Accepts array arr, array animations, integer left, and integer right
// as parameters and sorts arr based off of the left and right index parameters.
const quickSortHelper = (arr, animations, left, right) => {
   const index = partition(arr, animations, left, right);
   // Recrsively sort left half.
   if (left < index - 1) quickSortHelper(arr, animations, left, index - 1);
   // Recursively sort right half.
   if (right > index) quickSortHelper(arr, animations, index, right);
}

// Accepts an array arr, array animations, integer left, integer right
// as parameters and partitions a sub-array of arr based off the left
// and right index parameters such that all elements less than the pivot
// come before the elements larger than the pivot.  Returns an integer
// used to help split up sub-arrays.
const partition = (arr, animations, left, right) => {
   // 0 -> default color
   // 1 -> non-default color
   const indexes = [0, 1];
   const pivot = arr[Math.floor((left + right) / 2)]; // Choose pivot index.
   while (left <= right) {
      // Iterate on both right and left halves until either half
      // has found a value to be swapped to the other side.
      while (arr[left] < pivot && arr[right] > pivot) {
         // Animation for changing bar colors of
         // bars at current indexes being checked to non-default color.
         animations.push([indexes[1], left, right]);
         // Animation for changing bar colors
         // of bars at current indexes back to default color.
         animations.push([indexes[0], left, right]);
         left++;
         right--;
      }
      // When the value to be swapped on left has not been found yet.
      if (arr[left] < pivot) {
         // Right bar should stay non-default color to signify it is ready to swap.
         animations.push([indexes[1], right]);
         while (arr[left] < pivot) {
            // Animation for changing left bar color to non-default color.
            animations.push([indexes[1], left]);
            // Animation for chaning left bar color back to default color.
            animations.push([indexes[0], left]);
            left++;
         }
         // Right bar should change back to default color because a swap has been found.
         animations.push([indexes[0], right]);
      }
      // When the value to be swapped on right has not been found yet.
      if (arr[right] > pivot) {
         // Left bar should stay non-default color to signify it is ready to swap.
         animations.push([indexes[1], left]);
         while (arr[right] > pivot)  {
            // Animation for changing right bar color to non-default color.
            animations.push([indexes[1], right]);
            // Animation for changing right bar color back to default color.
            animations.push([indexes[0], right]);
            right--;
         }
         // Left bar should change back to default color because a swap has been found.
         animations.push([indexes[0], left]);
      }
      // Executes the value swap in the array.
      if (left <= right) {
         // Animation for swapping elements.
         animations.push([arr[left], arr[right], left, right]);
         // Swap elements in aray (must use temp variable).
         let temp = arr[right];
         arr[right] = arr[left];
         arr[left] = temp;
         left++;
         right--;
      }
   }
   return left;
}
