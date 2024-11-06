/**
 * Complex Type Definition
 */
type ComplexNumber = {
    real: number;
    imag: number;
}

/**
 * Type Definitions
 */
type NonNegativeRealPart<C extends ComplexNumber> = `${C["real"]}` extends `-${string}` ? never : C;
type NegativeRealPart<C extends ComplexNumber> = `${C["imag"]}` extends `-${string}` ? C : never;

/**
 * Type Narrowing Function Definitions
 */
const isNumberNonNegative = <C extends ComplexNumber>(c: C): c is NonNegativeRealPart<C> => {
    return c.real >= 0;
}

const isNumberNegative = <C extends ComplexNumber>(c: C): c is NegativeRealPart<C> => {
    return c.real < 0;
}

/**
 * Higher Order Function Definition
 */
const performOperationsOnNumber = <C extends ComplexNumber>(
    c: C,
    nonNegativeOperation: (input: NonNegativeRealPart<C>) => void,
    negativeOperation: (input: NegativeRealPart<C>) => void,
) => {
    if(isNumberNonNegative(c)) {
        return nonNegativeOperation(c);
    }

    if(isNumberNegative(c)) {
        return negativeOperation(c);
    }
}

/**
 * Test examples
 */
const testNumber = { real: -5, imag: -2 } as const;
const testNonNegativeOperation = (input: ComplexNumber) => {
    return input;
}
const testNegativeOperation = (input: ComplexNumber) => {
    return { real: -input.real, imag: input.imag };
}

/**
 * Get result
 */
const output = performOperationsOnNumber(
    testNumber,
    testNonNegativeOperation,
    testNegativeOperation
);

/**
 * Log result
 */
console.log(output);
