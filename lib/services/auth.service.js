import {auth, storage, firebase} from "../firebase";

export const signInWithEmailAndPwdService = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    return err;
  }
};

export const signInWithSocialService = async (provider) => {
  try {
    await auth.signInWithPopup(provider);
  } catch (err) {
    return err;
  }
};

export const signOutService = async () => {
  try {
    await auth.signOut();
  } catch (err) {
    return err;
  }
};

export const sendPasswordResetEmailService = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
  } catch (err) {
    return err;
  }
};

export const sendVerificationEmailService = async () => {
  try {
    await auth.currentUser.sendEmailVerification();
  } catch (err) {
    return err;
  }
};

export const setPasswordService = async (email, password) => {
  try {
    await auth.currentUser.linkAndRetrieveWithCredential(firebase.auth.EmailAuthProvider.credential(email, password));
  } catch (err) {
    return err;
  }
};

export const changePasswordService = async (newPassword) => {
  try {
    await auth.currentUser.updatePassword(newPassword);
  } catch (err) {
    return err;
  }
};

export const reauthenticateService = async (email, password) => {
  try {
    await auth.currentUser.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(email, password));
  } catch (err) {
    return err;
  }
};

/**
 * service - updates user profile
 * @param {object} data
 */
export const updateUserService = async (data) => {
  try {
    await auth.currentUser.updateProfile(data);
  } catch (err) {
    return err;
  }
};

export const uploadFileService = async (file, name, path) => {
  try {
    const upload = new Promise((resolve, reject) => {
      const storageRef = storage.ref();

      const imageDir = storageRef.child(path);
      const task = imageDir.put(file);

      task.on("state_changed", (snapshot) => {
        const progress = Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(progress);
      }, (err) => reject(err), () => resolve(task.snapshot));
    });

    await upload();
  } catch (err) {
    return err;
  }
};
