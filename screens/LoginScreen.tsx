import React, { useEffect, useState } from "react";
import { StyleSheet, Image, ImageBackground } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Container, Button, Text, View, Item } from "native-base";
//@ts-ignore
import backGroundImage from "../assets/image.png";
//@ts-ignore
import appLogo from "../assets/icon.png";
import { useDispatch } from "react-redux";
import STORE_CONSTS from "../store/Consts";
import { getValueFor, saveValue } from "../secureStorage/helpers";
import axios, { AxiosRequestConfig } from "axios";
import TextBox from "../components/Login/TextBox";
interface Props {}

const LoginScreen = (props: Props) => {
  const [username, setUsername] = useState<string>();
  const [errorTxt, setErrorText] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const dispatch = useDispatch();
  const initAxiosConfig = (access_token: string) => {
    axios.interceptors.request.use(function (config: AxiosRequestConfig) {
      config.headers.Authorization = `Bearer ${access_token}`;
      return config;
    });
  };

  useEffect(() => {
    let isMounted = true;
    setInitializing(true);
    // get access token from local storage
    getValueFor("access_token").then((access_token) => {
      axios
        .post("http://192.168.1.83:3005/auth/refresh", { access_token })
        .then((result) => {
          dispatch({
            type: STORE_CONSTS.USER.ACTIONS.LOGIN,
            payload: { access_token: result.data.access_token },
          });
          initAxiosConfig(result.data.access_token || "");
        })
        .catch((e) => {
          console.log(e);
        });
      // if page is not mounted do not performe an state update
      if (isMounted) setInitializing(false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const login = () => {
    {
      setLoading(true);
      axios
        .post("http://192.168.1.83:3005/auth/login", {
          user: { username: username, password: password },
        })
        .then((result) => {
          dispatch({
            type: STORE_CONSTS.USER.ACTIONS.LOGIN,
            payload: { ...result.data },
          });
          setLoading(false);
          saveValue("access_token", result.data.access_token);
          initAxiosConfig(result.data.access_token);
        })
        .catch((err) => {
          setLoading(false);
          setErrorText("נסיון ההתחברות נכשל נא לנסות שוב ");
        });
    }
  };
  if (initializing) {
    return <Text>loading</Text>;
  }
  return (
    <Container>
      <Spinner
        visible={loading}
        textContent={"טוען"}
        textStyle={{ color: "#fff" }}
        overlayColor={"#5CD3AD9C"}
        size="large"
      />
      <ImageBackground source={backGroundImage} style={styles.image}>
        <View style={styles.imageContainer}>
          <Image source={appLogo} style={styles.logo} />
        </View>
        <View style={styles.textboxsContainer}>
          <TextBox
            icon="user"
            iconType="FontAwesome5"
            placeHolder="שם משתמש"
            active={true}
            textChanged={(txt) => setUsername(txt)}
          ></TextBox>
          <TextBox
            icon="lock"
            iconType="FontAwesome5"
            placeHolder="סיסמה"
            active={false}
            textChanged={(txt) => setPassword(txt)}
          ></TextBox>

          <Item rounded style={styles.resultContainer}>
            <Text style={{ color: "red", textAlign: "right" }}>{errorTxt}</Text>
          </Item>

          <Button bordered style={{ ...styles.btn }}>
            <Text style={styles.btnTxt} onPress={login}>
              התחבר
            </Text>
          </Button>
        </View>
      </ImageBackground>
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: "#FFFFFFDB",
    marginVertical: 10,
    color: "#fff",
    backgroundColor: "#FFFFFFDB",
  },
  resultContainer: {
    borderWidth: 0,
    marginVertical: 10,
    borderColor: "transparent",

    backgroundColor: "transparent",
  },
  icon: {
    marginStart: 17,
  },
  text: {
    marginStart: 5,
    direction: "rtl",
    textAlign: "right",
    color: "#4f4e4e",
  },
  btn: {
    marginHorizontal: 4,
    backgroundColor: "#CFFFE4DB",
    width: "50%",
    textAlign: "center",
    borderColor: "#CFFFE4DB",
    overflow: "hidden",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  logo: {
    resizeMode: "cover",
    justifyContent: "center",
    maxHeight: 200,
    maxWidth: 200,
  },
  btnTxt: {
    color: "#00000091",
    width: "100%",
    textAlign: "center",
  },
  textboxsContainer: {
    flex: 1,
    margin: "5%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    margin: "5%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
