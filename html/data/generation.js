const generation = {};

const bornes = [
    [1,   151,  1],
    [152, 251,  2],
    [252, 386,  3],
    [387, 493,  4],
    [494, 649,  5],
    [650, 721,  6],
    [722, 809,  7],
    [810, 898,  8],
];

for (const [debut, fin, gen] of bornes) {
    for (let id = debut; id <= fin; id++) {
        generation[id] = gen;
    }
}
