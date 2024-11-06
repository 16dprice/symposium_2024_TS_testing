/**
 * Types
 */
type Vector2 = { x: number; y: number; }
type Vector3 = { x: number; y: number; z: number; }

/**
 * Magnitude functions
 */
const vector2Magnitude = (vec: Vector2) => {
    return Math.sqrt(
        vec.x * vec.x +
        vec.y * vec.y
    )
}

const vector3Magnitude = (vec: Vector3) => {
    return Math.sqrt(
        vec.x * vec.x +
        vec.y * vec.y +
        vec.z * vec.z
    )
}

/**
 * Test objects
 */
const testVector2: Vector2 = {
    x: 3,
    y: 4
}

const testVector3: Vector3 = {
    x: 3,
    y: 4,
    z: 5
}

const someOtherWeirdObject = {
    x: 3,
    y: 4,
    z: 5,
    someOtherProperty: "abc123",
    foo: "bar",
    baz: undefined
}

/**
 * Log some results
 */
console.log(vector3Magnitude(testVector3))
console.log(vector3Magnitude(someOtherWeirdObject))

console.log(vector2Magnitude(testVector2))
console.log(vector2Magnitude(testVector3))

console.log("\n\n--------------------------------\n\n")

/**
 * Type inference functions
 */
const isVector3 = (v: object): v is Vector3 => {
    if(
        "x" in v && typeof v.x === "number" &&
        "y" in v && typeof v.y === "number" &&
        "z" in v && typeof v.z === "number"
    ) return true;

    return false;
}

const isVector2 = (v: object): v is Vector2 => {
    if(
        "x" in v && typeof v.x === "number" &&
        "y" in v && typeof v.y === "number"
    ) return true;

    return false;
}

/**
 * Higher order function
 */
const doSomethingToVector = <V2Output, V3Output>(
    v: object,
    vector2Operation: (input: Vector2) => V2Output,
    vector3Operation: (input: Vector3) => V3Output,
) => {
    if(isVector2(v)) {
        return vector2Operation(v);
    }
    if(isVector3(v)) {
        return vector3Operation(v);
    }
    return null;
}

/**
 * Get outputs
 */
let nullOutput, v2Output, v3Output;

nullOutput = doSomethingToVector(
    {},
    vector2Magnitude,
    vector3Magnitude
)
v2Output = doSomethingToVector(
    { x: 1, y: 1 },
    vector2Magnitude,
    vector3Magnitude
)
v3Output = doSomethingToVector(
    { x: 1, y: 1, z: 1 },
    vector2Magnitude,
    vector3Magnitude
)

console.log("Null output: ", nullOutput)
console.log("v2 output: ", v2Output)
console.log("v3 output: ", v3Output)

console.log("\n\n--------------------------------\n\n")





















/**
 * Fixed higher order function
 */
const doSomethingToVector_BETTER = <V2Output, V3Output>(
    v: object,
    vector2Operation: (input: Vector2) => V2Output,
    vector3Operation: (input: Vector3) => V3Output,
) => {
    if(isVector3(v)) {
        return vector3Operation(v);
    }
    if(isVector2(v)) {
        return vector2Operation(v);
    }
    return null;
}

nullOutput = doSomethingToVector_BETTER(
    {},
    vector2Magnitude,
    vector3Magnitude
)
v2Output = doSomethingToVector_BETTER(
    { x: 1, y: 1 },
    vector2Magnitude,
    vector3Magnitude
)
v3Output = doSomethingToVector_BETTER(
    { x: 1, y: 1, z: 1 },
    vector2Magnitude,
    vector3Magnitude
)

console.log("Null output: ", nullOutput)
console.log("v2 output: ", v2Output)
console.log("v3 output: ", v3Output)
