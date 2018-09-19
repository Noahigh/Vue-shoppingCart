var vm = new Vue({
	el: '#app',
	data: {
		statusNum: -1,
		totalMoney: 0,
		productList: [],
		errorMsg: '',
		selectAllFlag: false,
		currentProduct: ''
	},
	filters: {
		formatMoney: function (value) {
			return '￥ ' + value.toFixed(2) + ' 元';
		}
	},
	mounted: function () {
		this.$nextTick(function () {
			this.cartView();
//			vm.cartView();			
		});
	},
	methods: {
		cartView: function () {
//			var _this = this;
			let _this = this;			
//			this.$http.get('data/goodsData.json', {emulateJSON: true})
			this.$http.get('data/goodsData.json').then(function(response) {
//					_this.statusNum = res.body.result.status;
					vm.errorMsg = '这是成功时调用的。';
					_this.productList = response.body.result.list;
			},
				function (response) {
					_this.statusNum = 500;
					_this.errorMsg = 'errorCallback';
//					_this.productList = response.body.result.list;
			}
			)
				.catch(function (error) {
					console.log(error);
					_this.errorMsg = error;
					
					vm.productList = error.body.result.list;
        });
		},
		changeMoney: function (product, state) {
			if(state > 0) {
				product.productQuentity++;
			}else{
				if(product.productQuentity > 0) {
					product.productQuentity--;
				}
			}
			
			this.calTotalMoney();
		},
		selectedProduct: function (item) {
			if(typeof item.checked == 'undefined') {
				Vue.set(item, "checked", true);
//				this.$set(item, "checked", true);
			}else{
				item.checked = !item.checked;
			}
			
			this.selectAllFlag = true;
			this.productList.forEach(function (item, index) {
				if(item.checked == 'undefined' | !item.checked) {
					vm.selectAllFlag = false;
				}
			});
			
			this.calTotalMoney();
		},
		selectAll: function() {
			this.selectAllFlag = !this.selectAllFlag;
			var _this = this;
			this.productList.forEach(function (item, index) {
				if(typeof item.checked == 'undefined') {
					_this.$set(item, "checked", _this.selectAllFlag);
				}else{
					item.checked = _this.selectAllFlag;
				}
			});
			
			this.calTotalMoney();
		},
		calTotalMoney: function () {
			this.totalMoney = 0;
			var _this = this;
			this.productList.forEach(function (item, index) {
				if(item.checked) {
					_this.totalMoney += item.productQuentity * item.productPrice;
				}
			 });
		},
		delConfirm: function (item) {
			this.currentProduct = item;
			
		},
		delProduct: function () {
			var index = this.productList.indexOf(this.currentProduct);
			this.productList.splice(index, 1);
		}
		
		
		// 官方写法
//		cartView: function () {
//			var vm = this;
			// 箭头函数的作用域将指向外层
//			this.$http.get('./goodsData.json').then(response => {
//				// get body data
//				vm.statusNum = response.body.status;
//			}, response => {
//				// error callback
//				vm.statusNum = 500;
//			}).catch(function (error) {
//				console.log(error);
//				vm.errorMsg = error;
//			});
//		}
	}
});

Vue.filter('money', function (value, type) {
	return '$' + ' ' + value.toFixed(2) + ' ' + type;
});
