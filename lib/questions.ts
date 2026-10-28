import type { Check, Mode, Question, Topic } from "./types";

export const TBL = `STUDENT
RollNo | Name  | Class | Marks
1      | Asha  | XII   | 85
2      | Ravi  | XII   | 72
3      | Meena | XII   | 91
4      | Kabir | XI    | 66
5      | Divya | XII   | 80`;

type Extra = { table?: string; options?: string[]; result?: string };
const mk =
  (topic: Topic) =>
  (id: string, tag: string, mode: Mode, level: 1 | 2 | 3, text: string, show: string | undefined, answer: string, why: string, hint: string, check: Check, x: Extra = {}): Question => ({
    id, topic, tag, mode, level, text, show, answer, why, hint, check, ...x,
  });
const f = mk("files");
const s = mk("sql");
const p = mk("pysql");
const T = { table: TBL };

export const BANK: Question[] = [
  // ---------- Python Files: Binary Files / CSV Files ----------
  f("F1", "Binary Files", "complete", 1, "Fill in the blank so the file is created (or overwritten) for writing binary data.",
    `import pickle\nf = open("stud.dat", "____")\npickle.dump([1, "Asha"], f)\nf.close()`,
    "wb", 'Mode "wb" = write + binary. pickle always needs a binary mode.', "Two letters: write and binary.",
    { accepted: ["wb", '"wb"', "'wb'"], strict: true }),
  f("F2", "Binary Files", "predict", 1, "Predict the output.",
    `import pickle\nwith open("d.dat", "wb") as f:\n    pickle.dump(10, f)\n    pickle.dump(20, f)\nwith open("d.dat", "rb") as f:\n    print(pickle.load(f))\n    print(pickle.load(f))`,
    "10\n20", "Each load() returns the next pickled object, in the order written.", "load() reads objects one at a time, in order.",
    { accepted: ["10\n20"], output: true }),
  f("F3", "CSV Files", "complete", 1, "Fill in the blank to create a reader object for the open file f.",
    `import csv\nf = open("data.csv", "r")\nr = csv.____(f)\nfor row in r:\n    print(row)`,
    "reader", "csv.reader(f) returns an iterator that yields each row as a list of strings.", "It is the opposite of writer.",
    { accepted: ["reader", "csv.reader"], strict: true }),
  f("F4", "CSV Files", "predict", 2, "data.csv contains the three lines shown. Predict the output.",
    `# data.csv\nname,marks\nRavi,80\nMina,92\n\nimport csv\nwith open("data.csv") as f:\n    for row in csv.reader(f):\n        print(row[0], row[1])`,
    "name marks\nRavi 80\nMina 92", "csv.reader also returns the header row. print() separates two arguments by a space.", "The header line is also a row.",
    { accepted: ["name marks\nRavi 80\nMina 92"], output: true }),
  f("F5", "Binary Files", "debug", 2, "This program should store a dictionary in a binary file but raises an error. Rewrite the faulty line.",
    `import pickle\nf = open("s.dat", "w")\npickle.dump({"id": 1}, f)\nf.close()`,
    'f = open("s.dat", "wb")', 'pickle.dump() writes bytes, so the file must be opened in binary mode "wb".', "Look at the mode string.",
    { any: ["[\"']wb[\"']"] }),
  f("F6", "CSV Files", "debug", 2, "This program should write one row to o.csv but fails. Correct the faulty line.",
    `import csv\nf = open("o.csv", "w")\nw = csv.writer(f)\nw.writerow(["id", "name"])\nw.writerows(1, "A")\nf.close()`,
    'w.writerow([1, "A"])', "writerow() takes ONE list (a row). writerows() takes a list of rows. Neither accepts two separate values.", "Pass the whole row as a single list.",
    { any: ["writerow\\(\\s*\\[\\s*1\\s*,\\s*[\"']A[\"']\\s*\\]\\s*\\)", "writerows\\(\\s*\\[\\s*\\[\\s*1\\s*,\\s*[\"']A[\"']\\s*\\]\\s*\\]\\s*\\)"] }),
  f("F7", "CSV Files", "write", 2, 'Write a program to read marks.csv (header: name,marks) and display the names of students with marks above 80.',
    undefined,
    `import csv\nwith open("marks.csv") as f:\n    r = csv.reader(f)\n    next(r)          # skip header\n    for row in r:\n        if int(row[1]) > 80:\n            print(row[0])`,
    "A valid solution must: open the file, create a csv reader (or DictReader), skip the header, convert marks to a number, compare with 80 and print the name.",
    "CSV values are strings; convert before comparing.",
    { all: ["csv\\.(dict)?reader", "int\\(|float\\(", ">\\s*80", "print"] }),
  f("F8", "Binary Files", "write", 3, 'Write a program to search for a roll number (entered by the user) in the binary file stud.dat, which stores records as lists [roll, name]. Display the record, or "Not found".',
    undefined,
    `import pickle\nr = int(input("Roll no: "))\nfound = False\ntry:\n    with open("stud.dat", "rb") as f:\n        while True:\n            rec = pickle.load(f)\n            if rec[0] == r:\n                print(rec)\n                found = True\nexcept EOFError:\n    pass\nif not found:\n    print("Not found")`,
    'A valid solution must open the file in "rb", load records repeatedly until EOFError, compare the roll number, print the match, and print "Not found" otherwise.',
    "Loop with pickle.load() inside try / except EOFError.",
    { all: ["pickle\\.load", "[\"']rb[\"']", "EOFError|while True", "not found", "input\\("] }),
  f("F9", "Binary Files", "predict", 3, "Predict the output.",
    `import pickle\nf = open("n.dat", "wb")\nfor i in (5, 6, 7):\n    pickle.dump(i, f)\nf.close()\nf = open("n.dat", "rb")\npickle.load(f)\nx = pickle.load(f)\nf.seek(0)\ny = pickle.load(f)\nprint(x, y)\nf.close()`,
    "6 5", "The first load() skips 5; the second returns 6 (x). seek(0) goes back to the start, so y is 5.", "seek(0) rewinds the file pointer.",
    { accepted: ["6 5"], output: true }),

  // ---------- MySQL Table Questions ----------
  s("S1", "MySQL", "type", 1, "Write a query to display the names of students who scored more than 80 marks.", undefined,
    "SELECT Name FROM STUDENT WHERE Marks > 80;", "SELECT picks the column, WHERE filters the rows. Strictly more than 80 excludes Divya (80).", "Use > not >=.",
    { accepted: ["select name from student where marks>80"], forbid: [">="], all: ["^select name from student where marks>80$"] }, { ...T, result: "Name\nAsha\nMeena" }),
  s("S2", "MySQL", "mcq", 1, "Which clause is used to sort the rows of a query result?", undefined,
    "ORDER BY", "ORDER BY sorts; GROUP BY groups rows; WHERE filters rows; HAVING filters groups.", "Think of the word 'order'.",
    {}, { options: ["GROUP BY", "ORDER BY", "WHERE", "HAVING"] }),
  s("S3", "MySQL", "complete", 1, "Complete the command to display all columns of all students.", "SELECT ____ FROM STUDENT;",
    "*", "The asterisk (*) means all columns.", "A single symbol.", { accepted: ["*"], strict: true }, { ...T }),
  s("S4", "MySQL", "predict", 1, "Predict the output.", "SELECT COUNT(*) FROM STUDENT WHERE Marks >= 80;",
    "3", "Asha (85), Meena (91) and Divya (80) satisfy Marks >= 80.", "Is 80 itself included?", { accepted: ["3", "count(*) 3"], output: true }, { ...T, result: "COUNT(*)\n3" }),
  s("S5", "MySQL", "predict", 2, "Predict the output.", "SELECT Name FROM STUDENT\nWHERE Class = 'XII'\nORDER BY Marks DESC LIMIT 2;",
    "Meena\nAsha", "XII marks: 91, 85, 80, 72. Descending order, first two rows: Meena, Asha.", "Sort first, then take the top two.",
    { accepted: ["Meena Asha", "Name Meena Asha"], output: true }, { ...T, result: "Name\nMeena\nAsha" }),
  s("S6", "MySQL", "debug", 2, "This query should show rows where Marks is empty (NULL) but never works. Write the corrected query.",
    "SELECT Name FROM STUDENT WHERE Marks = NULL;",
    "SELECT Name FROM STUDENT WHERE Marks IS NULL;", "NULL cannot be compared with =. Use IS NULL / IS NOT NULL.", "Which operator tests for NULL?",
    { forbid: ["=\\s*null"], all: ["is null"] }, { ...T, result: "Empty set (no student has NULL marks)" }),
  s("S7", "MySQL", "debug", 2, "Correct this query, which should show classes with an average mark above 70.",
    "SELECT Class, AVG(Marks) FROM STUDENT\nWHERE AVG(Marks) > 70\nGROUP BY Class;",
    "SELECT Class, AVG(Marks) FROM STUDENT\nGROUP BY Class\nHAVING AVG(Marks) > 70;", "Aggregate conditions on groups go in HAVING after GROUP BY, never in WHERE.", "Which clause filters groups?",
    { forbid: ["where avg"], all: ["group by class having avg\\(marks\\)>70"] }, { ...T, result: "Class | AVG(Marks)\nXII   | 82.0000" }),
  s("S8", "MySQL", "complete", 2, "Complete the query to show the number of students in each class.", "SELECT Class, COUNT(*) FROM STUDENT\n____ Class;",
    "GROUP BY", "GROUP BY Class forms one group per class so COUNT(*) works per group.", "Two words.",
    { accepted: ["group by"], strict: true }, { ...T, result: "XII | 4\nXI  | 1" }),
  s("S9", "MySQL", "type", 3, "Write a command to increase the marks of the student with RollNo 4 by 5.", undefined,
    "UPDATE STUDENT SET Marks = Marks + 5 WHERE RollNo = 4;", "UPDATE ... SET changes values; WHERE limits it to one row. Without WHERE every row changes.", "Do not forget WHERE.",
    { accepted: ["update student set marks=marks+5 where rollno=4"], forbid: ["^update student set marks=marks\\+5$"], all: ["^update student set marks=marks\\+5 where rollno=4$"] }, { ...T, result: "Query OK, 1 row affected" }),
  s("S10", "MySQL", "type", 3, "Write a query to display each class with its highest marks.", undefined,
    "SELECT Class, MAX(Marks) FROM STUDENT GROUP BY Class;", "MAX() is an aggregate; GROUP BY Class gives one result per class.", "Aggregate + GROUP BY.",
    { accepted: ["select class,max(marks) from student group by class"], all: ["^select class,max\\(marks\\)( as \\w+)? from student group by class$"] }, { ...T, result: "XII | 91\nXI  | 66" }),
  s("S11", "MySQL", "mcq", 3, "What is the difference between DELETE and DROP TABLE?", undefined,
    "DELETE removes rows; DROP TABLE removes the whole table structure", "DELETE (DML) removes rows and keeps the table. DROP TABLE (DDL) removes the table itself.", "One removes data, the other removes the table.",
    {}, { options: ["Both remove only rows", "DELETE removes rows; DROP TABLE removes the whole table structure", "DELETE removes the table; DROP TABLE removes rows", "There is no difference"] }),
  s("S12", "MySQL", "predict", 3, "Predict the output.", "SELECT Name FROM STUDENT\nWHERE Name LIKE '%a'\nORDER BY Name;",
    "Asha\nDivya\nMeena", "'%a' matches names ending with a (MySQL LIKE ignores case by default). Kabir and Ravi do not end with a.", "% matches any characters.",
    { accepted: ["Asha Divya Meena", "Name Asha Divya Meena"], output: true }, { ...T, result: "Name\nAsha\nDivya\nMeena" }),

  // ---------- Python-SQL Interface ----------
  p("P1", "Python–SQL", "complete", 1, "Complete the import used for MySQL connectivity.", "import ____.connector as sql",
    "mysql", "The MySQL driver package is mysql-connector-python, imported as mysql.connector.", "Name of the database.",
    { accepted: ["mysql"], strict: true }),
  p("P2", "Python–SQL", "predict", 1, "con is a valid connection and cur = con.cursor(). Predict the output.", `cur.execute("SELECT Name FROM STUDENT WHERE Class='XI'")\nprint(cur.fetchone())`,
    "('Kabir',)", "fetchone() returns one row as a tuple. A single column gives a 1-element tuple, shown with a trailing comma.", "Rows come back as tuples.",
    { accepted: ["('Kabir',)"], output: true }, { ...T }),
  p("P3", "Python–SQL", "predict", 2, "Predict the output.", `cur.execute("SELECT Name, Marks FROM STUDENT WHERE Marks > 85")\nrows = cur.fetchall()\nprint(len(rows))\nprint(rows[0])`,
    "1\n('Meena', 91)", "Only Meena (91) has Marks > 85. fetchall() returns a list of tuples.", "Count the matching rows first.",
    { accepted: ["1\n('Meena', 91)"], output: true }, { ...T }),
  p("P4", "Python–SQL", "debug", 2, "The new record never appears in the table after the program ends. Fix the code.",
    `import mysql.connector as sql\ncon = sql.connect(host="localhost", user="root", passwd="1234", database="school")\ncur = con.cursor()\ncur.execute("INSERT INTO STUDENT VALUES (6, 'Zoya', 'XII', 78)")\ncon.close()`,
    "Add con.commit() after cur.execute(...) and before con.close().", "INSERT, UPDATE and DELETE are not saved until the connection is committed.", "Which connection method saves changes?",
    { all: ["\\.commit\\(\\)"] }),
  p("P5", "Python–SQL", "write", 2, "Write a program that connects to the MySQL database school (host localhost, user root, password 1234) and displays the names of students with marks above 80 from table STUDENT.", undefined,
    `import mysql.connector as sql\ncon = sql.connect(host="localhost", user="root", passwd="1234", database="school")\ncur = con.cursor()\ncur.execute("SELECT Name FROM STUDENT WHERE Marks > 80")\nfor r in cur.fetchall():\n    print(r[0])\ncon.close()`,
    "A valid solution must: import mysql.connector, connect(), create a cursor, execute a SELECT with Marks > 80, fetch the rows, print the names, and close the connection.", "connect, cursor, execute, fetch.",
    { all: ["import mysql\\.connector|from mysql\\.connector", "\\.connect\\(", "\\.cursor\\(", "\\.execute\\(", "select", "fetch(all|one|many)\\(|for \\w+ in \\w+"] }, { ...T }),
  p("P6", "Python–SQL", "debug", 3, "The program should display the record of the roll number entered, but the query always searches for the text 'r'. Correct the query line.",
    `r = int(input("Roll: "))\ncur.execute("SELECT * FROM STUDENT WHERE RollNo = r")\nprint(cur.fetchone())`,
    'cur.execute("SELECT * FROM STUDENT WHERE RollNo = {}".format(r))', "The SQL string must contain the value of r. Use format(), an f-string, % formatting or a parameterised query with %s.", "r is inside the quotes, so Python never substitutes it.",
    { any: ["format\\(", "%\\s*r|%\\s*\\(", "%s", "\\{r\\}", "\\+\\s*str\\(r\\)"] }),
  p("P7", "Python–SQL", "write", 3, "Write a program that accepts a roll number and a new mark, and updates the Marks of that student in table STUDENT (database school, user root, password 1234, host localhost).", undefined,
    `import mysql.connector as sql\ncon = sql.connect(host="localhost", user="root", passwd="1234", database="school")\ncur = con.cursor()\nr = int(input("Roll: "))\nm = int(input("New marks: "))\ncur.execute("UPDATE STUDENT SET Marks = {} WHERE RollNo = {}".format(m, r))\ncon.commit()\ncon.close()`,
    "A valid solution must connect, create a cursor, read both inputs, run an UPDATE using those values, and call commit().", "Do not forget the step that saves changes.",
    { all: ["\\.connect\\(", "\\.cursor\\(", "input\\(", "update", "\\.commit\\(\\)"] }, { ...T }),
  p("P8", "Python–SQL", "predict", 3, "Predict the output.", `cur.execute("SELECT Name FROM STUDENT WHERE Class='XII' ORDER BY Marks")\nd = cur.fetchmany(2)\nprint(d)`,
    "[('Ravi',), ('Divya',)]", "XII marks ascending: Ravi 72, Divya 80, Asha 85, Meena 91. fetchmany(2) returns the first two rows as a list of tuples.", "Ascending order is the default.",
    { accepted: ["[('Ravi',), ('Divya',)]"], output: true }, { ...T }),
];

export const TOPICS = [
  { id: "files" as Topic, icon: "📁", title: "Python Files", sub: "Binary Files · CSV Files", desc: "pickle, open modes, csv reader and writer, file pointers." },
  { id: "sql" as Topic, icon: "🗄️", title: "MySQL Table Questions", sub: "Queries on sample tables", desc: "SELECT, WHERE, GROUP BY, HAVING, UPDATE, aggregates." },
  { id: "pysql" as Topic, icon: "🔌", title: "Python–SQL Interface", sub: "mysql.connector", desc: "connect, cursor, execute, fetch, commit." },
];

export const MODE_LABEL: Record<Mode, string> = {
  complete: "Complete the code", predict: "Predict the output", write: "Write a program",
  debug: "Debug the code", type: "Type the SQL command", mcq: "Multiple choice",
};
