// Print Array based on user input
function printArray(array) {
    const container = document.getElementById('arrayContainer');
    
    let html = '<ul>';
    array.forEach(item => {
        html += `<li>${item}</li>`;
    });
    html += '</ul>';
    
    container.innerHTML = html;
}

// Update array colours
function updateElement(index, color) {
    const listItems = document.querySelectorAll('#arrayContainer li');
    listItems[index].style.backgroundColor = color;
    console.log("Complete");
}

// Update current index display
function updateIndex(newIndex) {
    const currIndex = document.getElementById('indexCounter');
    currIndex.innerHTML = `<p>Current Index: ${newIndex}</p>`
}

function waitForButtonClick() {
    const button = document.getElementById('nextButton');
    return new Promise(resolve => {
        button.addEventListener('click', function handler() {
            button.removeEventListener('click', handler); // Remove the handler after the first click
            resolve();
        });
    });
}

// Actual traversal & Step tracker
async function StepLoop(number, array) {
    const resultContainer = document.getElementById('resultContainer');
    for (let i = 0; i < array.length; i++) {
        // Highlight current element
        updateElement(i, 'gray');
        updateIndex(i);
        
        // Wait for the button press
        await waitForButtonClick();

        if (array[i] == number) {
            updateElement(i, 'green');
            
            resultContainer.innerHTML = `<p>Status: Found</p>`
            return;
        } else {
            updateElement(i, 'white');
        }
    }
    return;
}

// Search Initialiser
function startSearch() {
    const inputArray = document.getElementById('input-array');
    const inputNumber = document.getElementById('input-number');
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = 'Status: Not Found';
    let ArrayCSV = inputArray.value;
    let NumValue = parseFloat(inputNumber.value);

    if (ArrayCSV.trim() === '') {
        ArrayCSV = "1,2,3,4,5";
    }
    if (isNaN(NumValue)) {
        NumValue = 4;
    }

    const stringArray = ArrayCSV.split(',');
    const numberArray = stringArray.map(Number);

    printArray(numberArray);
    StepLoop(NumValue, numberArray);
}





document.addEventListener("DOMContentLoaded", function() {
    const codeSelector = document.getElementById("language-selector");
    const codeDisplay = document.getElementById("code-display");

    const codeSnippets = {
        python: `def LinearSearch(input_array, target_value):
        
    # Loop through each item in the array
    for index in range(len(input_array) - 1):
        
        # If we found our item, we return the index where it is stored
        if input_array[index] == target_value:
        
            return index
        
    # If our item is not in the list, return -1
    return -1`,
        javascript: `function LinearSearch(input_array, target_value) {

    // Loop through each item in the array
    for (let i = 0; i < input_array.length; i++) {

        // If we found our item, we return the index where it is stored
        if (input_array[i] === target_value) {
            return i;
        }
    }
    
    // If our item is not in the list, return -1
    return -1;
    }`
    };

    function updateCodeDisplay() {
        const selectedOption = codeSelector.value;
        codeDisplay.textContent = codeSnippets[selectedOption];
        codeDisplay.className = `language-${selectedOption}`;
        hljs.highlightElement(codeDisplay); // Apply highlighting
    }

    codeSelector.addEventListener("change", updateCodeDisplay);

    // Initialize the display with the first option
    updateCodeDisplay();
});