function singleRGBValue() {
    let oneValue = Math.random();
    oneValue  = oneValue  * 255;
    oneValue  = Math.round(oneValue);
    return oneValue;
}

function generateRandomColor(){
    // POS - best to avoid single letter variables as they can be confusing and difficult for 
    // other developers to figure out what they are in large files (except for i, j when using loops)
    red = singleRGBValue();
    green = singleRGBValue();
    blue = singleRGBValue();
    let randomColor = `rgb(${red},${green},${blue})`;
    return randomColor
};

// POS - removed generateRandomColor as an argument, there's no need to pass it as an argument - it 
// exists in the same context as the function that is calling it so it will be accessible
function buildColorSelection(){
    let colorSelection = [];
    for(let colors = 0; colors < 8; colors++){
        colorSelection.push(generateRandomColor());
    }
    return colorSelection
};