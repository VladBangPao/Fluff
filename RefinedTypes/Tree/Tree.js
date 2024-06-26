import * as assert  from "node:assert";
import { _String } from "../String/String.js";
import { _Integer } from "../Integer/Integer.js";
import * as util from "node:util"
import { DefaultMap } from "../Default/DefaultMap.js";

export class _Tree{
    constructor(min_width, max_width, min_depth, max_depth, map){
        this.min_width; this.max_width; this.min_depth; this.max_depth;
        if(min_width||min_width==0){this.min_width=min_width;}else{this.min_width=DefaultMap['tree_min_width']}
        if(max_width||max_width==0){this.max_width=max_width;}else{this.max_width=DefaultMap['tree_max_width']}
        if(min_depth||min_depth==0){this.min_depth=min_depth;}else{this.min_depth=DefaultMap['tree_min_depth']}
        if(max_depth||max_depth==0){this.max_depth=max_depth;}else{this.max_depth=DefaultMap['tree_max_depth']}
        this.context;
    }
    _context(tree){
        return {
            'type':'tree',
            'data':tree,
            'depth': this.depth(tree),
            'refType':this,
            'min_width':this.min_width,
            'max_width':this.max_width,
            'min_depth':this.min_depth,
            'max_depth':this.max_depth,
            'map':this.map
        }
    }

    is(tree){try{this.assert(tree)}catch{return}; return this._context(tree)
}

    assert(tree){
        assert.equal(this.depth(tree)<=this.max_depth, true)
        assert.equal(this.depth(tree)>=this.min_depth, true)
        assert.equal(this._max_width(tree)<=this.max_width, true)
        assert.equal(this._min_width(tree)>=this.min_width, true)
    }

    _min_width(tree, w=[Infinity]){
        if(this._isObject(tree)){
            if(Object.keys(tree).length<=w[0]){w[0]=Object.keys(tree).length}
            for(var i = 0; i<Object.keys(tree).length; i++){
                var key = Object.keys(tree)[i]
                this._min_width(tree[key], w)
            }
        }

        return w[0]
    }

    _max_width(tree, w=[0]){
        if(this._isObject(tree)){
            if(Object.keys(tree).length>=w[0]){w[0]=Object.keys(tree).length}
            for(var i = 0; i<Object.keys(tree).length; i++){
                var key = Object.keys(tree)[i]
                this._max_width(tree[key], w)
            }
        }
        return w[0]
    }

    depth(tree, n=0, d=[0]){
        if(this._isObject(tree)){
            for(var i = 0; i<Object.keys(tree).length; i++){
                if(n>=d[0]){d[0]=n}
                var key = Object.keys(tree)[i]
                this.depth(tree[key], n+1, d)
            }
        }
        return d[0]
    }

    random(tree={}, depth=new _Integer(this.min_depth, this.max_depth).random(), width=new _Integer(this.min_width, this.max_width).random(), n=0){
        //we want to load the matrix with sub-matricies so long as depth > 0
        //if depth == 0 we want to fill it with some data
        if(n==0 && depth==0){
            this.context = this._context(tree)
            return this.context['data']
        }
        if(depth>1){
            for(var i = 0; i<width; i++){
                var key = new _String(5, 20).random()
                tree[key]={}
                this.random(tree[key], depth-1, width)
            }
        }else if(depth==1){
            for(var i = 0; i<width; i++){
                var key = new _String(5, 20).random()
                tree[key]=new _Integer(0, 100).random()
            }
        }
        this.context = this._context(tree)
        return this.context['data']
    }
    
    _isObject(object){return (object && typeof object === 'object' && object.constructor === Object);}

    compare(){
        //compares data by type map (shallow comparison)
        //or compares data deeply for which a type map is not needed
    }

    log(obj){if(obj){console.log(util.inspect(obj, false, null, true))}}
   
}
//a tree of depth 0 is: {}
//a tree of depth 1 is: {'1':{}} etc.
