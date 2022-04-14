const {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} = require("@firebase/rules-unit-testing");
const fs = require("fs");
const { firebaseConfig } = require("../Env/firebase.secrets");
const {
  getStorage,
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytes,
} = require("firebase/storage");

const testEnv = initializeTestEnvironment({
  projectId: firebaseConfig.projectId,
  storage: {
    rules: fs.readFileSync("storage.rules", "utf8"),
  },
});
const unauthUser = testEnv.then((a) => a.unauthenticatedContext());
const unauthStorage = unauthUser.then((a) => a.storage());

test("Check that a user can not delete files under 'images/'", async () => {
  const user = await unauthUser;
  const desertRef = ref(user.storage(), "images/desert.jpg");
  await assertFails(deleteObject(desertRef));
});

test("Check that a user can read files under 'images/'", async () => {
  const env = await testEnv;
  await env.withSecurityRulesDisabled((ctx) => {
    return ctx
      .storage()
      .ref("images/desert.jpg")
      .put(Uint8Array.of(2, 1, 2, 34, 6, 61234, 12344, 32, 21, 3, 4, 5));
  });

  const storage = await unauthStorage;
  const desertRef = ref(storage, "images/desert.jpg");
  await assertSucceeds(getDownloadURL(desertRef));
});

test("Check that a user can not upload files under 'images/'", async () => {
  const user = await unauthUser;
  const desertRef = user
    .storage()
    .ref("images/desert.jpg")
    .put(Uint8Array.of(2, 1, 2, 34, 6, 61234, 12344, 32, 21, 3, 4, 5));
  await assertFails(desertRef);
});
