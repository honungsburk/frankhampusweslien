const {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  initializeAdminEnvironment,
  RulesTestEnvironment,
} = require("@firebase/rules-unit-testing");
const fs = require("fs");
const { firebaseConfig } = require("../Env/firebase.secrets");
const { setDoc, doc, deleteDoc } = require("firebase/firestore");

const testEnv = initializeTestEnvironment({
  projectId: firebaseConfig.projectId,
  firestore: {
    rules: fs.readFileSync("firestore.rules", "utf8"),
  },
});

const unauthUser = testEnv.then((a) => a.unauthenticatedContext());
const firestore = unauthUser.then((a) => a.firestore());

describe("An unauthed user", () => {
  it("Can not create documents under 'art/'", async () => {
    const db = await firestore;
    const testDoc = db.collection("art").doc("testDoc");
    await assertFails(
      testDoc.set({
        random: "random",
      })
    );
  });

  it("Can not delete documents under 'art/'", async () => {
    const env = await testEnv;
    env.withSecurityRulesDisabled((ctx) => {
      ctx
        .firestore()
        .collection("art")
        .doc("testDoc")
        .set({ random: "random" });
    });

    const db = await firestore;
    const testDoc = db.collection("art").doc("testDoc");
    await assertFails(testDoc.delete());
  });

  test("Can read documents under 'art/'", async () => {
    const db = await firestore;
    const testDoc = db.collection("art").doc("testDoc");
    await assertSucceeds(testDoc.get());
  });
});

afterEach(async () => {
  const env = await testEnv;
  env.clearFirestore();
});

afterAll(async () => {
  const env = await testEnv;
  env.cleanup();
});
