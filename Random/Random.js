export class Random{
	//RANDOM GENERATORS----------------------------------------------------
	randStr(n, array=false){
		if(array){
			var arr=[]; 
			for(var i=0;i<n;i++){arr.push(this.genStr(this.randRange(0, n)))}; 
			return arr;
		}else{
			return this.genStr(this.randRange(0, n));
		}
	}

    randInt(n, array=false){
		if(array){
			var arr=[]; 
			for(var i=0; i<n; i++){arr.push(this.randRange(0, n))};
			return arr;
		}else{
			return this.randRange(0,n);
		}
	}

    randArr(n, array=false){
		if(array){
			var arrOfArr=[]
			for(var i = 0; i<n; i++){
				var arr = []
				for(var j=0;j<n;j++){
					arr.push(this.rand(n))
				}; 
				arrOfArr.push(arr)
			}
			return arrOfArr
		}else{
			var arr=[]; 
			for(var i=0;i<n;i++){
				arr.push(this.rand(n))
			}; 
			return arr;
		}
	}

	randStrata(nMin, nMax, mMin, mMax, pk=['payload']){
		var n = this.randRange(nMin, nMax)
		var m = this.randRange(mMin, mMax)

	}

	//strata is always an array of objects, each with a single key associated with undefined or another strata
	recursiveStrata(n, m, pk, strata=[]){
		//n is passed to _baseStrata(n, pk)
		for(var i = 0; i<n; i++){
			//we are trying to generate m number of recursive strata levels
			if(m==0){
				if(this.randMod10()){
					strata.push({[this.uniqueId()]:undefined, [this.randSelection(pk)]:this.randObj(2, false)})
				}else{
					strata.push({[this.uniqueId()]:undefined})

				}
			}else if(m>0){
				if(this.randMod10()){
					var _strata = {[this.uniqueId()]:[], [this.randSelection(pk)]:this.randObj(2, false)}
					this.recursiveStrata(n, m-1, pk, _strata[this.strataKey(_strata, pk)])
					strata.push(_strata)
				}else{
					var _strata = {[this.uniqueId()]:[]}
					this.recursiveStrata(n, m-1, pk, _strata[this.strataKey(_strata, pk)])
					strata.push(_strata)
				}
				
			}
		}
		return strata
	}

	strataKey(strataObj, pk){
		var count=0;
		var strataKey;
		for(var i=0; i<Object.keys(strataObj).length; i++){
			if(!pk.includes(Object.keys(strataObj)[i])){
				strataKey=Object.keys(strataObj)[i]
			}
		}
		if(count>1){
			//if there is more than one strataKey, throw error (to catch bugs)
			throw Error("more than one strataKey found in", strataObj)
		}else{
			return strataKey
		}
	}


    rand(n){return eval(this.sample(['this.randStr', 'this.randInt', 'this.randObj'])+'(n, this.randMod10())')}
    // randEnc(n){return "utf8"}
    // randEncArr(n){return ['utf8']}
    randObj(n, array=false){
		//O(nlognlogn) growth complexity
		if(array){
			var objArr=[]
			for(var i=0; i<n; i++){
				objArr.push(this._randObj(n))
			}
			return objArr
		}else{
			return this._randObj(n)
		}
	};
	_randObj(n){
		var obj={}
			if(n){
				for(var i=0; i<n; i++){
					obj[this.randStr(20)]=this._randObj(n-1)
				}
			}
			return obj
	}

    randSelection(bag){
        return bag[Math.floor(Math.random() * bag.length)];
    }
    randRange(min, max){
        return Math.floor(Math.random()*(max-min+1)+min)
    }
    genStr(len, chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'){
        //programiz.com
        var str='';
        for (var i = 0; i<len; i++){str+=chars.charAt(Math.floor(Math.random()*chars.length))}
        return str;
    }
    randMod10(){
        return Math.floor(Math.random()*(100-0+1)+0)%2
    }
	sample(arr){
		return arr[this.randRange(0, arr.length-1)]
	}

	uniqueId(){
		return Date.now().toString(36) + Math.random().toString(36).substr(2);
	}
}