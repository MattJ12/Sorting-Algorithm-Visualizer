// Selection sort algorithm.  Keeps the front half of the array
// sorted while repeatedly scanning the back half of the array (unsorted)
// looking for the smallest element and swapping it with the element
// right after the sorted front half of the array.
// Time complexity: O(n^2) average and worst case.
// Space complexity: O(1).
export const SelectionSort = (arr) => {
   const animations = [];
   selectionSort(arr, animations);
   return animations;
}

// Accept an array arr, array animations and sorts arr using
// the selection sort algorithm.  Updates animations to
// store a history of how elements were sorted.
const selectionSort = (arr, animations) => {
   // 0 -> default color
   // 1 -> non-default color
   const indexes = [0, 1];
   // Iterating through every unsorted element of arr.
   for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      // Animation for bar at initial minimum index to change to non-default color.
      animations.push([indexes[1], minIndex]);
      // Comparing arr[i] to every other unsorted value in arr to find next minimum.
      for (let j = i + 1; j < arr.length; j++) {
         // Push animation for changing bar at index j to non-default for being compared.
         animations.push([indexes[1], j]);
         // Push animation for changing bar color at index j back to default color.
         animations.push([indexes[0], j]);
         // If I've found a new minimum value.
         if (arr[j] < arr[minIndex]) {
            // Animation for changing color of bar at previous
            // minimum index back to default color.
            animations.push([indexes[0], minIndex]);
            minIndex = j;
            // Animation for changing color of bar at new minimum index
            // to non-default color.
            animations.push([indexes[1], minIndex]);
         }
      }
      // Animation to change color of bar at minimum index
      // to default color before the value swap.
      animations.push([indexes[0], minIndex]);
      // Animation for swapping of arr values at i and minIndex.
      animations.push([i, minIndex, arr[i], arr[minIndex]]);
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
   }
}
