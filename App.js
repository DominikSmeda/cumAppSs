import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from "./components/Main"
import Gallery from "./components/Gallery";
import BigPhoto from "./components/BigPhoto";
import CameraScreen from "./components/CameraScreen";

const Root = createStackNavigator({
  Main: { screen: Main },
  CameraScreen: { screen: CameraScreen },
  Gallery: { screen: Gallery },
  BigPhoto: { screen: BigPhoto },

});

const App = createAppContainer(Root);

export default App;