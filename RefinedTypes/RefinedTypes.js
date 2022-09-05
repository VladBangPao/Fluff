import * as assert  from "node:assert";
import * as util from "node:util"
import { _Number } from "./Integer/Integer.js";
import { _String } from "./String/String.js";
import { _Null } from "./Null/Null.js";
import { _Matrix } from "./Matrix/Matrix.js";
import { _Strata } from "./Strata/Strata.js";
import { _Tree } from "./Tree/Tree.js";

export class RefinedTypes{
	constructor(typeMap){
        this.typeMap;
        if(typeMap){this.typeMap=typeMap}
        else{
            this.typeMap={
                'number':new _Number(-1000, 1000),
                'string': new _String(0, 100),
                'matrix': new _Matrix(0, 5),
                'null': new _Null([null, false, 0]),
                'tree': new _Tree(0, 5)
            }
        }
    }

    //what kind of functions does a typemap need?
    random(){
        var type = this.randomSample(Object.keys(this.typeMap))
        return this.typeMap[type].random()
    }

    randomSample(arr){return arr[new _Integer().randomRange(0, arr.length-1)]}

    //These assertions are for broad general type tests and range tests 
    assert(){
        //asserts the data is in accordance with typemap. If typemap is not present, assert
        //always returns true, unless it is of undefined type
    }

    compare(){
        //compares data by type map (shallow comparison)
        //or compares data deeply for which a type map is not needed
    }
    
    //checks the thing or data against the definition of the type map. If it exists in 
    //a pre-defined form returns the type
    is(thing){return this.typeMap[this.typeOf(thing)].is(thing)}

    typeOf(thing){
		//returns type of a thing, if its supported by Types, even if its not instantiated
        if(new _Null().is(thing)){return 'null'}
        else if(new _String().is(thing)){return 'string'}
        else if(new _Integer().is(thing)){return 'integer'}
        else if(new _Matrix().is(thing)){return 'matrix'}
        else if(new _Tree().is(thing)){return 'tree'}
        else if(new _Strata().is(thing)){return 'strata'}
        else{return}
	}
    //diff(){}//takes the difference between type maps

	log(){if(this.typeMap){console.log(util.inspect(this.rawTypeMap, false, null, true))}}
}