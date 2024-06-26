import { _Float } from "./Float.js";
import * as assert from "node:assert"

export class _FloatTest{
    constructor(n){this.tests(n)}
    tests(n){
        for(var i = -10.000; i<n; i+=0.001){
            var random = new _Float(i, n).random()
            console.log(i, n,new _Float(i, n).is(random))
            console.log('assertion should not fail', new _Float(i, n).assert(random))
        }
    }
}
