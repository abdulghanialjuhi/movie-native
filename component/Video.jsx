import React, { Component, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import Context from "../context/Context";

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: [],
      isLoaded: true,
    };
  }
  _isMounted = true;

  componentDidMount() {
    if (this.props.isLoaded) {
      try {
        fetch(
          `https://api.themoviedb.org/3/movie/${this.props.id}/videos?api_key=c417b9996e32c1b5ea31b6d166a52ff9`
        )
          .then((res) => res.json())
          .then((data) => {
            if (this._isMounted) {
              const videos = data.results;
              this.setState({
                video: videos,
                isLoaded: true,
              });
            }
          });
      } catch {
        alert("Please refresh the page ");
      }
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  static contextType = Context;
  render() {
    const { darkMode, language } = this.context;

    if (!this.state.isLoaded) {
      return <Text>loading</Text>;
    } else if (this.state.video.length >= 1) {
      const { video } = this.state;
      const length = video.length > 1 ? 1 : video.length;
      for (let i = 0; i < length; i++) {
        const video1 = video[i];
        return (
          <View
            style={[
              styles.container,
              { backgroundColor: darkMode ? "#0c0c0c" : "#f7f7f7" },
            ]}
          >
            <Text
              style={{
                borderBottomWidth: 10,
                color: "gray",
                fontSize: 18,
                margin: 5,
              }}
            >
              {language ? "Trailer" : "الفيديو الترويجي"}
            </Text>
            <WebView
              style={{
                width: 370,
                maxWidth: "95%",
                height: 60,
                maxHeight: 210,
              }}
              source={{ uri: `https://www.youtube.com/embed/${video1.key}` }}
            />
          </View>
        );
      }
    } else {
      return <Text>{""}</Text>;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    width: "99%",
    padding: 2,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    height: 300,
  },
});
export default Video;
