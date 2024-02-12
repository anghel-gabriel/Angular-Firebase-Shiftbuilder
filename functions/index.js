const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Update user email
exports.adminUpdateUserEmail = functions.https.onCall(async (data, context) => {
  // Authentication / Authorization checks
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "permission-denied",
        "Must be an admin to call this function.",
    );
  }

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
  // Authentication / Authorization checks
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "permission-denied",
        "Must be an admin to call this function.",
    );
  }

  const {userId} = data;
  try {
    await admin.auth().deleteUser(userId);
    return {success: true};
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});


