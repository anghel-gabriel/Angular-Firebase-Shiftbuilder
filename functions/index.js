const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Update user email
exports.adminUpdateUserEmail = functions.https.onCall(async (data, context) => {
  const {userId, newEmail} = data;
  try {
    await admin.auth().updateUser(userId, {email: newEmail});
    return {success: true};
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});

// Delete user
exports.adminDeleteUser = functions.https.onCall(async (data, context) => {
  const {userId} = data;
  try {
    await admin.auth().deleteUser(userId);
    return {success: true};
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});

// Disable user
exports.adminDisableUser = functions.https.onCall(async (data, context) => {
  const {userId} = data;
  try {
    await admin.auth().updateUser(userId, {disabled: true});
    return {success: true};
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});

// Enable user
exports.adminEnableUser = functions.https.onCall(async (data, context) => {
  try {
    const {userId} = data;
    await admin.auth().updateUser(userId, {disabled: false});
    return {success: true};
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});

// Change user password
exports.adminChangeUserPassword = functions.https.onCall(
    async (data, context) => {
      const {userId, newPassword} = data;
      try {
        await admin.auth().updateUser(userId, {password: newPassword});
        return {success: true};
      } catch (error) {
        throw new functions.https.HttpsError("internal", error.message);
      }
    },
);

