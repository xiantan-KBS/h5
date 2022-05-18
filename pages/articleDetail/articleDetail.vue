<template>
	<view class="article-detail-container">
		<view class="detail-title">
			{{articleData.title}}
		</view>

		<view class="detail-header">
			<view class="detail-logo">
				<image :src="articleData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header-content">
				<view class="detail-header-content-title">
					{{articleData.author.author_name}}
				</view>
				<view class="detail-header-content-info">
					<text>{{articleData.create_time}}</text>
					<text>{{articleData.browse_count}}浏览</text>
					<text>{{articleData.thumbs_up_count}}赞</text>
				</view>
			</view>
			<button type="default" class="detail-header-button"
				@click="updateFollowAuthor">{{isFollow?'取消关注':'关注'}}</button>
		</view>

		<view class="detail-content-container">
			<view class="detail-html">
				<u-parse :content="content"></u-parse>
			</view>

			<!-- 评论展示组件 -->
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content-container" v-for="item in commentList" :key="item.comment_id">
					<CommentBox :commentData="item" v-if="item" @handleReply="handleReply" :isReply="false">
					</CommentBox>
				</view>
				<view class="no-data" v-if="!commentList.length">暂无评论</view>
			</view>
		</view>

		<!-- 评论编写组件 -->
		<view class="detail-bottom">
			<view class="input-container" @click="openPopup">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom-icons">
				<view class="detail-bottom-icon-box" @click="goCommentList">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<SaveLikes :articleId="articleData._id" size="22" class="detail-bottom-icon-box" />
				<!-- <view class="detail-bottom-icon-box">
					<uni-icons type="heart" size="22" color="#f07373"></uni-icons>
				</view> -->
				<view class="detail-bottom-icon-box" @click="updateThumbsUp">
					<uni-icons :type="isThumbsUp ? 'hand-up-filled':'hand-up'" size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>

		<!-- 评论组件,弹出框 -->
		<Comment :showPopup="showPopup" @closeComment="showPopup=false" @sendCommentData="sendCommentData" />
	</view>
</template>

<script>
	import {
		marked
	} from 'marked'
	import uParse from '@/components/u-parse/u-parse.vue'
	export default {
		onLoad(options) {
			// console.log(this.$Router.currentRoute)
			// this.articleData = JSON.parse(options.params);
			this.articleData = this.$Router.currentRoute.query
			this.getArticleData();
			this.getCommentData();
		},
		data() {
			return {
				articleData: null,
				showPopup: false, //是否显示评论遮罩层，
				commentList: [],
				replyData: {}, //存储指定回复的子回复
			}
		},
		components: {
			uParse,
		},
		methods: {
			/* 获取当前文章信息 */
			async getArticleData() {
				const id = {
					_id: this.articleData._id
				};
				const res = await this.$http.getArticleData(id);
				this.articleData = res;
				// console.log(res)
				// console.log(this.articleData.content);
			},
			/* 获取评论数组 */
			async getCommentData() {
				const id = {
					_id: this.articleData._id
				};
				const res = await this.$http.getCommentData(id);
				// console.log(res);
				this.commentList = res;
			},
			/* 打开留言层 */
			async openPopup() {
				/* 首先判断是否是登陆状态 */
				await this.isLogin();
				this.showPopup = true;
			},

			/* 发送评论信息给后端 */
			async sendCommentData(content) {
				const data = {
					userId: this.userInfo._id,
					articleId: this.articleData._id,
					content,
					...this.replyData,
				}
				// console.log(data)
				const {
					msg
				} = await this.$http.sendCommentData(data);
				uni.showToast({
					title: msg,
					icon: 'none',
				})
				this.showPopup = false;

				/* 发送完评论后要更新界面，重新获取数据 */
				this.replyData = {};
				this.getCommentData();
			},

			/* 处理评论回复 */
			handleReply(data) {
				// console.log(data);
				this.replyData = {
					commentId: data.comment.comment_id,
					is_reply: data.isReply,
				}
				data.comment.reply_id && (this.replyData.reply_id = data.comment.reply_id);
				this.openPopup();
			},
			/* 更新关注作者功能*/
			async updateFollowAuthor() {
				await this.isLogin();
				const data = {
					userId: this.userInfo._id,
					authorId: this.articleData.author.id
				}
				const {
					msg
				} = await this.$http.updateFollowAuthor(data);
				// console.log(msg)

				uni.showToast({
					title: msg,
				})


				/* 判断user用户里有没有该作者id，有就去除，没有就新增 */
				let followIds = [...this.userInfo.author_likes_ids];
				if (followIds.includes(this.articleData.author.id)) {
					followIds = followIds.filter(it => it !== this.articleData.author.id);
				} else {
					followIds.push(this.articleData.author.id);
				}

				/* 更新vuex和storage里面的数据 */
				this.setUserInfo({
					...this.userInfo,
					author_likes_ids: followIds
				});
				
				/* 事件总线，关注作者了就会触发关注作者页面重新获取数据 */
				uni.$emit('updateAuthorList');
			},
			/* 更新文章点赞功能*/
			async updateThumbsUp(){
				await this.isLogin();
				const data = {
					userId: this.userInfo._id,
					articleId: this.articleData._id
				}
				const {msg} = await this.$http.updateThumbsUp(data);
				
				uni.showToast({
					title:msg,
				})
				
				
				/* 判断user用户里有没有该文章id，有就去除，没有就新增 */
				let thumbsUpIds = [...this.userInfo.thumbs_up_article_ids];
				if (thumbsUpIds.includes(this.articleData._id)) {
					thumbsUpIds = thumbsUpIds.filter(it => it !== this.articleData._id);
				} else {
					thumbsUpIds.push(this.articleData._id);
				}
				
				/* 更新vuex和storage里面的数据 */
				this.setUserInfo({
					...this.userInfo,
					thumbs_up_article_ids: thumbsUpIds
				});
				
			},
			/* 点击留言板进行评论列表页面 */
			goCommentList(){
				uni.navigateTo({
					url:`/pages/commentList/commentList?articleId=${this.articleData._id}`,
				})
			}
		},
		computed: {
			/* marked解析副文本 */
			content() {
				// return this.articleData.content ? marked(this.articleData.content) : null;

				/* 兼容微信小程序 */
				try {
					return marked(this.articleData.content)
				} catch (e) {
					return '文章内容大纲';
				}
			},
			/* 是否关注作者 */
			isFollow() {
				/* 兼容微信小程序 */
				try {
					return this.userInfo && this.userInfo.author_likes_ids.includes(this.articleData.author.id);
				} catch (e) {
					return false;
				}
			},
			/* 是否点赞 */
			isThumbsUp(){
				/* 兼容微信小程序 */
				try {
					return this.userInfo && this.userInfo.thumbs_up_article_ids.includes(this.articleData._id);
				} catch (e) {
					return false;
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
	@import "./articleDetail.scss"
</style>
