import { Container, Content } from 'native-base';
import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { BaseURL } from '../../../utils/APIUtils';
import CardComponent from './CardComponent';
import { getAllPosts } from './Home.api';
import { styles } from './Home.style';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true
    };
  }

  async componentDidMount() {
    var userPosts = await getAllPosts();
    this.setState({
      loading: false
    })
    this.setState({
      posts: userPosts
    })
  }


  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size='large' />
        </View>

      )
    }
    return (
      <Container style={styles.container}>
        <Content>
          <FlatList
            data={this.state.posts}
            renderItem={({ item }) =>
              <CardComponent
                userImage={{ uri: BaseURL + item.user[0].photo }}
                userName={item.user[0].name}
                likes='150'
                postImages={item.images}
                date={item.createtime}
                description={item.description} />}
          />



        </Content>
      </Container>
    );
  }
}

