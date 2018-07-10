(function(winodw,undefined){
	var 
		kQuery = function(selector){
			return new kQuery.fn.init(selector);
		};
		// console.log(this);
	kQuery.fn = kQuery.prototype ={
		constructor:kQuery,
		init:function(selector){
			selector=kQuery.trim(selector);
			if(!selector){
				return this;
			}
			//当穿的是函数的时候，把寒暑表绑定在DOMContentLoaded事件中，页面加载完成后执行
			else if(kQuery.isFunction(selector)){
				document.addEventListener('DOMContentLoaded',function(){
					selector();
				});
				this[0]=document;
				this.length=1;
				return this;
			}
			else if(kQuery.isString(selector)){
				//处理HTML代码
				if(kQuery.isHTML(selector)){
					var tmpDom = document.createElement('div');
					tmpDom.innerHTML = selector;
					/*
					for(var i =0;i<tmpDom.children.length;i++){
						this[i]= tmpDom.children[i];
					}
					this.length = tmpDom.children.length;*/
					[].push.apply(this,tmpDom.children);
					return this;

				}
				//处理选择器
				 else{
					var doms = document.querySelectorAll(selector);
					/*
					for(var i =0;i<doms.length;i++){
						this[i] = doms[i];
					}
					this.length= doms.length;
					*/
					[].push.apply(this,doms);
					return this;
					}
				}
				else if (kQuery.isArray(selector)){
					var tamer = [].slice.call(selector);
					[].push.apply(this,tamer);
					return this;
				}
				else{
					//处理传入的为‘123’，这种类似的，不作处理直接返回的
					this[0]=selector;
					this.length=1;
					return this;
				}
			
		},
		selector:"",
		length:0,
		jquery:'1.0.0',
		push:[].push,
		sort:[].sort,
		splice:[].splice,
		toArray:function(){
			return [].slice.call(this);
		},
		get:function(num){
					if(arguments.length ==1){
						if(num>=0){
							return this[num];
						}else {
							//为负数就是倒数第几个
							return this[this.length+num];
						}
					}
					else{
						//如果没有传数字，则直接返回
						return this.toArray();
					}
				},

		eq:function(num){
				if(arguments.length ==1){
					return kQuery(this.get(num));
				}else{
					//如果什么都不传，返回的是一个新的空的jquery对象
					return new kQuery();
				}
			},
		first:function(){
			return this.eq(0);
		},
		last:function(){
			return this.eq(-1);
		},
		each:function(fn){
			return kQuery.each(this,fn);
		},
		map:function(fn){
			return kQuery(kQuery.map(this,fn));
		},
		toWords:function(str){
			return str.match(/\b\w+\b/g);
		},
		/*
		addEvent:function(dom,eventName,fn){
			if(dom.addEventListener){
				dom.addEventListener(eventName,fn);
			}else{
				dom.attachEvent('on'+'eventName',fn);
			}
		}	*/

	}
	

	kQuery.extend=kQuery.fn.extend =function(obj){
		for(key in obj){
			this[key] = obj[key];
		}
	}
	//kQuery的静态方法
	kQuery.extend({
		isFunction :function(str){
			return typeof str ==='function';
		},
		isHTML : function(str){
			return str.charAt(0)=='<'&&str.charAt(str.length-1)=='>'&&str.length>=3;
		},
		isString : function(str){
			return typeof str ==='string'
		},
		isArray : function(str){
			return typeof str ==='object'&& length in str;
		},
		isObject :function(str){
			return typeof str ==='object';
		},
		trim : function(str){
			if(kQuery.isString(str)){
				return str.replace(/^\s|\s+$/g,'');
			}
			else{
				return str;
			}
		},
		each:function(arr,fn){
			if(kQuery.isArray(arr)){
				for(var i = 0;i<arr.length;i++){
					// console.log(i,arr[i]);
					var res = fn.call(arr[i],i,arr[i]);
					if(res == false){
						break;
					}else if(res == true){
						continue;
					}
				}
			}else{
				for(key in arr){
					var res =fn.call(arr[key],key,arr[key]);
					if(res == false){
						break;
					}else if(res == true){
						continue;
					}
				}
			}
			return arr;
		},
		map:function(arr,fn){
			var retArr =[];
			if(kQuery.isArray(arr)){
				for(var i=0; i<arr.length;i++){
					var res =fn(arr[i],i);
					if(res){
						 retArr.push(res);
					}
				}
			}
			else{
				for (key in arr){
					var res = fn(arr[key],key);
					if(res){
						retArr.push(res);
					}
				}
			}
			return retArr;
		},
		addEvent:function(dom,eventName,fn){
			if(dom.addEventListener){
				dom.addEventListener(eventName,fn);
			}else{
				dom.attachEvent('on'+'eventName',fn);
			}
		}
	});
	kQuery.fn.extend({
	
		html:function(content){
			if(content){
				this.each(function(){
					this.innerHTML=content;
					
				})
				return this;
			}else{
				return this[0].innerHTML;
			}
		},
		
		
		text:function(content){
			if(content){
				this.each(function(){
					this.innerText = content;
				});
				return this;
			}else{
				var str = '';
				this.each(function(){
					str += this.innerText;
				});
				return str;
			}
		},
		
		attr:function(arg1,arg2){
			if(kQuery.isObject(arg1)){
				var dom = this;
				this.each(function(attr,val){
					dom[attr]=val;
				});
				return this;
			}else{
				if(arguments.length==1){
					return this[0].getAttribute(arg1);
				}
				if(arguments.length==2){
					this.each(function(arg1,arg2){
						this.each.setAttrbute()
					});
				}
			}
	
		},
		
		removeAttr:function(attr){
			if(attr){
				this.each(function(){
					this.removeAttribute(attr);
				})
			}
			return this;
		},
		val:function(val){
			if(val){
				this.each(function(){
					this.value =val;
				});
				return this;
			}else{
				return this[0].value;
			}
		},
		css:function(arg1,arg2){
			if(kQuery.isString(arg1)){//是字符串的情况
				if(arguments.length == 1){
					//获取第一个元素对应的样式值
					// return this[0].style[arg1];
					
					if(this[0].currentStyle){
						return this[0].currentStyle[arg1];
					}else{
						return getComputedStyle(this[0],false)[arg1];
					}
					
				}else if(arguments.length == 2){
					this.each(function(){
						this.style[arg1] = arg2;
					});
				}
		}else if(kQuery.isObject(arg1)){
			this.each(function(){
				for(key in arg1){
					this.style[key] = arg1[key];
				}
			});
		}
		return this;
		},
	hasClass:function(str){
			var res = false;
			if(str){
				//判断是否存在指定单词的正则
				var reg = eval('/\\b'+str+'\\b/');
				this.each(function(){
					//判断传入的参数是否存在在DOM节点的className上
					if(reg.test(this.className)){
						res = true;
						return false;
					}
				})
			}
		return res;
	},
	addClass:function(str){
		var names=this.toWords(str);
		this.each(function(){
			//如果有参数对应的class不添加,如果没有就添加
			var $this = kQuery(this);
			for(var i=0;i<names.length;i++){
				if(!$this.hasClass(names[i])){
					this.className =this.className + ' ' + names[i];
				}
			}
			
		})
		return this;
	},
	removeClass:function(str){
		if(!str){
			this.each(function(){
				this.className='';
			})
		}else{
			var names= kQuery.toWords(str);
			this.each(function(){
				var $this =kQuery(this);
				for(var i=0;i<names.length;i++){
				var reg = eval('/\\b'+names[i]+'\\b/');
				if($this.hasClass(name[i])){
					this.className = this.className.replace(reg,'');
				}
				}
			});												
		}
		return this;
	},
	toggleClass:function(str){
		if(!str){
			this.each(function(){
				this.className='';
			})
		}else{
			var names= this.toWords(str);
			this.each(function(){
				var $this = kQuery(this);
				for(var i=0;i<names.length;i++){
				
					if($this.hasClass(names[i])){
						$this.removeClass(names[i]);												
					}
					else{
						$this.addClass(names[i]);
					}
				}
			})
			
		}
		return this;
	},
		
});
	//DOM相关的属性
kQuery.fn.extend({
	empty:function(){
		this.each(function(){
			this.innerHTML='';
		});
		return this;
	},
	remove:function(selector){
		if(!selector){
			this.each(function(){
				this.parentNode = this.parentNode;
				parentNode.removeChild(this);
			})
			
		}else{
			var doms = document.querySelectorAll(selector);

			this.each(function(){
				for(var i=o;i<doms.length;i++){
					if(doms[i] == this){
						var parentNode =this.parentNode;
						parentNode.removeChild(this);
					}
				}

			})
		}
		return this;
	},
	/*
	append:function(source){
		if(source){
			var $source = kQuery(source);
			this.each(function(index,value){
				var parentNode = this;
				// console.log(this);
				if(index == 0){

					$source.each(function(){

						parentNode.appendChild(this);
					})
				}
				else{
					$source.each(function(){
						var doms = this.cloneNode(true);
						parentNode.appendChild(doms);
					})
				}
			})
		}
		else{

		}
		return this;
	},
	*/
	append:function(source){
		if(source){
			//kquery对象,DOM节点,HTML代码片段
			//source -> this
			var $source = kQuery(source);
			console.log($source)
			this.each(function(index,value){
				// this.appendChild($source);
				var parentNode = this;
				if(index == 0){//第一个DOM元素直接插入
					$source.each(function(){
						console.log('1:::',this)
						parentNode.appendChild(this);
					});
				}else{//第一个DOM元素复制一份再插入
					$source.each(function(){
						//复制一份
						var dom = this.cloneNode(true);
						console.log(dom);
						parentNode.appendChild(dom);
						// parentNode.appendChild(this);
					})					
				}
			})
		}
		return this;
	},
	prepend:function(source){
		if(source){
			var $source =kQuery(source);
			this.each(function(index,value){
				var parentNode = this;
				if(index==0){
					$source.each(function(){
						parentNode.insertBefore(this,parentNode.firstChild);
					})
				}else{
					$source.each(function(){
						var dom = this.cloneNode(true);
						parentNode.insertBefore(dom,parentNode.firstChild);
					})
				}
			})
		}
		return this;
	},
	clone:function(bcopy){
		var res =[];
		this.each(function(){
			var dom =this.cloneNode(true);
			if(bcopy && this.bucketEvent){
				kQuery.each(this.bucketEvent,function(eventName,fnArr){
					kQuery.each(fnArr,function(){
						kQuery.(dom).on(eventName,this);
					})
				})
			}
			res.push(dom);
		})
		return kQuery(res);
		
	}

});
//kQuery对象上的事件测试
kQuery.fn.extend({
	on:function(eventName,fn){
		this.each(function(){
			// this.addEventListener(eventName,fn);
			// kQuery.addEvent(this,eventName,fn);
			if(!this.bucketEvent){
				this.bucketEvent={};
			}
			if(!this.bucketEvent[EventName]){
				this.bucketEvent[eventName]=[];
				this.bucketEvent[eventName].push(fn);				
				kQuery.addEvent(this,eventName,function(){
					kQuery.each(this.bucketEvent[eventName],function(){
						this();
					})
				})
			}
			else{
				this.bucketEvent][eventName].push(fn);
			}
		})
	},
	off:function(eventName,fnName){
		if(arguments.length == 0)//不传参数，解除所有事件
			this.each(function(){
				this.bucketEvent='';
			})
		}
		if(arguments.length ==1){//传递事件名
			this.each(function(){
				if(this.bucketEvent){
					this.bucketEvent[eventName] ='';
				}
			});
		}
		if(arguments.length ==2){//传递事件名和函数名，解除所有事件名和函数名相同的事件
			this.each(function(){
				var dom = this;
				if(this.bucketEvent && this.bucketEvent[eventName]){
					kQuery.each(this.bucketEvent[eventName],function(index,fn){
						if(this == fnName){
							dom.bucketEvent[eventName].splice(index,1);
						}

					})
				}
			})
		}
	}
})
	
	kQuery.fn.init.prototype=kQuery.fn;
	window.kQuery = window.$=kQuery;
	
})(window);