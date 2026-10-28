import type { Mode, Question, Topic } from "./types";

export const TBL = `STUDENT
RollNo | Name  | Class | Marks
1      | Asha  | XII   | 85
2      | Ravi  | XII   | 72
3      | Meena | XII   | 91
4      | Kabir | XI    | 66
5      | Divya | XII   | 80`;

type Extra = { table?: string; result?: string; code?: boolean };
/** ans = index (0-3) of the correct option. */
const mk =
  (topic: Topic) =>
  (id: string, tag: string, mode: Mode, level: 1 | 2 | 3, text: string, show: string | undefined, options: string[], ans: number, why: string, hint: string, x: Extra = {}): Question => ({
    id, topic, tag, mode, level, text, show, options, answer: options[ans], why, hint, ...x,
  });
const f = mk("files");
const s = mk("sql");
const p = mk("pysql");
const T = { table: TBL };

export const BANK: Question[] = [
  // ---------- Python Files: Binary Files / CSV Files ----------
  f("F1", "Binary Files", "complete", 1, "Choose the mode that fills the blank so the file is created (or overwritten) for writing binary data.",
    `import pickle\nf = open("stud.dat", "____")\npickle.dump([1, "Asha"], f)\nf.close()`,
    ["w", "rb", "wb", "ab"], 2, 'Mode "wb" = write + binary. pickle always needs a binary mode, and "ab" would append instead of overwrite.', "Two letters: write and binary."),
  f("F2", "Binary Files", "predict", 1, "Predict the output.",
    `import pickle\nwith open("d.dat", "wb") as f:\n    pickle.dump(10, f)\n    pickle.dump(20, f)\nwith open("d.dat", "rb") as f:\n    print(pickle.load(f))\n    print(pickle.load(f))`,
    ["20\n10", "10\n20", "10 20", "Error"], 1, "Each load() returns the next pickled object, in the order written.", "load() reads objects one at a time, in order.", { code: true }),
  f("F3", "CSV Files", "complete", 1, "Choose the function that fills the blank to create a reader object for the open file f.",
    `import csv\nf = open("data.csv", "r")\nr = csv.____(f)\nfor row in r:\n    print(row)`,
    ["writer", "reader", "read", "readlines"], 1, "csv.reader(f) returns an iterator that yields each row as a list of strings.", "It is the opposite of writer."),
  f("F4", "CSV Files", "predict", 2, "data.csv contains the three lines shown. Predict the output.",
    `# data.csv\nname,marks\nRavi,80\nMina,92\n\nimport csv\nwith open("data.csv") as f:\n    for row in csv.reader(f):\n        print(row[0], row[1])`,
    ["Ravi 80\nMina 92", "name,marks\nRavi,80\nMina,92", "name marks\nRavi 80\nMina 92", "['name', 'marks']\n['Ravi', '80']\n['Mina', '92']"], 2,
    "csv.reader also returns the header row. print() separates two arguments by a space.", "The header line is also a row.", { code: true }),
  f("F5", "Binary Files", "debug", 2, "This program should store a dictionary in a binary file but raises an error. Which replacement for the faulty line fixes it?",
    `import pickle\nf = open("s.dat", "w")\npickle.dump({"id": 1}, f)\nf.close()`,
    ['f = open("s.dat", "r")', 'f = open("s.dat", "wt")', 'f = open("s.dat", "wb")', 'f = open("s.dat", "w+")'], 2,
    'pickle.dump() writes bytes, so the file must be opened in binary mode "wb".', "Look at the mode string.", { code: true }),
  f("F6", "CSV Files", "debug", 2, "This program should write one row to o.csv but fails. Which replacement for the faulty line fixes it?",
    `import csv\nf = open("o.csv", "w")\nw = csv.writer(f)\nw.writerow(["id", "name"])\nw.writerows(1, "A")\nf.close()`,
    ['w.writerow(1, "A")', 'w.writerows([1, "A"])', 'w.write([1, "A"])', 'w.writerow([1, "A"])'], 3,
    "writerow() takes ONE list (a row). writerows() takes a list of rows. Neither accepts two separate values.", "Pass the whole row as a single list.", { code: true }),
  f("F7", "CSV Files", "write", 2, "Which program correctly reads marks.csv (header: name,marks) and displays the names of students with marks above 80?", undefined,
    [
      `import csv\nwith open("marks.csv") as f:\n    r = csv.reader(f)\n    for row in r:\n        if int(row[1]) > 80:\n            print(row[0])`,
      `import csv\nwith open("marks.csv") as f:\n    r = csv.reader(f)\n    next(r)\n    for row in r:\n        if row[1] > 80:\n            print(row[0])`,
      `import csv\nwith open("marks.csv") as f:\n    r = csv.reader(f)\n    next(r)\n    for row in r:\n        if int(row[1]) > 80:\n            print(row[0])`,
      `import csv\nwith open("marks.csv") as f:\n    r = csv.writer(f)\n    next(r)\n    for row in r:\n        if int(row[1]) > 80:\n            print(row[0])`,
    ], 2,
    "Only this version skips the header with next(r), converts marks to int before comparing with 80, and uses csv.reader. The others crash on the header (ValueError), compare str with int (TypeError), or use csv.writer.",
    "CSV values are strings, and the first row is the header.", { code: true }),
  f("F8", "Binary Files", "write", 3, 'Which program searches for a roll number (entered by the user) in stud.dat, which stores records as lists [roll, name], and displays the record or "Not found"?', undefined,
    [
      `import pickle\nr = int(input("Roll no: "))\nfound = False\nwith open("stud.dat", "rb") as f:\n    while True:\n        rec = pickle.load(f)\n        if rec[0] == r:\n            print(rec)\n            found = True\nif not found:\n    print("Not found")`,
      `import pickle\nr = int(input("Roll no: "))\nwith open("stud.dat", "rb") as f:\n    try:\n        while True:\n            rec = pickle.load(f)\n            if rec[0] == r:\n                print(rec)\n            else:\n                print("Not found")\n    except EOFError:\n        pass`,
      `import pickle\nr = int(input("Roll no: "))\nfound = False\ntry:\n    with open("stud.dat", "r") as f:\n        while True:\n            rec = pickle.load(f)\n            if rec[0] == r:\n                print(rec)\n                found = True\nexcept EOFError:\n    pass\nif not found:\n    print("Not found")`,
      `import pickle\nr = int(input("Roll no: "))\nfound = False\ntry:\n    with open("stud.dat", "rb") as f:\n        while True:\n            rec = pickle.load(f)\n            if rec[0] == r:\n                print(rec)\n                found = True\nexcept EOFError:\n    pass\nif not found:\n    print("Not found")`,
    ], 3,
    'Only the last program opens the file in "rb", loads records in a loop until EOFError, and prints "Not found" once after the loop. The others never catch EOFError, print "Not found" for every non-matching record, or open in text mode.',
    "Loop with pickle.load() inside try / except EOFError.", { code: true }),
  f("F9", "Binary Files", "predict", 3, "Predict the output.",
    `import pickle\nf = open("n.dat", "wb")\nfor i in (5, 6, 7):\n    pickle.dump(i, f)\nf.close()\nf = open("n.dat", "rb")\npickle.load(f)\nx = pickle.load(f)\nf.seek(0)\ny = pickle.load(f)\nprint(x, y)\nf.close()`,
    ["5 6", "7 5", "6 6", "6 5"], 3, "The first load() skips 5; the second returns 6 (x). seek(0) goes back to the start, so y is 5.", "seek(0) rewinds the file pointer."),

  // ---------- MySQL Table Questions ----------
  s("S1", "MySQL", "type", 1, "Which query displays the names of students who scored more than 80 marks?", undefined,
    ["SELECT Name FROM STUDENT WHERE Marks >= 80;", "SELECT * FROM STUDENT WHERE Marks > 80;", "SELECT Name FROM STUDENT WHERE Marks > 80;", "SELECT Marks FROM STUDENT WHERE Name > 80;"], 2,
    "SELECT picks the column, WHERE filters the rows. Strictly more than 80 excludes Divya (80).", "Use > not >=.", { ...T, result: "Name\nAsha\nMeena", code: true }),
  s("S2", "MySQL", "mcq", 1, "Which clause is used to sort the rows of a query result?", undefined,
    ["GROUP BY", "ORDER BY", "WHERE", "HAVING"], 1,
    "ORDER BY sorts; GROUP BY groups rows; WHERE filters rows; HAVING filters groups.", "Think of the word 'order'."),
  s("S3", "MySQL", "complete", 1, "Choose the symbol that completes the command to display all columns of all students.", "SELECT ____ FROM STUDENT;",
    ["ALL", "%", "*", "ANY"], 2, "The asterisk (*) means all columns.", "A single symbol.", { ...T }),
  s("S4", "MySQL", "predict", 1, "Predict the output.", "SELECT COUNT(*) FROM STUDENT WHERE Marks >= 80;",
    ["2", "4", "5", "3"], 3, "Asha (85), Meena (91) and Divya (80) satisfy Marks >= 80.", "Is 80 itself included?", { ...T, result: "COUNT(*)\n3" }),
  s("S5", "MySQL", "predict", 2, "Predict the output.", "SELECT Name FROM STUDENT\nWHERE Class = 'XII'\nORDER BY Marks DESC LIMIT 2;",
    ["Asha\nMeena", "Ravi\nDivya", "Meena\nAsha", "Meena\nDivya"], 2, "XII marks: 91, 85, 80, 72. Descending order, first two rows: Meena, Asha.", "Sort first, then take the top two.", { ...T, result: "Name\nMeena\nAsha", code: true }),
  s("S6", "MySQL", "debug", 2, "This query should show rows where Marks is empty (NULL) but never works. Which corrected query is right?",
    "SELECT Name FROM STUDENT WHERE Marks = NULL;",
    ["SELECT Name FROM STUDENT WHERE Marks == NULL;", "SELECT Name FROM STUDENT WHERE Marks LIKE NULL;", "SELECT Name FROM STUDENT WHERE Marks = 'NULL';", "SELECT Name FROM STUDENT WHERE Marks IS NULL;"], 3,
    "NULL cannot be compared with =. Use IS NULL / IS NOT NULL.", "Which operator tests for NULL?", { ...T, result: "Empty set (no student has NULL marks)", code: true }),
  s("S7", "MySQL", "debug", 2, "This query should show classes with an average mark above 70. Which corrected query is right?",
    "SELECT Class, AVG(Marks) FROM STUDENT\nWHERE AVG(Marks) > 70\nGROUP BY Class;",
    ["SELECT Class, AVG(Marks) FROM STUDENT\nGROUP BY Class\nHAVING AVG(Marks) > 70;", "SELECT Class, AVG(Marks) FROM STUDENT\nHAVING AVG(Marks) > 70\nGROUP BY Class;", "SELECT Class, AVG(Marks) FROM STUDENT\nGROUP BY Class\nWHERE AVG(Marks) > 70;", "SELECT Class, AVG(Marks) FROM STUDENT\nORDER BY Class\nHAVING AVG(Marks) > 70;"], 0,
    "Aggregate conditions on groups go in HAVING, written after GROUP BY, never in WHERE.", "Which clause filters groups?", { ...T, result: "Class | AVG(Marks)\nXII   | 82.0000", code: true }),
  s("S8", "MySQL", "complete", 2, "Choose the clause that completes the query to show the number of students in each class.", "SELECT Class, COUNT(*) FROM STUDENT\n____ Class;",
    ["ORDER BY", "HAVING", "WHERE", "GROUP BY"], 3, "GROUP BY Class forms one group per class so COUNT(*) works per group.", "Two words.", { ...T, result: "XII | 4\nXI  | 1" }),
  s("S9", "MySQL", "type", 3, "Which command increases the marks of the student with RollNo 4 by 5?", undefined,
    ["UPDATE STUDENT SET Marks = Marks + 5;", "UPDATE STUDENT SET Marks = Marks + 5 WHERE RollNo = 4;", "UPDATE STUDENT SET Marks = 5 WHERE RollNo = 4;", "ALTER STUDENT SET Marks = Marks + 5 WHERE RollNo = 4;"], 1,
    "UPDATE ... SET changes values; WHERE limits it to one row. Without WHERE every row changes.", "Do not forget WHERE.", { ...T, result: "Query OK, 1 row affected", code: true }),
  s("S10", "MySQL", "type", 3, "Which query displays each class with its highest marks?", undefined,
    ["SELECT MAX(Marks) FROM STUDENT;", "SELECT Class, MAX(Marks) FROM STUDENT ORDER BY Class;", "SELECT Class, MAX(Marks) FROM STUDENT;", "SELECT Class, MAX(Marks) FROM STUDENT GROUP BY Class;"], 3,
    "MAX() is an aggregate; GROUP BY Class gives one result per class.", "Aggregate + GROUP BY.", { ...T, result: "XII | 91\nXI  | 66", code: true }),
  s("S11", "MySQL", "mcq", 3, "What is the difference between DELETE and DROP TABLE?", undefined,
    ["Both remove only rows", "DELETE removes rows; DROP TABLE removes the whole table structure", "DELETE removes the table; DROP TABLE removes rows", "There is no difference"], 1,
    "DELETE (DML) removes rows and keeps the table. DROP TABLE (DDL) removes the table itself.", "One removes data, the other removes the table."),
  s("S12", "MySQL", "predict", 3, "Predict the output.", "SELECT Name FROM STUDENT\nWHERE Name LIKE '%a'\nORDER BY Name;",
    ["Kabir\nRavi", "Divya\nMeena\nAsha", "Asha\nMeena", "Asha\nDivya\nMeena"], 3, "'%a' matches names ending with a (MySQL LIKE ignores case by default). Kabir and Ravi do not end with a.", "% matches any characters.", { ...T, result: "Name\nAsha\nDivya\nMeena", code: true }),

  // ---------- Python-SQL Interface ----------
  p("P1", "Python–SQL", "complete", 1, "Choose the word that completes the import used for MySQL connectivity.", "import ____.connector as sql",
    ["sql", "mysqldb", "pymysql", "mysql"], 3, "The MySQL driver package is mysql-connector-python, imported as mysql.connector.", "Name of the database."),
  p("P2", "Python–SQL", "predict", 1, "con is a valid connection and cur = con.cursor(). Predict the output.", `cur.execute("SELECT Name FROM STUDENT WHERE Class='XI'")\nprint(cur.fetchone())`,
    ["Kabir", "('Kabir')", "('Kabir',)", "[('Kabir',)]"], 2, "fetchone() returns one row as a tuple. A single column gives a 1-element tuple, shown with a trailing comma.", "Rows come back as tuples.", { ...T }),
  p("P3", "Python–SQL", "predict", 2, "Predict the output.", `cur.execute("SELECT Name, Marks FROM STUDENT WHERE Marks > 85")\nrows = cur.fetchall()\nprint(len(rows))\nprint(rows[0])`,
    ["2\n('Meena', 91)", "1\n['Meena', 91]", "1\nMeena", "1\n('Meena', 91)"], 3, "Only Meena (91) has Marks > 85. fetchall() returns a list of tuples.", "Count the matching rows first.", { ...T, code: true }),
  p("P4", "Python–SQL", "debug", 2, "The new record never appears in the table after the program ends. What is the fix?",
    `import mysql.connector as sql\ncon = sql.connect(host="localhost", user="root", passwd="1234", database="school")\ncur = con.cursor()\ncur.execute("INSERT INTO STUDENT VALUES (6, 'Zoya', 'XII', 78)")\ncon.close()`,
    ["Add cur.fetchall() after cur.execute(...)", "Add con.commit() after cur.execute(...) and before con.close()", "Add cur.close() before con.close()", "Add con.save() before con.close()"], 1,
    "INSERT, UPDATE and DELETE are not saved until the connection is committed.", "Which connection method saves changes?"),
  p("P5", "Python–SQL", "write", 2, "Which program connects to the MySQL database school (host localhost, user root, password 1234) and displays the names of students with marks above 80 from table STUDENT?", undefined,
    [
      `import mysql.connector as sql\ncon = sql.connect(host="localhost", user="root", passwd="1234", database="school")\ncur = con.cursor()\ncur.execute("SELECT Name FROM STUDENT WHERE Marks >= 80")\nfor r in cur.fetchall():\n    print(r[0])\ncon.close()`,
      `import mysql.connector as sql\ncon = sql.connect(host="localhost", user="root", passwd="1234", database="school")\ncur = con.cursor()\ncon.execute("SELECT Name FROM STUDENT WHERE Marks > 80")\nfor r in cur.fetchall():\n    print(r[0])\ncon.close()`,
      `import mysql.connector as sql\ncon = sql.connect(host="localhost", user="root", passwd="1234", database="school")\ncur = con.cursor()\nfor r in cur.fetchall():\n    print(r[0])\ncon.close()`,
      `import mysql.connector as sql\ncon = sql.connect(host="localhost", user="root", passwd="1234", database="school")\ncur = con.cursor()\ncur.execute("SELECT Name FROM STUDENT WHERE Marks > 80")\nfor r in cur.fetchall():\n    print(r[0])\ncon.close()`,
    ], 3,
    "Only the last program connects, creates a cursor, runs execute() with Marks > 80, fetches the rows and prints the names. The others use >= 80 (includes Divya), call execute() on the connection instead of the cursor, or never execute a query.",
    "connect, cursor, execute, fetch.", { ...T, code: true }),
  p("P6", "Python–SQL", "debug", 3, "The program should display the record of the roll number entered, but the query always searches for the text 'r'. Which line fixes the query?",
    `r = int(input("Roll: "))\ncur.execute("SELECT * FROM STUDENT WHERE RollNo = r")\nprint(cur.fetchone())`,
    ['cur.execute("SELECT * FROM STUDENT WHERE RollNo = " + r)', 'cur.execute("SELECT * FROM STUDENT WHERE RollNo = {r}")', 'cur.execute("SELECT * FROM STUDENT WHERE RollNo = \'r\'")', 'cur.execute("SELECT * FROM STUDENT WHERE RollNo = {}".format(r))'], 3,
    'The SQL string must contain the value of r. Use format(), an f-string, % formatting or a parameterised query with %s. Option 1 fails because int + str is a TypeError, and option 2 lacks the f prefix.',
    "r is inside the quotes, so Python never substitutes it.", { code: true }),
  p("P7", "Python–SQL", "write", 3, "Which program accepts a roll number and a new mark, and updates the Marks of that student in table STUDENT (database school, user root, password 1234, host localhost)?", undefined,
    [
      `import mysql.connector as sql\ncon = sql.connect(host="localhost", user="root", passwd="1234", database="school")\ncur = con.cursor()\nr = int(input("Roll: "))\nm = int(input("New marks: "))\ncur.execute("UPDATE STUDENT SET Marks = {} WHERE RollNo = {}".format(m, r))\ncon.close()`,
      `import mysql.connector as sql\ncon = sql.connect(host="localhost", user="root", passwd="1234", database="school")\ncur = con.cursor()\nr = int(input("Roll: "))\nm = int(input("New marks: "))\ncur.execute("UPDATE STUDENT SET Marks = {} WHERE RollNo = {}".format(r, m))\ncon.commit()\ncon.close()`,
      `import mysql.connector as sql\ncon = sql.connect(host="localhost", user="root", passwd="1234", database="school")\ncur = con.cursor()\nr = int(input("Roll: "))\nm = int(input("New marks: "))\ncur.execute("SELECT * FROM STUDENT WHERE RollNo = {}".format(r))\ncon.commit()\ncon.close()`,
      `import mysql.connector as sql\ncon = sql.connect(host="localhost", user="root", passwd="1234", database="school")\ncur = con.cursor()\nr = int(input("Roll: "))\nm = int(input("New marks: "))\ncur.execute("UPDATE STUDENT SET Marks = {} WHERE RollNo = {}".format(m, r))\ncon.commit()\ncon.close()`,
    ], 3,
    "Only the last program reads both inputs, runs the UPDATE with the values in the right order, and calls commit(). The others forget commit(), swap the values, or run a SELECT instead of an UPDATE.",
    "Do not forget the step that saves changes.", { ...T, code: true }),
  p("P8", "Python–SQL", "predict", 3, "Predict the output.", `cur.execute("SELECT Name FROM STUDENT WHERE Class='XII' ORDER BY Marks")\nd = cur.fetchmany(2)\nprint(d)`,
    ["[('Meena',), ('Asha',)]", "[('Ravi', 72), ('Divya', 80)]", "('Ravi',)", "[('Ravi',), ('Divya',)]"], 3,
    "XII marks ascending: Ravi 72, Divya 80, Asha 85, Meena 91. fetchmany(2) returns the first two rows as a list of tuples.", "Ascending order is the default.", { ...T }),
];

export const TOPICS = [
  { id: "files" as Topic, icon: "📁", title: "Python Files", sub: "Binary Files · CSV Files", desc: "pickle, open modes, csv reader and writer, file pointers." },
  { id: "sql" as Topic, icon: "🗄️", title: "MySQL Table Questions", sub: "Queries on sample tables", desc: "SELECT, WHERE, GROUP BY, HAVING, UPDATE, aggregates." },
  { id: "pysql" as Topic, icon: "🔌", title: "Python–SQL Interface", sub: "mysql.connector", desc: "connect, cursor, execute, fetch, commit." },
];

export const MODE_LABEL: Record<Mode, string> = {
  complete: "Complete the code", predict: "Predict the output", write: "Choose the correct program",
  debug: "Debug the code", type: "Choose the correct SQL command", mcq: "Multiple choice",
};
