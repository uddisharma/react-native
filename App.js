import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  Pressable,
  Image,
} from "react-native";

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    if (enteredGoalText == "") {
      alert("please enter some task ");
    } else {
      setCourseGoals((currentCourseGoals) => [
        ...currentCourseGoals,
        { text: enteredGoalText, id: Math.random().toString() },
      ]),
        setEnteredGoalText("");
    }
  }
  function deletetask(id) {
    // console.log("Deleting", id);
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((list) => list.id !== id);
    });
  }
  return (
    <View style={styles.appContainer}>
      <View style={styles.header}>
        <Image style={styles.img} source={require("./assets/target.png")} />
        <Text style={styles.heading}> TODO </Text>
      </View>
      <Text style={styles.navbar}>Add your daily tasks</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your task here !"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <Button title="Add Task" onPress={addGoalHandler} />
      </View>
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => {
            return (
              <View style={styles.goalItem}>
                <Text style={styles.goalText}>{itemData.item.text}</Text>
                <Pressable onPress={() => deletetask(itemData.item.id)}>
                  <Text style={styles.goalText}>Delete</Text>
                </Pressable>
              </View>
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  goalsContainer: {
    flex: 5,
  },
  goalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "white",
  },
  heading: {
    fontSize: 20,
    color: "black",
    fontStyle: "italic",
  },
  header: {
    flexDirection: "row",
  },
  img: {
    height: 35,
    width: 35,
  },
  navbar: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "red",
    color: "white",
    fontSize: 20,
    marginTop: 15,
  },
});
