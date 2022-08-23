

// remove from array:
// db.todos.updateOne({ email: "qeqeqe3@gmail.com" }, { $pull: { meds: { dragRegNum: "167 06 36463 00" } } })

// add to array:
// db.todos.updateOne({ email: " " }, { $push: { meds: { dragRegNum: "167 06 36463 00" } } })

// update array:
// db.todos.updateOne({ email: " " }, { $set: { meds: { dragRegNum: "167 06 36463 00" } } })

// regex return only numbers:
// re.sub("[^\d]", "", "$asd1,999,88asd8.77")
