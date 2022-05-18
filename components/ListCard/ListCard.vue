<template>
	<view class="list-card-container">
		
		<!-- 小图模式 -->
		<view class="list-card-base" v-if="articleItem.mode === 'base'" @click="goArticleDetail">
			<view class="card-image">
				<image :src="articleItem.cover[0] ? articleItem.cover[0] : '/static/img/replace.webp'" mode="aspectFill"></image>
			</view>
			<view class="card-content">
				<view class="card-title">
					<text>{{articleItem.title}}</text>
					<SaveLikes :articleId="articleItem._id"/>
				</view>
				<view class="card-desc">
					<view class="card-type">{{articleItem.classify}}</view>
					<view class="card-browse-count">{{articleItem.browse_count}}浏览</view>
				</view>
			</view>
		</view>
		<!-- 三图模式 -->
		<view class="list-card-column mode-column" v-else-if="articleItem.mode === 'column'" @click="goArticleDetail">
			<view class="card-title">
				<text>{{articleItem.title}}</text>
				<SaveLikes :articleId="articleItem._id"/>
			</view>
			<view class="card-image">
				<image :src="articleItem.cover[0]" mode="aspectFill"></image>
				<image :src="articleItem.cover[1]" mode="aspectFill"></image>
				<image :src="articleItem.cover[2]" mode="aspectFill"></image>
			</view>
			<view class="card-desc">
				<view class="card-type">{{articleItem.classify}}</view>
				<view class="card-browse-count">{{articleItem.browse_count}}浏览</view>
			</view>
		</view>
		<!-- 大图模式 -->
		<view class="list-card-image mode-image" v-else  @click="goArticleDetail">
			<view class="card-image">
				<image :src="articleItem.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="card-title">
				<text>{{articleItem.title}}</text>
				<SaveLikes :articleId="articleItem._id"/>
			</view>
			<view class="card-desc">
				<view class="card-type">{{articleItem.classify}}</view>
				<view class="card-browse-count">{{articleItem.browse_count}}浏览</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"ListCard",
		props:{
			articleItem:Object,
		},
		data() {
			return {
				
			};
		},
		methods:{
			goArticleDetail(){
				//跳转到文章详情页
				// console.log("article-detail");
				/* 通过参数传递达到预渲染效果 */
				const {author,browse_count,create_time,title,thumbs_up_count,_id} = this.articleItem;
				// const params = JSON.stringify({author,browse_count,create_time,title,thumbs_up_count,_id});
				// console.log(params);
				// uni.navigateTo({
				// 	url:`/pages/articleDetail/articleDetail?params=${params}`,
				// })
				const params = {author,browse_count,create_time,title,thumbs_up_count,_id};
				this.$Router.push({
					path:"/pages/articleDetail/articleDetail",
					query:params,
				})
				//向父组件传递事件，告知我点了
				this.$emit('saveHistory')
			}
		}
	}
</script>

<style lang="scss">
@import "./ListCard.scss"
</style>