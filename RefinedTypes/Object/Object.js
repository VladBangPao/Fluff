import * as assert  from "node:assert";

export class _Object{
    constructor(min_width, max_width, map){
        this.min_width=min_width;
        this.max_width=max_width;
        this.map=map;

    }
    


    context(object){
        return {
            'type':'object',
            'object': object,
            'min_width':this.min_width,
            'max_width':this.max_width,
            'map':{
                //you can map keys to types
            }
        }
    }
    is(object){
        //return true if it is an object
        if(object){
            if(this.map){if(!this._isMapped(object)){return}}
            try{assert.equal(this._isObject(object), true)}catch{return}
            if(this.min_width){try{assert.equal(this.min_width <= this.width(object), true)}catch{return}}
            if(this.max_width){try{assert.equal(this.max_width >= this.width(object), true)}catch{return}}
            return this.context(object)
        }
    }

    _isMapped(object){
        if(this._isObject(object)){
            //object keys and values must correspond to the map
            var keys = Object.keys(object)
            var mapKeys= Object.keys(this.map)
            mapKeys = mapKeys.filter(v => v !== 'types');
            for(var i = 0; i<mapKeys.length; i++){
                mapKeys[i]
            }
        }else{
            return false
        }
    }
    width(object){if(this._isObject(object)){return Object.keys(object).length}}

    _isObject(obj){
		if(obj instanceof Object && obj!==null){
            for(var i = 0; i<Object.keys(obj).length; i++){
                var key = Object.keys(obj)[i]
                if(obj[key] instanceof Object && obj!==null){
                    return false
                }
            }            
			return true
		}else{
			return false
		}
	}

    log(obj){if(obj){console.log(util.inspect(obj, false, null, true))}}
}

new _Object(3, 7,{
    //random()rules: object maps are evaluated on a specific to general basis
    //where random() must produce the specified keys in total before resorting
    // to random keys associated with random types specified by the array
    //is() rules: checking whether some object 'exists' as a refined _Object
    //checks against the existing well defined keys, and if all of those keys are
    //not present, it will not be evaluated any further
    //furthermore, typemaps must also abide by the min max rules if they exist
    //for an _Object
    '1':new _Integer(0, 100),
    '2':new _String(1, 10),
    '3':new _Integer(101, 200),
    '4':new _String(11, 20),
    'types':[
        new _Null([null, 'null', false, 'false', 0, '0']), 
        new _Array(1, 10, {'types':[new _Integer(0, 50), 
            new _String(1, 20)]})
    ]
})