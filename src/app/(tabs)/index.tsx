import {
	View,
	Text,
	Button,
	Dimensions,
	StyleSheet,
	ScrollView,
	Image,
	TouchableOpacity,
	RefreshControl,
} from 'react-native'
import React, { useCallback, useState } from 'react'
import { StatusBar } from 'react-native'
import { router, useRouter } from 'expo-router'
import Swiper from 'react-native-swiper'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Ionicons from '@expo/vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { SafeAreaView } from 'react-native-safe-area-context';

import { useSelector } from 'react-redux'
import { useGetMeQuery } from '@/Services'
import { useGetScenariosQuery } from '@/Services/scenario'
import { useGetNewsQuery } from '@/Services/new'
import { useFocusEffect } from '@react-navigation/native'

const irrigationSchedule = [
	{
		farm_name: 'Vườn xoài Đồng Tháp',
		model_type: 'Mô hình động',
		date: '30-04-2024',
		crop_type: 'Xoài',
		irrigation_instruction: [
			{
				start_time: '06:00',
				end_time: '06:15',
				duration: 120,
				water_flow_rate: 10,
			},
			{
				start_time: '16:00',
				end_time: '16:20',
				duration: 90,
				water_flow_rate: 8,
			},
		],
	},
	{
		farm_name: 'Vườn vải Bắc Giang',
		model_type: 'Mô hình tĩnh',
		date: '30-04-2024',
		crop_type: 'Vải',
		irrigation_instruction: [
			{
				start_time: '07:00',
				end_time: '07:15',
				duration: 120,
				water_flow_rate: 10,
			},
			{
				start_time: '16:00',
				end_time: '16:20',
				duration: 90,
				water_flow_rate: 8,
			},
		],
	},
	{
		farm_name: 'Vườn bưởi Đồng Nai',
		model_type: 'Mô hình động',
		date: '30 - 04 - 2024',
		crop_type: 'Bưởi',
		irrigation_instruction: [
			{
				start_time: '08:00',
				end_time: '08:15',
				duration: 95,
				water_flow_rate: 10,
			},
			{
				start_time: '14:00',
				end_time: '14:20',
				duration: 50,
				water_flow_rate: 8,
			},
		],
	},
]

const topicTitle = [
	{
		title: 'Tin tức',
	},
	{
		title: 'Mùa vụ',
	},
	{
		title: 'Thời tiết',
	},
	{
		title: 'Phân bón',
	},
]

const news = [
	{
		img: require('assets/news/anh-1.jpg'),
		title: 'Bà con phấn khởi thu hoạch ruộng lúa',
	},
	{
		img: require('assets/news/anh-2.jpg'),
		title:
			'Sản lượng lúa vụ mùa đầu năm 2024 đạt hơn 1 triệu tỷ tỷ tấn, đứng đầu thế giới về sản xuất lúa gạo',
	},
	{
		img: require('assets/news/anh-3.jpg'),
		title: '2024 Vẫn còn tái diễn câu chuyện giải cứu Thanh long cho bà con nông dân?',
	},
]

const avatarPhoto = require('assets/images/avatar1.jpg')

export default function Home() {
	const [currentTopic, setCurrentTopic] = useState('')
	const [refreshing, setRefreshing] = React.useState(false)

	const user = useSelector((state: any) => state.auth.user)
	const { data, isLoading, isFetching, refetch } = useGetMeQuery(user?.id)
	const router = useRouter()
	const {
		data: scenarios,
		isLoading: scenariosLoading,
		isFetching: scenarioFetching,
		refetch: scenarioRefesh,
	} = useGetScenariosQuery({})
	const {
		data: newsData,
		isLoading: newsLoading,
		isFetching: newsFetching,
		refetch: newRefetch,
	} = useGetNewsQuery({})
	// filter scenarios by user id
	const onRefresh = React.useCallback(async () => {
		setRefreshing(true)
		try {
			await refetch() // Re-fetch the data
			await scenarioRefesh()
			await newRefetch()
			console.log('REFRESHING....')
		} finally {
			setRefreshing(false)
      setCurrentTopic('')
		}
	}, [refetch])

	useFocusEffect(
		useCallback(() => {
			console.log('FOCUS EFFECT')
			refetch()
			scenarioRefesh()
			newRefetch()

		}, [refetch]),
	)
	while (isLoading || scenariosLoading || isFetching || scenarioFetching) {
		return
		;<SafeAreaView>
			<Text>Loading...</Text>
		</SafeAreaView>
	}
	while (newsLoading || newsFetching) {
		return
		;<SafeAreaView>
			<Text>Loading...</Text>
		</SafeAreaView>
	}
	const uniqueCategories = Array.from(new Set(newsData.map((news: any) => news.category)))
	console.log('uniqueCategories', uniqueCategories)
	const userScenarios = scenarios?.filter((scenario: any) => scenario.farm?.user.id === user?.id)
	console.log('userScenarios', userScenarios)
	console.log('user', data)
	const formatDateTime = (datetime: string) => {
		const [date, time] = datetime.split('T')
		const formattedTime = time.split('.')[0] // Remove the milliseconds part
		console.log('formattedTime: ', formattedTime)
		return { date, time: formattedTime }
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				paddingHorizontal: '4%',
				paddingTop: StatusBar.currentHeight,
				backgroundColor: 'white',
			}}
		>
			<ScrollView
				style={{ marginBottom: 13 }}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			>
				<View
					style={{
						flex: 1,
						minHeight: 56,
						maxHeight: 56,
						flexDirection: 'row',
						backgroundColor: '#f5f5f5',
						marginHorizontal: '-4%',
						paddingHorizontal: '5%',
					}}
				>
					<TouchableOpacity
						onPress={() => {
							router.push('settings/infoDetails')
						}}
						style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
					>
						<Image source={avatarPhoto} style={{ width: 46, height: 46, borderRadius: 23 }} />
						<Text style={{ paddingLeft: 9, fontSize: 19, fontWeight: '500' }}>
							{data?.firstName + ' ' + data?.lastName}
						</Text>
					</TouchableOpacity>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'flex-end',
						}}
					>
						<TouchableOpacity onPress={() => {}}>
							<Ionicons name="add-circle-outline" size={31} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => {}} style={{ marginLeft: 13 }}>
							<Ionicons name="notifications-outline" size={31} />
						</TouchableOpacity>
					</View>
				</View>
				<Text style={styles.titleText}>LỊCH TƯỚI HÔM NAY</Text>
				<View style={{ flex: 1, minHeight: 375, maxHeight: 375 }}>
					<Swiper
						style={styles.swiperWrapper}
						showsButtons
						loop={true}
						index={0}
						activeDotColor="#568464"
						nextButton={<FontAwesome6 name="chevron-right" size={25} color="#568464" />}
						prevButton={<FontAwesome6 name="chevron-left" size={25} color="#568464" />}
					>
						{userScenarios?.map((item: any, index: any) => {
							const { date, time } = formatDateTime(item.time)
							return (
								<View key={index} style={styles.itemContainer}>
									<Text style={styles.farmNameText}>{item.farm?.name}</Text>
									<View style={styles.contentContainer}>
										<Text style={styles.contentTitleText}>Mô hình tưới:</Text>
										<Text style={styles.contentText}>{item.farm?.model?.name}</Text>
									</View>
									<View style={styles.contentContainer}>
										<Text style={styles.contentTitleText}>Loại nông sản:</Text>
										<Text style={styles.contentText}>{item.farm?.cultivar?.name}</Text>
									</View>
									<Text style={[styles.farmNameText, { flex: 1.3, marginTop: 0 }]}>
										Kịch bản tưới
									</Text>
									<View style={styles.contentContainer}>
										<Text style={styles.contentTitleText}>Ngày tưới:</Text>
										<Text style={styles.contentText}>{date}</Text>
									</View>
									<View style={styles.contentContainer}>
										<Text style={styles.contentTitleText}>Giờ tưới kế tiếp:</Text>
										<Text style={styles.contentText}>{time}</Text>
									</View>
									<View style={styles.contentContainer}>
										<Text style={styles.contentTitleText}>Thời gian tưới:</Text>
										<Text style={styles.contentText}>
											{item.duration}
											<Text style={{ fontStyle: 'italic' }}> phút</Text>
										</Text>
									</View>
									<View style={styles.contentContainer}>
										<Text style={styles.contentTitleText}>Lưu lượng nước:</Text>
										<Text style={styles.contentText}>
											{item.amount}
											<Text style={{ fontStyle: 'italic' }}> khối/giờ</Text>
										</Text>
									</View>
									<View style={[styles.contentContainer, { flex: 2.2 }]}>
										<Text style={styles.contentTitleText}>Hôm nay còn:</Text>
										<Text style={styles.contentText}>1 lịch tưới</Text>
									</View>
								</View>
							)
						})}
					</Swiper>
				</View>
				<Text style={styles.titleText}>TIN TỨC NÔNG NGHIỆP</Text>
				{/* <ScrollView horizontal={true} style={{ maxHeight: 40, minHeight: 40, marginBottom: '4%' }}>
          {
            topicTitle.map((item, index) => {
              return(
                <TouchableOpacity onPress={() => { setCurrentTopic(item.title) }} style={currenTopic === item.title ? [styles.topicItem, { backgroundColor: '#416D50'}] : styles.topicItem } key={index}>
                  <Text style={ currenTopic === item.title ? [styles.topicTitleText, { color: 'white' }] : styles.topicTitleText} >{ item.title }</Text>
                </TouchableOpacity>
              );
            })
          }
      </ScrollView>
  
      {
        news.map((item, index) => {
          return (
            <TouchableOpacity style={ styles.newsContainer } key={index}>
              <Image source={item.img} 
                            style={ styles.imgNewsStyle }
                            />
              <Text style={ styles.newsTitle }>
                { item.title }
              </Text>
          </TouchableOpacity>
          )
        })
      } */}
				<ScrollView horizontal={true} style={{ maxHeight: 40, minHeight: 40, marginBottom: '4%' }}>
					{uniqueCategories.map((category: any, index) => {
						return (
							<TouchableOpacity
								onPress={() => {
									setCurrentTopic(category)
								}}
								style={
									currentTopic === category
										? [styles.topicItem, { backgroundColor: '#416D50' }]
										: styles.topicItem
								}
								key={index}
							>
								<Text
									style={
										currentTopic === category
											? [styles.topicTitleText, { color: 'white' }]
											: styles.topicTitleText
									}
								>
									{category}
								</Text>
							</TouchableOpacity>
						)
					})}
				</ScrollView>
				{newsData
					.filter((item: any) => currentTopic === '' || item.category === currentTopic)
					.map((item: any, index: number) => {
						return (
							<TouchableOpacity style={styles.newsContainer} key={index}>
								<Image source={{ uri: item.image }} style={styles.imgNewsStyle} />
								<Text style={styles.newsTitle}>{item.title}</Text>
							</TouchableOpacity>
						)
					})}
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	swiperWrapper: {},
	itemContainer: {
		flex: 1,
		backgroundColor: '#E9F3ED',
		borderRadius: 15,
		borderWidth: 1,
		borderColor: '#416D50',
		paddingLeft: 50,
		paddingRight: 40,
	},
	farmNameText: {
		color: 'black',
		fontSize: 23,
		fontWeight: 'bold',
		alignSelf: 'center',
		textAlign: 'center',
		marginLeft: -50,
		marginRight: -40,
		marginTop: 15,
		flex: 1.2,
	},
	contentContainer: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		flex: 1,
	},
	contentTitleText: {
		flex: 1.2,
		fontSize: 18,
		fontWeight: 'bold',
	},
	contentText: {
		flex: 1,
		fontSize: 18,
		fontWeight: '400',
	},
	titleText: {
		fontWeight: '500',
		fontSize: 21,
		paddingVertical: '3%',
		textAlign: 'center',
	},
	topicItem: {
		borderWidth: 1,
		borderColor: '#416D50',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20,
		paddingHorizontal: 10,
		marginHorizontal: 9,
	},
	topicTitleText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#416D50',
	},
	newsContainer: {
		borderBottomWidth: 1,
		borderBottomColor: '#416D50',
		minHeight: 230,
		marginBottom: 15,
	},
	imgNewsStyle: {
		height: 210,
		width: '100%',
		borderRadius: 15,
	},
	newsTitle: {
		flexWrap: 'wrap',
		marginVertical: 6,
		fontSize: 20,
		fontWeight: '700',
		color: '#416D50',
	},
})
