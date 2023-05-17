// Question 1:

// Write a function called getMaxSum that takes an array of integers as input and returns the maximum sum of any contiguous subarray of the given array. If the array is empty or contains only negative integers, the function should return 0.
export function getMaxSum(arr) {
    if (arr.length === 0 || Math.max(...arr) < 0){
        return 0;
    }

    let maxSum = 0;
    let newSum = 0;

    for(let i = 0; i < arr.length; i++){
        newSum += arr[i];
        if(newSum < 0){
            newSum = 0;
        }

        if(newSum > maxSum){
            maxSum = newSum;
        }
    }

    return maxSum;        

}

// Question 2:

// Write a function called uniqueChars that takes a string as input and returns a new string containing only the unique characters in the input string, in the order that they first appear. If the input string is empty or contains only whitespaces, the function should return an empty string.

// For example, if the input string is "hello world", the function should return "helo wrd".

export function uniqueChars(str) {
    if(str.trim() === ''){
        return '';
    }

    let uniqueStr = '';
    
    for(let i = 0; i < str.length; i++){
        const characters = str[i];
        
        if(uniqueStr.indexOf(characters) === -1){
            uniqueStr += characters;
        }
    }

    return uniqueStr;
}
