import { TypeMap } from "./TypeMap.js"
import { IntegerTest } from "./Integer/Test.js"
import { StringTest } from "./String/Test.js"
import { NullTest } from "./Null/Test.js"


class TypeMapTest{
    constructor(){
        this.tests()
    }
    tests(){
        new IntegerTest()
        new StringTest()
        new NullTest()
    }
}

new TypeMapTest()