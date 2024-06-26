import * as assert  from "node:assert";
import * as util from "node:util"
import { _Integer } from "./Integer/Integer.js";
import { _Float } from "./Float/Float.js";
import { _Stat } from "./Stat/Stat.js";
import { _Array } from "./Array/Array.js";
import { _String } from "./String/String.js";
import { _Null } from "./Null/Null.js";
import { _Matrix } from "./Matrix/Matrix.js";
import { _Strata } from "./Strata/Strata.js";
import { _Tree } from "./Tree/Tree.js";
import { _Object } from "./Object/Object.js";

export class RefinedTypes{
	constructor(map){
        this.map;
        if(new Object().is(map)['type']=='object'){
            try{map['null'].is()['type']=='null'}catch{map['null']=new _Null()}
            try{map['integer'].is()['integer']=='integer'}catch{map['integer']=new _Integer()}
            try{map['float'].is()['float']=='float'}catch{map['float']=new _Float()}
            try{map['stat'].is()['stat']=='stat'}catch{map['stat']=new _Stat()}
            try{map['string'].is()['string']=='string'}catch{map['string']=new _String()}
            try{map['array'].is()['array']=='array'}catch{map['array']=new _Array()}
            try{map['matrix'].is()['matrix']=='matrix'}catch{map['matrix']=new _Matrix()}
            try{map['object'].is()['object']=='object'}catch{map['object']=new _Object()}
            try{map['tree'].is()['tree']=='tree'}catch{map['tree']=new _Tree()}
            this.map=map
        }
        else{
            this.map={
                'null': new _Null(),
                'integer': new _Integer(),
                'float': new _Float(),
                'stat': new _Stat(),            
                'string': new _String(),
                'array': new _Array(),
                'matrix': new _Matrix(),
                'object': new _Object(),
                'tree': new _Tree()
                // 'strata': new _Strata()
            }
        }
    }

    //what kind of functions does a typemap need?
    random(exceptions=[]){
        var type = this.randomSample(Object.keys(this.subset(this.map, exceptions)))
        return this.map[type].random()
    }
    subset(set, exceptions){
        var subset={}
        for(var i=0; i<Object.keys(set).length; i++){
            var key = Object.keys(set)[i];
            if(!exceptions.includes(key)){
                subset[key]=set[key]
            }
        }
        return subset
    }
    //These assertions are for broad general type tests and range tests 
    assert(refType){
        if(this.is(refType)){
            return this.is(refType)['refType'].assert(refType)
        }else{
            throw Error('Error when calling assert(refType): refType is not an actual refined type')
        }
    }
    is(refType){
        //returns the context of the refType
        if(this.map['null'].is(refType)){return this.map['null'].is(refType)}
        else if(this.map['integer'].is(refType)){return this.map['integer'].is(refType)}
        else if(this.map['stat'].is(refType)){return this.map['stat'].is(refType)}
        else if(this.map['float'].is(refType)){return this.map['float'].is(refType)}
        else if(this.map['object'].is(refType)){return this.map['object'].is(refType)}
        else if(this.map['string'].is(refType)){return this.map['string'].is(refType)}
        else if(this.map['matrix'].is(refType)){return this.map['matrix'].is(refType)}
        else if(this.map['tree'].is(refType)){return this.map['tree'].is(refType)}
        else if(this.map['array'].is(refType)){return this.map['array'].is(refType)}
        else if(this.map['strata'].is(refType)){return this.map['strata'].is(refType)}
        else{return}
    }

    compare(thing1, thing2, comparison){
        if(!comparison){
            //do a simple type comparison
            if(this.typeOf(thing1)==this.typeOf(thing2)){return true}
        }else if(comparison=='shallow'){
            if(this.typeOf(thing1)==this.typeOf(thing2)){
                return this.map[this.typeOf(thing1)].compare(thing1, thing2, 'shallow')
            }
        }else if(comparison=='deep'){
            return this.map[this.typeOf(thing1)].compare(thing1, thing2, 'deep')
        }else{
            throw Error('compare needs comparison type')
        }

        //compares data by type map (shallow comparison)
        //or compares data deeply for which a type map is not needed
    }

    randomSample(arr){return arr[new _Integer(0, arr.length-1).random()]}


    typeOf(thing){
		//returns type of a thing, if its supported by Types, even if its not instantiated
        if(new _Null().is(thing)){return 'null'}
        else if(new _String().is(thing)){return 'string'}
        else if(new _Integer().is(thing)){return 'integer'}
        else if(new _Null().is(thing)){return 'null'}
        else if(new _Array().is(thing)){return 'array'}
        else if(new _Object().is(thing)){return 'object'}
        else if(new _Matrix().is(thing)){return 'matrix'}
        else if(new _Tree().is(thing)){return 'tree'}
        else if(new _Strata().is(thing)){return 'strata'}
        else{return}
	}
    //diff(){}//takes the difference between type maps

	log(refType){console.log(util.inspect(refType, false, null, true))}
}

