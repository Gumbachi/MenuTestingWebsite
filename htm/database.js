import { MongoClient } from "mongodb";
const uri =
    "mongodb+srv://edit_priveleges:ZoCqMsZBTZID1Zq6@hci-research-cluster.ym5a0.mongodb.net/UserDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
client.connect((err) => {
    const coll = client.db("UserDB").collection("Users");
    // perform actions on the collection object
    client.close();
});
