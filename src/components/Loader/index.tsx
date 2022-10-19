import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import COLORS from "../../utilities/constants/Color";

      type Props = {
        'visible'?: boolean;
      }

const Loader = ({ visible = false } : Props) : JSX.Element => {
  const { width, height } = useWindowDimensions();
  return (
       <>
       { visible && (
         <View style={[style.container, { height, width }]}>
        <View style={style.loader}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          <Text style={{ marginLeft: 10, fontSize: 16 }}>
            Veuillez patienter ....
          </Text>
        </View>
      </View>
       )}
       </>
    )
  
};

const style = StyleSheet.create({
  loader: {
    height: 70,
    backgroundColor: COLORS.white,
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  container: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
});

export default Loader;
