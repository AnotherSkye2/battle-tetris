import { fromEvent,filter,throttleTime } from 'https://cdn.jsdelivr.net/npm/rxjs@7.8.1/+esm';

export const arrowUp$ = fromEvent(document, "keydown").pipe(
    filter((event) => event.key === "ArrowUp"),
    throttleTime(100)  
);
export const arrowDown$ = fromEvent(document, "keydown").pipe(
    filter((event) => event.key === "ArrowDown"),
);
export const arrowLeft$ = fromEvent(document, "keydown").pipe(
    filter((event) => event.key === "ArrowLeft"),
);
export const arrowRight$ = fromEvent(document, "keydown").pipe(
    filter((event) => event.key === "ArrowRight"),
);
export const spaceBar$ = fromEvent(document, "keydown").pipe(
    filter((event) => event.key === " "),
    throttleTime(100)  
);

export const escKey$ = fromEvent(document, "keydown").pipe(
    filter((event) => event.key === "Escape"),
    throttleTime(100)  
)