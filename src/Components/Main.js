import React, { Component } from 'react';
import { MergeSort } from './SortingAlgorithms/MergeSort'
import { QuickSort } from './SortingAlgorithms/QuickSort'
import { SelectionSort } from './SortingAlgorithms/SelectionSort'
import { BubbleSort } from './SortingAlgorithms/BubbleSort'
import './Main.css';

// This component handles all of the rendering for the visualizer and interprets
// the animations array that is returned from the sorting algorithm files.
export default class Main extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arr: [],
         algo: '',
         SORTABLE: false,
         NUM_BARS: 75,
         SORTING_SPEED: 247,
         DEFAULT_COLOR: '#add8e6',
         COLOR: '#A020F0'
      };
   }

   // Hook that executes after first render() lifecycle.
   // Initializes arr stored in Main's state.
   componentDidMount() {
      this.resetArray(this.state.NUM_BARS);
   }

   // Accepts an integer algoIndex as parameter and updates the state of
   // the Main component to store a string representation of the sorting
   // algorithm selected by the user.  Enables start animation button for user.
   // Selects/un-selects current algorithm button on UI depending on
   // which algorithm button the user clicked.
   setAlgo(algoIndex) {
      const algos = ['quick sort', 'merge sort', 'bubble sort', 'selection sort']
      this.setState({algo: algos[algoIndex], SORTABLE: true});
      const algorithmButtons = document.getElementsByClassName('algorithm-button');
      for (let i = 0; i < algorithmButtons.length; i++) {
         // Select/un-select algo button depending on which algo button user clicked.
         algorithmButtons[i].style.backgroundColor = i === algoIndex ? '#325C74' : '#add8e6';
      }
   }

   // Accepts a string length as parameter and updates the state
   // of the Main component to have NUM_BARS equal the parameter length.
   // Updates arr stored in the state of the Main component to have a
   // number of values equal to the value of the parameter length.
   changeNumElements(length) {
      this.setState({NUM_BARS: length});
      this.resetArray(length);
   }

   // Accepts an integer parameter value and returns it
   // if NUM_BARS stored in Main's state is less than 38,
   // otherwise returns an empty string.
   placeArrayValue(value) {
      if (this.state.NUM_BARS < 47) return Math.floor(value);
      return '';
   }

   // Accepts an integer parameter value and if it is smaller
   // than 24 it returns 24, otherwise returns value.
   findHeight(value) {
      if (value < 24) return 24;
      return value;
   }

   // Accepts integer parameter length and fills arr in
   // Main's state with a number of random elements
   // equal to parameter length.
   resetArray(length) {
      const arr = [];
      for (let i = 0; i < length; i++) {
         arr.push(this.randomNumber(5, window.screen.height - 310));
      }
      this.setState({arr});
   }

   // Accepts integers min and max as paramters and returns
   // a random number between min (inclusive) and max (exclusive).
   randomNumber(min, max) {
      return Math.random() * (max - min) + min;
   }

   // Accepts a boolean parameter toggle and toggles all the buttons
   // on this page depending on the boolean value of toggle.
   toggleAllButtons(toggle) {
      const algorithmButtons = document.getElementsByClassName('algorithm-button');
      for (let i = 0; i < 4; i++) {
         algorithmButtons[i].disabled = toggle;
      }
      document.getElementsByClassName('create-array-button')[0].disabled = toggle;
      document.getElementsByClassName('start-sorting-button')[0].disabled = toggle;
      document.getElementsByClassName('num-elements')[0].disabled = toggle;
      document.getElementsByClassName('sorting-speed')[0].disabled = toggle;
   }

   // Executes at the end of the sorting animation.
   // Flashes all bars to the non-default color and back.
   // Toggles on all buttons on the page after the
   // finished sorting animation has run.
   finishedSortingAnimation() {
      const arrayBars = document.getElementsByClassName('array-bar');
      for (let i = 0; i < arrayBars.length; i++) {
         setTimeout(() => {
            this.setBarColor(i, this.state.COLOR, arrayBars);
            // After last bar has been changed to non-default color
            // wait 1000 milliseconds then turn every bar back to
            // the default color and toggle on buttons on page.
            if (i === arrayBars.length - 1) {
               setTimeout(() => {
                  for(let j = 0; j < arrayBars.length; j++) {
                     this.setBarColor(j, this.state.DEFAULT_COLOR, arrayBars);
                  }
                  this.toggleAllButtons(false);
               }, 1000)
            }
         }, i * 3)
      }
   }

   // Runs the animation function for the specific sort.
   // Toggles off all buttons before starting.
   runSortingAnimation() {
      this.toggleAllButtons(true);
      const algo = this.state.algo;
      if (algo === 'quick sort') this.quickSort();
      else if (algo === 'merge sort') this.mergeSort();
      else if (algo === 'bubble sort') this.bubbleSort();
      else this.selectionSort();
   }

   // Creates animations for the merge sort algorithm.
   mergeSort() {
      const animations = MergeSort(this.state.arr);
      const arrayBars = document.getElementsByClassName('array-bar');
      for (let i = 0; i < animations.length; i++) {
         const animation = animations[i];
         setTimeout(() => {
            // Change color of bars being compared.
            if (i % 3 < 2) {
               const color = i % 3 === 1 ? this.state.DEFAULT_COLOR : this.state.COLOR;
               this.setBarColor(animation[0], color, arrayBars);
               this.setBarColor(animation[1], color, arrayBars);
            } else { // Execute swap of values in array.
               this.setBarHeight(animation[0], animation[1], arrayBars);
            }
            // Triggered after final sorting animation finished.
            if (i === animations.length - 1) this.finishedSortingAnimation();
         }, i * (250 - this.state.SORTING_SPEED));
      }
   }

   // Creates animations for the quick sort algorithm.
   quickSort() {
      const animations = QuickSort(this.state.arr);
      const arrayBars = document.getElementsByClassName('array-bar');
      for (let i = 0; i < animations.length; i++) {
         const animation = animations[i];
         setTimeout(() => {
            // Change color of bars being compared.
            if (animation.length < 4) {
               const color = animation[0] === 0 ? this.state.DEFAULT_COLOR : this.state.COLOR;
               if (animation.length === 3) {
                  this.setBarColor(animation[1], color, arrayBars);
                  this.setBarColor(animation[2], color, arrayBars);
               } else {
                  this.setBarColor(animation[1], color, arrayBars);
               }
            } else { // Execute swap of values in array.
               this.setBarHeight(animation[2], animation[1], arrayBars);
               this.setBarHeight(animation[3], animation[0], arrayBars);
            }
            // Triggered after final sorting animation finished.
            if (i === animations.length - 1) this.finishedSortingAnimation();
         }, i * (250 - this.state.SORTING_SPEED))
      }
   }

   // Creates animations for the selection sort algorithm.
   selectionSort() {
      const animations = SelectionSort(this.state.arr);
      const arrayBars = document.getElementsByClassName('array-bar');
      for (let i = 0; i < animations.length; i++) {
         const animation = animations[i];
         setTimeout(() => {
            // Change color of bars being compared.
            if (animation.length < 4) {
               const color = animation[0] === 0 ? this.state.DEFAULT_COLOR : this.state.COLOR;
               this.setBarColor(animation[1], color, arrayBars);
            } else { // Execute swap of values in array.
               this.setBarHeight(animation[0], animation[3], arrayBars);
               this.setBarHeight(animation[1], animation[2], arrayBars);
            }
            // Triggered after final sorting animation finished.
            if (i === animations.length - 1) this.finishedSortingAnimation();
         }, i * (250 - this.state.SORTING_SPEED))
      }
   }

   // Creates animations for the bubble sort algorithm.
   bubbleSort() {
      const animations = BubbleSort(this.state.arr);
      const arrayBars = document.getElementsByClassName('array-bar');
      for (let i = 0; i < animations.length; i++) {
         const animation = animations[i];
         setTimeout(() => {
            // Change color of bars being compared.
            if (animation.length < 4) {
               const color = animation[0] === 0 ? this.state.DEFAULT_COLOR : this.state.COLOR;
               this.setBarColor(animation[1], color, arrayBars);
               this.setBarColor(animation[2], color, arrayBars);
            } else { // Execute swap of values in array.
               this.setBarHeight(animation[0], animation[3], arrayBars);
               this.setBarHeight(animation[1], animation[2], arrayBars);
            }
            // Triggered after final sorting animation finished.
            if (i === animations.length - 1) this.finishedSortingAnimation();
         }, i * (250 - this.state.SORTING_SPEED))
      }
   }

   // Accepts an integer index, string color, array arrayBars as parameters
   // and sets the bar at index to the specified color.
   setBarColor(index, color, arrayBars) {
      arrayBars[index].style.backgroundColor = color;
   }

   // Accepts an integer index, double height, array arrayBars as parameters
   // and sets the bar at index to the specified height.
   setBarHeight(index, height, arrayBars) {
      arrayBars[index].style.height = this.findHeight(height) + 'px';
      arrayBars[index].innerHTML = this.placeArrayValue(Math.floor(height));
   }

   // Render method for Main component.
   render() {
      return (
         <div className='page-container'>
            <div className='header'>
               <h1 className='title'>Sorting Algorithm Visualizer</h1>
               <div className='algorithm-button-container'>
                  <button
                     className='algorithm-button'
                     onClick={() => this.setAlgo(0)}
                     >Quick Sort
                  </button>
                  <button
                     className='algorithm-button'
                     onClick={() => this.setAlgo(1)}
                     >Merge Sort
                  </button>
                  <button
                     className='algorithm-button'
                     onClick={() => this.setAlgo(2)}
                     >Bubble Sort
                  </button>
                  <button
                     className='algorithm-button'
                     onClick={() => this.setAlgo(3)}
                     >Selection Sort
                  </button>
               </div>
               <button
                  className='create-array-button'
                  onClick={() => this.resetArray(this.state.NUM_BARS)}
                  >Create New Array
               </button>
               <button
                  className='start-sorting-button'
                  onClick={() => this.runSortingAnimation()}
                  disabled={!this.state.SORTABLE}
                  >Start
               </button>
               <div className='slider-container'>
                  <input
                     className='num-elements'
                     type='range'
                     value={this.state.NUM_BARS}
                     min='4'
                     max='100'
                     onChange={(evt) => this.changeNumElements(Math.floor(parseInt(evt.target.value)))}>
                  </input>
                  <p className='num-elements-text'>Array Size: {this.state.NUM_BARS}</p>
                  <input
                     className='sorting-speed'
                     type='range'
                     value={this.state.SORTING_SPEED}
                     min='0'
                     max='250'
                     onChange={(evt) => this.setState({SORTING_SPEED: Math.floor(parseInt(evt.target.value))})}>
                  </input>
                  <p className='sorting-speed-text'>Sorting Speed</p>
               </div>
            </div>
            <div className='array-container'>
               {this.state.arr.map((value, idx) => (
                  <div
                     className='array-bar'
                     key={idx}
                     style={{
                        backgroundColor: `${this.state.DEFAULT_COLOR}`,
                        height: `${this.findHeight(value)}px`,
                        width: `${(window.screen.width - 40) / this.state.NUM_BARS - 2}px`
                     }}>{this.placeArrayValue(value)}</div>
               ))}
            </div>
         </div>
      )
   }
}
