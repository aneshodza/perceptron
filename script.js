console.log('Loaded js')
var mouseDown = 0;
let desiredOutput = false
let showWeights = false
document.body.onmousedown = function () {
    ++mouseDown;
}
document.body.onmouseup = function () {
    --mouseDown;
}
let perceptorInput = document.querySelector('div#perceptor-input')
let selectedGrid = Array(20)
for (let i = 0; i < selectedGrid.length; i++) {
    selectedGrid[i] = Array(selectedGrid.length);
    for (let j = 0; j < selectedGrid.length; j++) {
        selectedGrid[i][j] = false;
    }
}
let buttonRefs = Array(20)
const regex = /[0-9]*/
for (let i = 0; i < 20; i++) {
    buttonRefs[i] = Array(20)
    for (let j = 0; j < 20; j++) {
        let button = document.createElement("button")
        buttonRefs[i][j] = button
        button.className = i + " " + j
        button.addEventListener("mouseover", () => {
            if (mouseDown) {
                button.style.backgroundColor = "grey"
                selectedGrid[button.className.split(" ")[0]][button.className.split(" ")[1]] = true
            }
        })
        perceptorInput.appendChild(button)
    }
}
let weights = Array(20)
for (let i = 0; i < weights.length; i++) {
    weights[i] = Array(weights.length);
    for (let j = 0; j < weights.length; j++) {
        weights[i][j] = 0;
    }
}

function improve(neurons, weights, learnSteps, desiredOutput) {
    console.log("improving...")
    for (let i = 0; i < neurons.length; i++) {
        for (let j = 0; j < neurons.length; j++) {
            if (neurons[i][j]) {
                if (desiredOutput) {
                    weights[i][j] += learnSteps
                } else {
                    weights[i][j] -= learnSteps
                }
            }
        }
    }
    console.log("Done improving. I adjusted the weights")
}

function run(neurons, weights) {
    sum = 0
    for (let i = 0; i < neurons.length; i++) {
        for (let j = 0; j < neurons.length; j++) {
            sum += neurons[i][j] * weights[i][j]
        }
    }
    return sum >= 0
}

function executeAlgorithm(neurons, weights, learnSteps, desiredOutput) {
    shape = run(neurons, weights); //True means circle, false means square
    if (shape) {
        console.log("I think it's a circle")
    } else {
        console.log("I think it's a square")
    }

    if (shape && !desiredOutput) {
        console.log("I gave the wrong awnser, the shape was a square")
        improve(neurons, weights, learnSteps, desiredOutput)
    } else if (!shape && desiredOutput) {
        console.log("I gave the wrong awnser, the shape was a circle")
        improve(neurons, weights, learnSteps, desiredOutput)
    } else {
        console.log("I gave the right awnser")
    }
}

function reset() {
    for (let i = 0; i < selectedGrid.length; i++) {
        for (let j = 0; j < selectedGrid.length; j++) {
            buttonRefs[i][j].style.backgroundColor = "white"
            selectedGrid[i][j] = false
        }
    }
}

function weightshandler() {
    showWeights = !showWeights
    if (showWeights) {
        for (let i = 0; i < selectedGrid.length; i++) {
            for (let j = 0; j < selectedGrid.length; j++) {
                if (weights[i][j] !== 0) {
                    console.log(weights[i][j])
                    console.log(255 - Math.abs(weights[i][j] * 25.5))
                }
                if (weights[i][j] > 0) {
                    if (weights[i][j] * 100 <= -255) {
                        buttonRefs[i][j].style.backgroundColor = "rgb(0, 255, 0)"
                    } else {
                        buttonRefs[i][j].style.backgroundColor = "rgb(" + (255 - weights[i][j] * 100).toString() + ", 255, 0)"
                    }
                } else if (weights[i][j] < 0) {
                    if (weights[i][j] * 100 >= 255) {
                        buttonRefs[i][j].style.backgroundColor = "rgb(255, 0, 0)"
                    } else {
                        buttonRefs[i][j].style.backgroundColor = "rgb(255, " + (255 + weights[i][j] * 100).toString() + ", 0)"
                    }
                } else {
                    buttonRefs[i][j].style.backgroundColor = "rgb(255, 255, 0)"
                }

            }
        }
    } else {
        for (let i = 0; i < selectedGrid.length; i++) {
            for (let j = 0; j < selectedGrid.length; j++) {
                if (selectedGrid[i][j]) {
                    buttonRefs[i][j].style.backgroundColor = "grey"
                } else {
                    buttonRefs[i][j].style.backgroundColor = "white"
                }

            }
        }
    }
}