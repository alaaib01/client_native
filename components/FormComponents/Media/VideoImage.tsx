import React from "react";
import { StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { COLORS } from "../../../constants/Colors";
import { Button, H3, Icon, Text, Thumbnail, View } from "native-base";
import RightElements from "../General/RightElements";
import VidePlayer from "./VideoPlayer";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import { IFormControlProps } from "../../../interfaces/BaseConditionalForm";
import { useDispatch } from "react-redux";
import STORE_CONSTS from "../../../store/Consts";
import GetComponentFromChildren from "../General/GetComponentFromChildren";
import BaseFormComponent from "../General/BaseFormComponent";

interface Props extends IFormControlProps {}

interface IMedia {
  id: string;
  uri: string;
  fileName: string;
}
const VideoImage = (props: Props) => {
  const [image, setImage] = useState<IMedia[]>([]);
  const [videos, setVideos] = useState<IMedia[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<JSX.Element>();
  const dispatch = useDispatch();

  // check permissions to camera and stoarge
  const [permission, askForPermission] = Permissions.usePermissions(
    [Permissions.CAMERA, Permissions.MEDIA_LIBRARY],
    { ask: true }
  );
  if (!permission || permission.status !== "granted") {
    askForPermission();
  }

  const valueChanged = () => {
    dispatch({
      type: STORE_CONSTS.FORM.ACTIONS.ADD_PROP,
      payload: {
        [props.uid]: {
          videos: videos,
          images: image,
        },
      },
    });
    const component = GetComponentFromChildren(
      props.childComponents,
      props.uid
    );
    if (component) {
      setSelectedComponent(component);
    }
  };
  // save media to device
  const saveMediaToDevice = async (result: ImagePicker.ImagePickerResult) => {
    if (result.cancelled) return;
    const asset = await MediaLibrary.createAssetAsync(result.uri);
    if (asset.mediaType === "video") {
      setVideos((currstate) => [
        ...currstate,
        { id: asset.id, uri: asset.uri, fileName: asset.filename },
      ]);
    } else {
      setImage((currstate) => [
        ...currstate,
        { id: asset.id, uri: asset.uri, fileName: asset.filename },
      ]);
    }
  };

  // get media from device
  const getMediaFromDevice = async (result: ImagePicker.ImagePickerResult) => {
    if (result.cancelled) return;
    if (result.type === "video") {
      setVideos((currstate) => [
        ...currstate,
        { id: result.id, uri: result.uri, fileName: result.filename },
      ]);
    } else {
      setImage((currstate) => [
        ...currstate,
        { id: result.id, uri: result.uri, fileName: result.filename },
      ]);
    }
  };
  //open cam to take an image or a video
  const pickImage = async () => {
    let result: ImagePicker.ImagePickerResult = await ImagePicker.launchCameraAsync(
      {
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 0,
        videoQuality: 0,
      }
    );
    await saveMediaToDevice(result);
    valueChanged();
  };
  const pickImageFromGalery = async () => {
    let result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync(
      {
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 0,
        videoQuality: 0,
        exif: true,
      }
    );

    await getMediaFromDevice(result);
    valueChanged();
  };
  return (
    <BaseFormComponent
      value={[...videos, ...image]}
      finalStep={props.finalStep}
      uid={props.uid}
      title={props.title}
      subText={props.subTitle}
      helperText={props.helperText}
      subChildren={<RightElements>{selectedComponent}</RightElements>}
    >
      <View>
        <RightElements>
          <H3>תמונות</H3>
        </RightElements>
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            marginVertical: 15,
            elevation: 3,
            flexDirection: "row",
          }}
        >
          {image.length ? (
            image.map((src) => {
              return (
                <Thumbnail
                  square
                  key={src.id || src.uri}
                  source={{ uri: src.uri }}
                  style={{ height: 150, width: 150, margin: 10 }}
                />
              );
            })
          ) : (
            <Text>אין תמונות להצגה</Text>
          )}
        </View>
        <RightElements>
          <H3>ווידאו</H3>
        </RightElements>
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            marginVertical: 14,
            flexDirection: "column",
          }}
        >
          {videos.length ? (
            videos.map((src) => {
              return <VidePlayer key={src.id || src.uri} videoSrc={src} />;
            })
          ) : (
            <Text>אין סרטונים להצגה</Text>
          )}
        </View>
        <View style={styles.btnGroup}>
          <Button style={styles.btn} onPress={pickImage}>
            <Text>מצלמה</Text>
            <Icon name="camera" />
          </Button>
          <Button
            style={{ ...styles.btn, ...styles.secondaryBtn }}
            onPress={pickImageFromGalery}
          >
            <Text>העלאה</Text>
            <Icon name="file-upload" type="FontAwesome5" />
          </Button>
        </View>
      </View>
    </BaseFormComponent>
  );
};

export default VideoImage;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.main.PRIMARY,
    marginEnd: 3,
    marginVertical: 3,
  },
  secondaryBtn: {
    backgroundColor: COLORS.LIGHT.PRIMARY,
  },
  btnGroup: {
    flex: 1,
    flexDirection: "row",
  },
});
