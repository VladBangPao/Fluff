import * as assert  from "node:assert";

export class _Stat{
    constructor(min, max){
        this.min=min; 
        this.max=max;
        this.context;
    }

    _context(stat){return {'type':'stat','data':stat,'min':this.min,'max':this.max}}

    is(stat){if(stat){try{this.assert(stat)}catch{return;} return true}}

    random(min, max, precision=100){
        var _min; var _max;
        if(min){_min=min}else if(this.min || this.compare(this.min, 0.0)){_min=this.min}else{_min=0.0000000001}
        if(max){_max=max}else if(this.max){_max=this.max}else{_max=1.0000000000}
        this.context = this._context(this._randomRange(_min, _max, precision))
        return this.context['data']
    }

    assert(stat, min, max){
        assert.equal(this._isStat(stat), true)

        if(min){assert.equal(stat>=min, true)}
        else{assert.equal(stat>=this.min, true)}

        if(max){assert.equal(stat<=max, true)}
        else{assert.equal(stat<=this.max, true)}

        return true
    }
    
    compare(stat1, stat2, operation, precision=10){
        if(operation=='gt'){
            return this.greaterThan(stat1, stat2)
        }else if(operation=='lt'){
            return this.lessThan(stat1, stat2)
        }else if(operation=='gte'){
            if(stat1.toPrecision(precision)==stat2.toPrecision(precision)){return true}
            return this.greaterThan(stat1, stat2)
        }else if(operation=='lte'){
            if(stat1.toPrecision(precision)==stat2.toPrecision(precision)){return true}
            return this.lessThan(stat1, stat2)
        }else{
            return stat1.toPrecision(precision)==stat2.toPrecision(precision)
        }
    }

    lessThan(A, B) {var Epsilon = 0.0000000001;return (A - B < Epsilon) && (Math.abs(A - B) > Epsilon);};
    greaterThan(A, B) {var Epsilon = 0.0000000001;return (A - B > Epsilon) && (Math.abs(A - B) > Epsilon);};
    
    _isStat(n){return Number(n) === n && n % 1 !== 0;}

    _randomRange(min, max, precision){
        const str = (Math.random() * (max - min) + min).toFixed(precision);
        return parseFloat(str);
    }

    _log(stat){if(stat){console.log(util.inspect(stat, false, null, true))}}
}
