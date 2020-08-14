import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithm/sortingAlgorithm.js';
import './SortingVisualiser.css';

// This is the value to control the speed(ms)
const ANIMATION_SPEED = 6;

// This value controls the number of bars on screen
const NUMBER_OF_BARS = 140;



export default class SortingVisualiser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }


  componentDidMount() {
    this.resetArray();
  }


  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_BARS; i++) {
      array.push(randomInt(5, 660));
    }
    this.setState({ array });
  }


  render() {
    const { array } = this.state;

    return (
      <div container>
        <div class="button-container">
          <div class="buttons">
            <button class="generate-style" onClick={() => this.resetArray()}>Generate New Array</button>
          </div>
          <div class="buttons">
            <button class="button-style" onClick={() => this.mergeSort()}>Merge Sort</button>
          </div>
      </div>
      <div class="bars-container">
        {array.map((value, idx) => (
          <div
            class="bar"
            key={idx}
            style={{
              backgroundColor: 'green',
              height: `${value}px`,
            }}></div>
        ))}
      </div>
      </div>
    );
  }


  // SORTING


  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const bars = document.getElementsByClassName('bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = bars[barOneIdx].style;
        const barTwoStyle = bars[barTwoIdx].style;
        const color = i % 3 === 0 ? 'red' : 'green';
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = bars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED);
      }
    }
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
