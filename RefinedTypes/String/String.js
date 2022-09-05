import * as assert  from "node:assert";
import { _Number } from "../Integer/Integer.js";
export class _String{
    constructor(min, max, charSet){
        this.min=min
        this.max=max
        this.charSet='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    }
    
    context(string){
        return {
			'type':'string',
			'data':string,
            'min':this.min,
            'max':this.max,
            //'pattern':undefined //some regex pattern (we need that regex generator for this feature)
        }
    }

    is(string){
        //return true if it is a string
        if(string){try{assert.equal(this._isString(string), true)}catch{return}
            if(this.min){try{assert.equal(this.min <= string.length, true)}catch{return}}
            if(this.max){try{assert.equal(this.max >= string.length, true)}catch{return}}
			return this.context(string)
        }
    }

    random(min, max){
        var _min; var _max;
        if(min){_min=min}else if(this.min){_min=this.min}else{_min=1}
        if(max){_max=max}else if(this.max){_max=this.max}else{_max=10}
        return this.randomString(_min, _max)
    }

    _isString(string) {return (string instanceof String || typeof(string) === 'string');}

    randomString(min, max){
		var str='';
        for (var i=0; i<new _Integer().randomRange(min, max); i++){
			str+=this.charSet.charAt(Math.floor(Math.random()*this.charSet.length))
		}
        return str;
	}

    log(obj){if(obj){console.log(util.inspect(obj, false, null, true))}}
}