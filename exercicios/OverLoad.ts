//Function OverLoad

function arondNumber(e: number): number;
function arondNumber(e: string): string;
function arondNumber(e: number | string): number | string {
    if (typeof e === 'number') {
        return Math.ceil(e);
    } else {
        return Math.ceil(Number(e)).toString();
    }
}

console.log(arondNumber('4.3'));
console.log(arondNumber(5.2));