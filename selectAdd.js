var vm = new Vue({
	el: '#app',
	data: {
		addressList: [],
		limitNum: 0,
		show: false
	},
	filters: {
		
	},
	mounted: function () {
		this.$nextTick(function () {
			this.initView();
		});
	},
	computed: {
		filterAddress: function () {
			return this.addressList.slice(0, 3);
		}
	},
	methods: {
		initView: function () {
			var _this = this;
			this.$http.get('data/addressesData.json').then(response => {
				if(response.status == 0) {
					_this.addressList = response.body.results;
				}
			}, response => {
				_this.addressList = response.body.results;
				vm.show = true;
				vm.limitNum = 2;
			});
		},
		showMore: function () {
			vm.limitNum = 10;
//			vm.show = true;
		},
		showLess: function () {
//			vm.show = false;
			vm.limitNum = 2;
		}
	}
	
});