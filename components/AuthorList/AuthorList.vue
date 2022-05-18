<template>
	<view class="list-item-container">
		<scroll-view scroll-y="true" class="scroll-list-item">
			<view class="author-container" v-for="it in authorList" :key="it._id">
				<view class="author-item">
					<view class="left">
						<image :src="it.avatar" mode="aspectFill"></image>
					</view>
					<view class="right">
						<view class="top">
							<view class="author-name">
								{{it.author_name}}
							</view>
						</view>
						<view class="bottom">
							<view class="professional">
								{{it.professional}}
							</view>
							<view class="author-info">
								<view class="article-count">
									文章{{it.article_ids.length}}
								</view>
								<view class="fans-count">
									粉丝{{it.fans_count}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"AuthorList",
		props:{
			authorList:Array,
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.list-item-container{
	height: 100%;
	.scroll-list-item{
		height:100%;
		.author-container{
			padding: 0 20rpx;
			margin: 20rpx 0;
			.author-item{
				@include flex(flex-start);
				border-bottom: 1px solid #eee;
				.left{
					width: 80rpx;
					height: 80rpx;
					overflow: hidden;
					flex-shrink: 0;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.right{
					flex: 1;
					@include flex(space-between,column);
					align-items: flex-start;
					margin: 0 30rpx ;
					.top{
						.author-name{
							font-size: 28rpx;
							color: #333;
						}
					}
					.bottom{
						width: 100%;
						margin:30rpx 0;
						font-size: 28rpx;
						color: #666;
						@include flex(space-between);
						.author-info{
							@include flex();
							.article-count,.fans-count{
								font-size: 24rpx;
								padding: 0 20rpx;
							}
						}
					}
				}
			}
		}
		
	}
}
</style>