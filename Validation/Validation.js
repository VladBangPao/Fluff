import { assert } from "node:console";
export class Validation{
	//VALIDATION-----------------------------------------------------
	//ng means assert that n is greater than ng
	//nl means assert that n is less than nl
	//they mean different things in different contexts
	isInt(n, n_min, n_max){
		//ng means assert that integer n is greater than ng
		//nl means assert that integer n is less than nl

		if(n && n_min && n_max){
			try{
				assert.equal(typeof n ==='number', true)
				assert.equal(n>=n_min, true)
				assert.equal(n<=n_max, true)
			}catch(err){
				return false
			}
		}else if(n && n_min){
			try{
				assert.equal(typeof n ==='number', true)
				assert.equal(n>=n_min, true)
			}catch(err){
				return false
			}
		}else if(n && n_max){
			try{
				assert.equal(typeof n ==='number', true)
				assert.equal(n<=n_max, true)
			}catch(err){
				return false
			}
		}else if(n){
			try{
				assert.equal(typeof n ==='number', true)
			}catch(err){
				return false
			}
		}else{
			return false
		}
		return true
	}

	isArray(arr, n_min, n_max){
		//ng means assert that array arr.length is greater than ng
		//nl means assert that array arr.length is less than nl
		if(arr && n_min && n_max){
			try{
				assert.equal(Array.isArray(arr), true)
				assert.equal(arr.length>=n_min, true)
				assert.equal(arr.length<=n_max, true)
			}catch(err){
				return false
			}
		}else if(arr && n_min){
			try{
				assert.equal(Array.isArray(arr), true)
				assert.equal(arr.length>=n_min, true)
			}catch(err){
				return false
			}
		}else if(arr && n_max){
			try{
				assert.equal(Array.isArray(arr), true)
				assert.equal(arr.length<=n_max, true)
			}catch(err){
				return false
			}
		}else if(arr){
			try{
				assert.equal(Array.isArray(arr), true)
			}catch(err){
				return false
			}
		}else{
			return false
		}
		return true
	}

	isStrata(){
		
	}

	//w_max = assert that width is less than w_max
	//w_min = assert that width is greater than w_min
	//d_max = assert that depth is less than d_max
	//d_min = assert that depth is greater than d_min
	//n = current level of depth
	isObj(obj, w_min, w_max, d_min, d_max, n=0, maxdepth=[0], truth=[true]){
		if(!truth[0]){return false}
		if(typeof obj === 'object'){
			if(w_min||w_max){
				var i;
				for(i = 0; i<Object.keys(obj).length; i++){
					if(d_max){
						try{
							assert.equal(n<=d_max, true)
						}catch{
							truth[0]=false
						}
					}
					if(n>maxdepth[0]){maxdepth[0]=n}
					this.isObj(obj[Object.keys(obj)[i]], w_min, w_max, d_min, d_max, n+1, maxdepth, truth)
				}
				if(w_min){
					try{
						assert.equal(i>=w_min, true)
					}catch{
						truth[0]=false
					}
				}
				if(w_max){
					try{
						assert.equal(i<=w_max, true)
					}catch{
						truth[0]=false
					}
				}
			}
		}

		if(n==0){
			if(d_min){
				try{
					assert.equal(maxdepth[0]>=d_min)
				}catch{
					truth[0]=false
				}
			}
		}
		return truth[0]
	}

	isStr(){

	}

}