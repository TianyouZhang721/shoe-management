<template>
	<el-container>
		<el-header>
			<Header></Header>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<SideBar></SideBar>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import SideBar from './components/sidebar/sidebar.vue'
import Header from './components/header/header.vue'
export default {
  name: 'App',
  components: {
	  SideBar,
	  Header
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
	margin:0;
}
.el-header {
	position: relative;
}
</style>
