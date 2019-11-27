import { Body, Card, CardItem, Left, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import { BaseURL } from "../../../utils/APIUtils";
import Moment from 'moment';
import { styles } from './Home.style';


export default class CardComponent extends Component {
    render() {
        let items = [];
        for (let i = 0; i < this.props.postImages.length; i++) {
            items.push(
                <View key={i}>
                    <Image source={{ uri: BaseURL + this.props.postImages[i] }} style={styles.viewpagerItem} />
                </View>
            )
        }
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={this.props.userImage} />
                        <Body>
                            <Text>{this.props.userName} </Text>
                            <Text note>{Moment(new Date(this.props.date)).format('d MMM YYYY hh:mm:a')}</Text>
                        </Body>
                    </Left>
                </CardItem>

                <IndicatorViewPager
                    style={{
                        height: 300
                    }} indicator={<PagerDotIndicator pageCount={items.length} />}>
                    {items}
                </IndicatorViewPager>

                <CardItem style={{ height: 45 }}>
                    <Left>

                        <View style={{ margin: 5 }}>
                            <Icon type='ionicon' name="ios-heart-empty" style={{ color: 'black' }} />
                        </View>
                        <View style={{ margin: 5 }}>
                            <Icon name="chat-bubble-outline" style={{ color: 'black' }} />
                        </View>
                        <View style={{ margin: 5 }}>
                            <Icon type='font-awesome' name="send-o" style={{ color: 'black' }} />
                        </View>
                    </Left>
                </CardItem>

                <CardItem style={{ height: 17 }}>
                    <Text>{this.props.likes} Likes</Text>
                </CardItem>

                <CardItem>
                    <Body>
                        <Text>
                            <Text style={styles.userNameBold}>{this.props.userName} </Text>
                            {this.props.description}
                        </Text>
                    </Body>
                </CardItem>

            </Card>
        );
    }
}
