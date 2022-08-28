import * as assert  from "node:assert";

export class Null{
    constructor(nullTypes=[]){
        try{
            if(nullTypes.includes(undefined)){throw Error('nullTypes cannot contain undefined')}
        }catch{
            throw Error('nullTypes must be of type array')
        }
        this.nullTypes=nullTypes
    }

    context(){
        return {
            'nullTypes':this.nullTypes
        }
    }
    exists(){return true}

    is(nullType){
        try{
            console.log(nullType)
            assert.equal(this.nullTypes.includes(nullType), true)
        }catch(err){
            return
        }
        return 'null'
    }
    log(obj){
        if(obj){
            console.log(util.inspect(obj, false, null, true))
        }
    }
}