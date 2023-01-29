import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';

import { useAuthValue } from '../auth/context';
import Dialog from 'react-native-dialog';
import Spinner from 'react-native-loading-spinner-overlay';
import { Text } from 'react-native-paper';
import Switch from '../components/Switch';
import Header from '../components/Header';
import Screen from '../components/Screen';
import { FONTS, SIZES, theme } from '../core/theme';
import icons from '../core/icons';

const SectionTitle = ({ title }) => {
  return (
    <View style={{ marginTop: SIZES.padding }}>
      <Text style={{ color: theme.colors.lightGray3, ...FONTS.h4 }}>
        {title}
      </Text>
    </View>
  );
};

const Setting = ({ title, value, type, onPress }) => {
  if (type == 'switch' || 'null') {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          height: 50,
          alignItems: 'center',
        }}
      >
        <Text style={{ flex: 1, color: theme.colors.primary, ...FONTS.h4 }}>
          {title}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              marginRight: 5,
              color: theme.colors.lightGray3,
              ...FONTS.h4,
            }}
          >
            {value}
          </Text>

          {type == 'switch' ? (
            <Switch />
          ) : (
            <TouchableOpacity onPress={onPress}>
              <Image
                source={icons.rightArrow}
                style={{
                  height: 15,
                  width: 15,
                  tintColor: theme.colors.lightGray3,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  } else {
    return <View></View>;
  }
};

const Settings = (props) => {
  const { currentUser } = useAuthValue();
  const [visible, setVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [hidden, setHidden] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const signOut = () => {

  };

  const showAccountDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showPasswordDialog = () => {
    setHidden(true);
  };

  const handlePasswordCancel = () => {
    setHidden(false);
  };

  {
    /* Account Delete */
  }
  const accountDelete = async () => {
    setSpinner(true);
    const collectionRef = firestore;
    await collectionRef.collection('tokens').doc(userData.id).delete();
    await collectionRef.collection('users').doc(currentUser.id).delete();
    const user = auth.currentUser;
    user
      .delete()
      .then(function () {
        setSpinner(false);
        auth.signOut();
      })
      .catch(function (error) {
        setSpinner(false);
        console.log(error);
      });
  };

  {
    /* Password Change */
  }
  // //  Reauthenticate credential
  // reauthenticate = (currPass) => {
  //   const user = auth.currentUser;
  //   var cred = auth.EmailAuthProvider.credential(user.email, currPass);
  //   return user.reauthenticateWithCredential(cred);
  // };

  const passwordChange = () => {
    setSpinner(true);
    const user = auth.currentUser;
    const newPass = { newPassword };

    user
      .updatePassword(newPass)
      .then(() => {
        // Update successful.
        setHidden(false);
        setSpinner(false);
        Alert.alert('Password was changed');
      })
      .catch((error) => {
        setSpinner(false);
        console.log(error);
      });
  };

  return (
    <Screen style={styles.screen}>
      {/* <Header style={styles.header}>Settings</Header> */}

      <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.colors.primary, ...FONTS.h3 }}>
            {currentUser.username}
          </Text>
          <Text style={{ color: theme.colors.lightGray3, ...FONTS.body5 }}>
            ID: {currentUser.id}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={icons.verified} style={{ height: 20, width: 20 }} />
          <Text style={{ marginLeft: SIZES.base, color: theme.colors.green }}>
            Verified
          </Text>
        </View>
      </View>

      {/* App */}
      <SectionTitle title="App" />
      <Setting
        title="Appearance"
        value={Switch === true ? 'Dark' : 'Light'}
        type="switch"
        onPress={() => console.log('Pressed')}
      />

      {/* Account */}
      <SectionTitle title="Account" />
      <Setting
        title="Subscription"
        value="Subscribed"
        type=""
        onPress={() => console.log('Pressed')}
      />
      <Setting
        title="Language"
        value="English"
        type=""
        onPress={() => console.log('Pressed')}
      />

      {/* Security */}
      <SectionTitle title="Security" />
      <Setting
        title="Change Password"
        value=""
        type=""
        onPress={showPasswordDialog}
      />
      <Setting title="Delete Account" value="" onPress={showAccountDialog} />
      <Setting title="Sign Out" value="" onPress={signOut} />

      {/* Delete Account Dialog*/}
      <Dialog.Container visible={visible}>
        <Dialog.Title>Account delete</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this account? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Delete" onPress={accountDelete} />
      </Dialog.Container>

      {/* Change Password Dialog*/}
      <Dialog.Container visible={hidden}>
        <Dialog.Title>Change Password</Dialog.Title>
        <Dialog.Input
          label="Enter Current Password"
          onChangeText={(text) => setCurrentPassword({ text })}
        ></Dialog.Input>
        <Dialog.Input
          label="Enter New Password"
          onChangeText={(text) => setNewPassword({ text })}
        ></Dialog.Input>
        <Dialog.Button label="Cancel" onPress={handlePasswordCancel} />
        <Dialog.Button label="Ok" onPress={passwordChange} />
      </Dialog.Container>

      <Spinner
        visible={spinner}
        textStyle={{ color: '#fff' }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
  },
});

export default Settings;
