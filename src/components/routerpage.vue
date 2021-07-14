<script>
export default({
	data(){
		return{
			USERID:null,
		}
	},
    //const self = this
	mounted:function(){
		let routerQuery_r1 = this.$route.query.id
		this.USERID = routerQuery_r1
	},
	
	//let routerQuery_r2 = this.$route.query.name
	//let routerQuery_r3 = this.$route.query.phone
	//let routerQuery_r4 = this.$route.query.pwd
})
</script>
