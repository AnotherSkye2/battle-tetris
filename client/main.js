
import { fromEvent,filter } from 'rxjs';
let rotate = 0;
let intervalId; 

function rotateBlock() {
    console.log("Rotating block...");
    rotate += 90;

    const activeShape = document.getElementById("activeBlock");
    if (activeShape) {
        activeShape.style.transform = `rotate(${rotate}deg)`;
    }
}

function moveShapeDown(){
    const activeShape = document.getElementById("activeBlock");
    const container = document.getElementById("container")
    if (container) {
        const currentTop = parseInt(container.style.top) || 0; 
        container.style.top = `${currentTop + 50}px`; 
    }
}


const arrowUp$ = fromEvent(document, "keydown").pipe( // dollar sign additakse Observablitele RsJx-is
    filter((e) => e.key === "ArrowUp")
)

arrowUp$.subscribe(rotateBlock)
arrowUp$.subscribe(() => {

    if (intervalId) {
        clearInterval(intervalId);
    }
     intervalId = setInterval( () => {
        moveShapeDown()
    },1000)
})
 