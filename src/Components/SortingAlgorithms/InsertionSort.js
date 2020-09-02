// Insertion sort algorithm.  start at index 1 (zero-based indexing)
// in unsorted array and insert the element at the current index
// at the index in the left half of the array where it is greater
// than or equal to the element to its left.  Every time a value is 
// inserted in a position to its left, the other values in the array
// are shifted to the right to make room.
// Time complexity: O(n^2) average and worst case.
// Space complexity: O(1).
export const InsertionSort = (arr) => {
    const animations = [];
    insertionSort(animations, arr);
    return animations;
}

// Accepts an array arr and array animations and applies the
// insertion sort algorithm to arr.  Updates animations to
// store a history of how elements were sorted.
const insertionSort = (animations, arr) => {
    // -1 -> default color
    // -2 -> non-default color
   const indexes = [-1, -2];
    // Loop through elements in arr and inserts them in sorted order.
    for (let i = 1; i < arr.length; i++) {
        let curr = arr[i];
        let j = i - 1;
        // Animation for flashing bars at i and j to the non-default color
        // and back to the default color.
        animations.push([indexes[1], i, j]);
        animations.push([indexes[0], i, j]);
        // while we haven't found where curr should be inserted
        // keep shifting elements to the right to make room.
        while (j >= 0 && curr < arr[j]) {
            // Animation for shifting of bar value at j to to j + 1.
            animations.push([j + 1, arr[j]]);
            arr[j + 1] = arr[j];
            j--;
            // Animation to show which bar value curr is being compared
            // to should only happen when j is a valid index in arr.
            if (j >= 0) {
                animations.push([indexes[1], j]);
                animations.push([indexes[0], j]);
            }
        }
        // Animation to insert curr at its correct index.
        animations.push([j + 1, curr]);
        // Execute insert of curr at correct index.
        arr[j + 1] = curr;
    }
}
