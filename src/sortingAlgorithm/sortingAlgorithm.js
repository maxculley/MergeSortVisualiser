export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const secondArray = array.slice();
    mergeSortHelper(array, secondArray, 0, array.length - 1, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    secondArray,
    startIndex,
    endIndex,
    animations,
  ) {
    if (startIndex === endIndex) return;
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    mergeSortHelper(secondArray, mainArray, startIndex, middleIndex, animations);
    mergeSortHelper(secondArray, mainArray, middleIndex + 1, endIndex, animations);
    merge(mainArray, secondArray, startIndex, middleIndex, endIndex, animations);
  }
  
  function merge(
    mainArray,
    secondArray,
    startIndex,
    middleIndex,
    endIndex,
    animations,
  ) {
    let k = startIndex;
    let i = startIndex;
    let j = middleIndex + 1;
    while (i <= middleIndex && j <= endIndex) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (secondArray[i] <= secondArray[j]) {
        animations.push([k, secondArray[i]]);
        mainArray[k++] = secondArray[i++];
      } else {
        animations.push([k, secondArray[j]]);
        mainArray[k++] = secondArray[j++];
      }
    }
    while (i <= middleIndex) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, secondArray[i]]);
      mainArray[k++] = secondArray[i++];
    }
    while (j <= endIndex) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, secondArray[j]]);
      mainArray[k++] = secondArray[j++];
    }
  }
  