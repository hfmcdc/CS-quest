import type { Topic } from "./types";

export type CardKind = "theory" | "commands";

export interface Flashcard {
  id: string;
  topic: Topic;
  kind: CardKind;
  tag: string;
  front: string; // question / task
  back: string; // answer / command
}

const mk =
  (topic: Topic, kind: CardKind, prefix: string) =>
  (n: number, tag: string, front: string, back: string): Flashcard => ({ id: `${prefix}${n}`, topic, kind, tag, front, back });

const ft = mk("files", "theory", "FT");
const fc = mk("files", "commands", "FC");
const st = mk("sql", "theory", "ST");
const sc = mk("sql", "commands", "SC");
const pt = mk("pysql", "theory", "PT");
const pc = mk("pysql", "commands", "PC");

export const FLASHCARDS: Flashcard[] = [
  // ---------- Python Files: THEORY ----------
  ft(1, "Binary Files", "What is a binary file?", "A file that stores data as raw bytes (not human-readable text). There is no EOL translation, so it is faster and can hold any Python object once pickled. Opened with modes ending in 'b' (rb, wb, ab, rb+, wb+)."),
  ft(2, "Binary Files", "Text file vs binary file?", "Text file: characters, human-readable, lines end with EOL (\\n), translation happens (e.g. \\r\\n on Windows).\nBinary file: bytes, not readable in an editor, no EOL translation, used for objects, images, audio."),
  ft(3, "Binary Files", "What is pickling and unpickling?", "Pickling (serialization) = converting a Python object into a byte stream so it can be stored in a binary file.\nUnpickling (deserialization) = converting the byte stream back into the Python object."),
  ft(4, "Binary Files", "Why must a file be opened in binary mode for pickle?", "pickle.dump() writes bytes and pickle.load() reads bytes. A text mode such as \"w\" or \"r\" raises an error, so use \"wb\" / \"rb\"."),
  ft(5, "Binary Files", "What happens when pickle.load() reaches the end of the file?", "It raises EOFError. That is why reading all records uses try / except EOFError inside a while True loop."),
  ft(6, "Binary Files", "What do tell() and seek() do?", "tell() returns the current position of the file pointer (in bytes from the start).\nseek(offset, whence) moves the pointer. whence: 0 = from start (default), 1 = from current position, 2 = from end."),
  ft(7, "Binary Files", "Difference between modes \"w\" and \"a\" (and \"wb\" and \"ab\")?", "\"w\" / \"wb\": creates the file, or erases existing content (truncates) before writing.\n\"a\" / \"ab\": creates the file if missing and adds new data at the end, keeping old content."),
  ft(8, "Binary Files", "What does mode \"rb+\" mean? How is it different from \"wb+\"?", "\"rb+\": read and write in binary, file must exist, existing content is kept, pointer starts at the beginning.\n\"wb+\": read and write in binary, but the file is created or truncated (old data lost)."),
  ft(9, "Binary Files", "Why use the with statement to open files?", "It closes the file automatically when the block ends (even if an error occurs), so there is no need to call close()."),
  ft(10, "Binary Files", "How is a record updated in a binary file?", "Read each record, and when the key matches, change it. Then move the pointer back with seek() to the start of that record and dump() the updated record (file opened in \"rb+\"). Alternatively, write all records to a temporary file and rename it."),
  ft(11, "CSV Files", "What is a CSV file?", "Comma Separated Values file: a text file where each line is a row (record) and values in the row are separated by a delimiter (comma by default). Easy to exchange with spreadsheets and databases."),
  ft(12, "CSV Files", "What does csv.reader() return, and what type are its values?", "It returns an iterator over the rows. Each row is a list of strings, so numbers must be converted (e.g. int(row[1])) before comparing or calculating."),
  ft(13, "CSV Files", "Why is newline=\"\" used when opening a CSV file for writing?", "Without it, the csv module's own line ending plus the OS translation can add an extra blank line between rows (commonly on Windows). newline=\"\" prevents this."),
  ft(14, "CSV Files", "writerow() vs writerows()?", "writerow(list) writes ONE row (a single list).\nwriterows(list of lists) writes MANY rows at once."),
  ft(15, "CSV Files", "Does csv.reader skip the header row?", "No. The header is just another row. Use next(reader) to skip it."),
  ft(16, "CSV Files", "What is a delimiter? Can it be something other than a comma?", "A delimiter is the character separating the fields. The default is a comma, but others (; or | or tab) can be set with the delimiter parameter: csv.reader(f, delimiter=\";\")."),
  ft(17, "CSV Files", "Why is a CSV file called a text file, not a binary file?", "Its content is plain readable characters, so it can be opened in any text editor and in text mode (\"r\", \"w\", \"a\"), unlike pickle data."),

  // ---------- MySQL: THEORY ----------
  st(1, "Basics", "What are DDL and DML commands?", "DDL (Data Definition Language) defines structure: CREATE, ALTER, DROP.\nDML (Data Manipulation Language) works on the data: INSERT, UPDATE, DELETE (and SELECT for retrieval)."),
  st(2, "Keys", "What is a primary key?", "A column (or set of columns) that uniquely identifies every row. It cannot be NULL and cannot repeat. A table can have only ONE primary key."),
  st(3, "Keys", "Candidate key, alternate key, foreign key?", "Candidate key: any column that could serve as the primary key.\nAlternate key: candidate keys not chosen as the primary key.\nForeign key: a column that refers to the primary key of another table, linking the two tables."),
  st(4, "Basics", "What are degree and cardinality of a table?", "Degree = number of columns (attributes).\nCardinality = number of rows (tuples)."),
  st(5, "Clauses", "WHERE vs HAVING?", "WHERE filters individual ROWS before grouping and cannot use aggregate functions.\nHAVING filters GROUPS after GROUP BY and can use aggregates like COUNT(*) or AVG(Marks)."),
  st(6, "Clauses", "What is the order of clauses in a SELECT query?", "SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY."),
  st(7, "Functions", "Name the aggregate functions in MySQL.", "MAX(), MIN(), AVG(), SUM(), COUNT(). They work on a column of values and return one value (per group when GROUP BY is used)."),
  st(8, "Functions", "COUNT(*) vs COUNT(column)?", "COUNT(*) counts all rows, including rows with NULLs.\nCOUNT(column) counts only the rows where that column is NOT NULL."),
  st(9, "NULL", "How do you compare with NULL?", "NULL means missing / unknown, so = NULL never works. Use IS NULL or IS NOT NULL."),
  st(10, "Operators", "What are the wildcards used with LIKE?", "% matches any number of characters (including none).\n_ matches exactly one character.\n'A%' = starts with A, '%a' = ends with a, '_a%' = second letter is a."),
  st(11, "Clauses", "What does DISTINCT do?", "It removes duplicate values from the result, so each value appears only once."),
  st(12, "Clauses", "What is the default order of ORDER BY?", "Ascending (ASC). Use DESC for descending order."),
  st(13, "Clauses", "What does GROUP BY do?", "It puts rows with the same value in a column into one group, so aggregate functions can be applied to each group."),
  st(14, "Commands", "DELETE vs DROP vs TRUNCATE?", "DELETE: removes selected rows (WHERE can be used), table structure stays.\nTRUNCATE: removes all rows quickly, structure stays.\nDROP: removes the entire table (structure and data)."),
  st(15, "Commands", "ALTER vs UPDATE?", "ALTER changes the STRUCTURE of a table (add / drop / modify columns). UPDATE changes the DATA in existing rows."),
  st(16, "Operators", "BETWEEN: are the end values included?", "Yes. BETWEEN 70 AND 85 includes both 70 and 85."),
  st(17, "Basics", "What is a relational database (RDBMS)?", "A database that stores data in tables (relations) made of rows and columns, with tables linked through keys. MySQL is an example."),

  // ---------- Python-SQL Interface: THEORY ----------
  pt(1, "Connectivity", "What is mysql.connector?", "A Python library (connector) that lets a Python program connect to a MySQL database and run SQL queries."),
  pt(2, "Connectivity", "What are the steps to connect Python with MySQL?", "1. import mysql.connector\n2. connect() to create a connection\n3. cursor() to create a cursor\n4. execute() the SQL query\n5. fetch results (SELECT) or commit() (INSERT / UPDATE / DELETE)\n6. close() the connection"),
  pt(3, "Cursor", "What is a cursor?", "An object created from the connection that sends SQL statements to the database and holds the result rows so they can be fetched one by one or all together."),
  pt(4, "Cursor", "fetchone() vs fetchmany(n) vs fetchall()?", "fetchone(): the next single row (a tuple), or None if no more rows.\nfetchmany(n): the next n rows as a list of tuples.\nfetchall(): all remaining rows as a list of tuples."),
  pt(5, "Connectivity", "Why is commit() needed?", "Changes made by INSERT, UPDATE and DELETE are not saved permanently until con.commit() is called. SELECT does not need it."),
  pt(6, "Cursor", "What is cursor.rowcount?", "The number of rows affected by (or returned from) the last execute() call."),
  pt(7, "Safety", "Why use parameterized queries (%s placeholders)?", "Values are passed separately, so the connector handles quoting and special characters. This avoids syntax errors and prevents SQL injection."),
  pt(8, "Connectivity", "What does fetchall() return when no row matches?", "An empty list []. fetchone() returns None in that case."),
  pt(9, "Connectivity", "What parameters does connect() take?", "host, user, passwd (or password) and database (optional at connection time), e.g. host=\"localhost\", user=\"root\", passwd=\"...\", database=\"school\"."),
  pt(10, "Connectivity", "Why should the connection be closed?", "To release the database connection and resources. Call con.close() when the work is finished."),
  pt(11, "Safety", "What is SQL injection?", "An attack where malicious SQL is entered as input and gets built into a query string (e.g. with + or format()). It is prevented by using %s placeholders instead of string joining."),

  // ---------- Python Files: COMMANDS ----------
  fc(1, "Binary Files", "Import the module needed for binary files.", "import pickle"),
  fc(2, "Binary Files", "Open stud.dat to write binary data (erase old content).", "f = open(\"stud.dat\", \"wb\")"),
  fc(3, "Binary Files", "Open stud.dat to read binary data.", "f = open(\"stud.dat\", \"rb\")"),
  fc(4, "Binary Files", "Open stud.dat to add records at the end.", "f = open(\"stud.dat\", \"ab\")"),
  fc(5, "Binary Files", "Open stud.dat to read AND update without erasing it.", "f = open(\"stud.dat\", \"rb+\")"),
  fc(6, "Binary Files", "Store the object rec in the binary file f.", "pickle.dump(rec, f)"),
  fc(7, "Binary Files", "Read the next object from binary file f.", "rec = pickle.load(f)"),
  fc(8, "Binary Files", "Read all records of a binary file until the end.", "try:\n    while True:\n        rec = pickle.load(f)\n        print(rec)\nexcept EOFError:\n    pass"),
  fc(9, "Binary Files", "Open a binary file safely so it closes automatically.", "with open(\"stud.dat\", \"rb\") as f:\n    rec = pickle.load(f)"),
  fc(10, "Binary Files", "Find the current file pointer position.", "f.tell()"),
  fc(11, "Binary Files", "Move the file pointer to the beginning.", "f.seek(0)"),
  fc(12, "Binary Files", "Move the file pointer to the end of the file.", "f.seek(0, 2)"),
  fc(13, "Binary Files", "Move the file pointer back to the start of the previous record (position saved in pos).", "f.seek(pos)"),
  fc(14, "CSV Files", "Import the module needed for CSV files.", "import csv"),
  fc(15, "CSV Files", "Open o.csv for writing without blank lines between rows.", "f = open(\"o.csv\", \"w\", newline=\"\")"),
  fc(16, "CSV Files", "Create a reader object for the open file f.", "r = csv.reader(f)"),
  fc(17, "CSV Files", "Create a writer object for the open file f.", "w = csv.writer(f)"),
  fc(18, "CSV Files", "Write one row to a CSV file.", "w.writerow([1, \"Asha\", 85])"),
  fc(19, "CSV Files", "Write many rows at once to a CSV file.", "w.writerows([[1, \"Asha\"], [2, \"Ravi\"]])"),
  fc(20, "CSV Files", "Skip the header row while reading a CSV file.", "next(r)"),
  fc(21, "CSV Files", "Display every row of marks.csv.", "import csv\nwith open(\"marks.csv\") as f:\n    for row in csv.reader(f):\n        print(row)"),
  fc(22, "CSV Files", "Read a CSV file that uses ; as separator.", "r = csv.reader(f, delimiter=\";\")"),

  // ---------- MySQL: COMMANDS ----------
  sc(1, "Database", "Create a database named school and start using it.", "CREATE DATABASE school;\nUSE school;"),
  sc(2, "Database", "Show all tables of the database / the structure of STUDENT.", "SHOW TABLES;\nDESC STUDENT;"),
  sc(3, "DDL", "Create the table STUDENT with RollNo as primary key.", "CREATE TABLE STUDENT (\n    RollNo INT PRIMARY KEY,\n    Name VARCHAR(20),\n    Class VARCHAR(5),\n    Marks INT\n);"),
  sc(4, "DML", "Insert a new row into STUDENT.", "INSERT INTO STUDENT\nVALUES (6, 'Anu', 'XII', 78);"),
  sc(5, "DQL", "Display all rows and columns of STUDENT.", "SELECT * FROM STUDENT;"),
  sc(6, "DQL", "Display names of students of class XII with marks above 80.", "SELECT Name FROM STUDENT\nWHERE Class = 'XII' AND Marks > 80;"),
  sc(7, "DQL", "Display each class only once.", "SELECT DISTINCT Class FROM STUDENT;"),
  sc(8, "DQL", "Display students in descending order of Marks.", "SELECT * FROM STUDENT\nORDER BY Marks DESC;"),
  sc(9, "DQL", "Display names starting with the letter A.", "SELECT Name FROM STUDENT\nWHERE Name LIKE 'A%';"),
  sc(10, "DQL", "Display students with marks from 70 to 85.", "SELECT * FROM STUDENT\nWHERE Marks BETWEEN 70 AND 85;"),
  sc(11, "DQL", "Display students of class XI or XII using IN.", "SELECT * FROM STUDENT\nWHERE Class IN ('XI', 'XII');"),
  sc(12, "DQL", "Display students whose Marks is not filled in.", "SELECT * FROM STUDENT\nWHERE Marks IS NULL;"),
  sc(13, "Aggregate", "Find the highest, lowest and average Marks.", "SELECT MAX(Marks), MIN(Marks), AVG(Marks)\nFROM STUDENT;"),
  sc(14, "Aggregate", "Count the number of students in each class.", "SELECT Class, COUNT(*)\nFROM STUDENT\nGROUP BY Class;"),
  sc(15, "Aggregate", "Show only classes having more than 2 students.", "SELECT Class, COUNT(*)\nFROM STUDENT\nGROUP BY Class\nHAVING COUNT(*) > 2;"),
  sc(16, "DML", "Increase the Marks of RollNo 4 by 5.", "UPDATE STUDENT\nSET Marks = Marks + 5\nWHERE RollNo = 4;"),
  sc(17, "DML", "Delete the record of RollNo 5.", "DELETE FROM STUDENT\nWHERE RollNo = 5;"),
  sc(18, "DDL", "Add a column City to STUDENT.", "ALTER TABLE STUDENT\nADD City VARCHAR(20);"),
  sc(19, "DDL", "Remove the column City from STUDENT.", "ALTER TABLE STUDENT\nDROP COLUMN City;"),
  sc(20, "DDL", "Change the datatype / size of the column Name.", "ALTER TABLE STUDENT\nMODIFY Name VARCHAR(30);"),
  sc(21, "DDL", "Add a primary key to an existing table.", "ALTER TABLE STUDENT\nADD PRIMARY KEY (RollNo);"),
  sc(22, "DDL", "Delete the table STUDENT completely.", "DROP TABLE STUDENT;"),

  // ---- UPDATE ----
  sc(23, "UPDATE", "Change both Class and Marks of RollNo 4 in one command.", "UPDATE STUDENT\nSET Class = 'XII', Marks = 70\nWHERE RollNo = 4;"),
  sc(24, "UPDATE", "Give 5 extra marks to ALL students.", "UPDATE STUDENT\nSET Marks = Marks + 5;\n-- no WHERE, so every row changes"),
  sc(25, "UPDATE", "Set Marks to 0 wherever it is NULL.", "UPDATE STUDENT\nSET Marks = 0\nWHERE Marks IS NULL;"),
  sc(26, "UPDATE", "Change the class to XII for students with RollNo 2, 4 or 5.", "UPDATE STUDENT\nSET Class = 'XII'\nWHERE RollNo IN (2, 4, 5);"),
  sc(27, "UPDATE", "Increase Marks by 10% for students having Marks below 50.", "UPDATE STUDENT\nSET Marks = Marks * 1.10\nWHERE Marks < 50;"),

  // ---- ALTER TABLE ----
  sc(28, "ALTER", "Add a column Phone with NOT NULL constraint.", "ALTER TABLE STUDENT\nADD Phone CHAR(10) NOT NULL;"),
  sc(29, "ALTER", "Add a column City with a default value.", "ALTER TABLE STUDENT\nADD City VARCHAR(20) DEFAULT 'Kochi';"),
  sc(30, "ALTER", "Add a column City right after the column Name.", "ALTER TABLE STUDENT\nADD City VARCHAR(20) AFTER Name;"),
  sc(31, "ALTER", "Add a column Grade as the FIRST column of the table.", "ALTER TABLE STUDENT\nADD Grade CHAR(1) FIRST;"),
  sc(32, "ALTER", "Change the datatype of Marks to DECIMAL(5,2).", "ALTER TABLE STUDENT\nMODIFY Marks DECIMAL(5, 2);"),
  sc(33, "ALTER", "Make the column Name NOT NULL using MODIFY.", "ALTER TABLE STUDENT\nMODIFY Name VARCHAR(20) NOT NULL;"),
  sc(34, "ALTER", "Rename the column Name to StudentName (CHANGE).", "ALTER TABLE STUDENT\nCHANGE Name StudentName VARCHAR(30);\n-- CHANGE old_name new_name datatype"),
  sc(35, "ALTER", "Rename the table STUDENT to PUPIL.", "ALTER TABLE STUDENT\nRENAME TO PUPIL;\n-- or: RENAME TABLE STUDENT TO PUPIL;"),
  sc(36, "ALTER", "Remove the primary key of STUDENT.", "ALTER TABLE STUDENT\nDROP PRIMARY KEY;"),
  sc(37, "ALTER", "Add a foreign key RollNo in FEES that refers to STUDENT.", "ALTER TABLE FEES\nADD FOREIGN KEY (RollNo)\nREFERENCES STUDENT (RollNo);"),
  sc(38, "ALTER", "Set a default value of 0 for the column Marks.", "ALTER TABLE STUDENT\nALTER Marks SET DEFAULT 0;"),
  sc(39, "ALTER", "Add a UNIQUE constraint on the column Phone.", "ALTER TABLE STUDENT\nADD UNIQUE (Phone);"),
  sc(40, "ALTER", "Add two columns in a single ALTER command.", "ALTER TABLE STUDENT\nADD City VARCHAR(20),\nADD Phone CHAR(10);"),

  // ---- CREATE / INSERT / DELETE ----
  sc(41, "CREATE", "Create a table using NOT NULL, UNIQUE, DEFAULT and CHECK constraints.", "CREATE TABLE EMP (\n    EmpId INT PRIMARY KEY,\n    Name VARCHAR(20) NOT NULL,\n    Email VARCHAR(30) UNIQUE,\n    Salary INT DEFAULT 20000,\n    Age INT CHECK (Age >= 18)\n);"),
  sc(42, "CREATE", "Create the table FEES where RollNo is a foreign key of STUDENT.", "CREATE TABLE FEES (\n    RollNo INT,\n    Fee INT,\n    FOREIGN KEY (RollNo)\n        REFERENCES STUDENT (RollNo)\n);"),
  sc(43, "INSERT", "Insert a row giving values only for RollNo, Name and Class.", "INSERT INTO STUDENT (RollNo, Name, Class)\nVALUES (7, 'Neha', 'XII');"),
  sc(44, "INSERT", "Insert two rows in one command.", "INSERT INTO STUDENT VALUES\n(8, 'Joel', 'XII', 74),\n(9, 'Sana', 'XI', 68);"),
  sc(45, "DELETE", "Delete all students who scored below 40.", "DELETE FROM STUDENT\nWHERE Marks < 40;"),
  sc(46, "DELETE", "Delete ALL rows but keep the table.", "DELETE FROM STUDENT;\n-- or: TRUNCATE TABLE STUDENT;"),
  sc(47, "DROP", "Delete the whole database named school.", "DROP DATABASE school;"),
  sc(48, "Database", "Show all databases / the CREATE statement of a table.", "SHOW DATABASES;\nSHOW CREATE TABLE STUDENT;"),

  // ---- SELECT variations ----
  sc(49, "SELECT", "Display Name and Marks with a heading (alias) 'Score'.", "SELECT Name, Marks AS Score\nFROM STUDENT;"),
  sc(50, "SELECT", "Display Name and Marks increased by 5 as NewMarks.", "SELECT Name, Marks + 5 AS NewMarks\nFROM STUDENT;"),
  sc(51, "SELECT", "Display names whose second letter is 'a'.", "SELECT Name FROM STUDENT\nWHERE Name LIKE '_a%';"),
  sc(52, "SELECT", "Display names that do NOT end with 'a'.", "SELECT Name FROM STUDENT\nWHERE Name NOT LIKE '%a';"),
  sc(53, "SELECT", "Display students not in class XI or XII.", "SELECT * FROM STUDENT\nWHERE Class NOT IN ('XI', 'XII');"),
  sc(54, "SELECT", "Display class XII students with Marks above 80 OR class XI students with Marks above 60.", "SELECT * FROM STUDENT\nWHERE (Class = 'XII' AND Marks > 80)\n   OR (Class = 'XI' AND Marks > 60);"),
  sc(55, "SELECT", "Sort by Class ascending, then by Marks descending.", "SELECT * FROM STUDENT\nORDER BY Class ASC, Marks DESC;"),
  sc(56, "SELECT", "Display only the top 3 students by Marks.", "SELECT * FROM STUDENT\nORDER BY Marks DESC\nLIMIT 3;"),
  sc(57, "SELECT", "Count how many different classes exist.", "SELECT COUNT(DISTINCT Class)\nFROM STUDENT;"),
  sc(58, "SELECT", "Find the total and average Marks of class XII only.", "SELECT SUM(Marks), AVG(Marks)\nFROM STUDENT\nWHERE Class = 'XII';"),
  sc(59, "GROUP BY", "Show the highest Marks of each class, highest class-wise first.", "SELECT Class, MAX(Marks)\nFROM STUDENT\nGROUP BY Class\nORDER BY MAX(Marks) DESC;"),
  sc(60, "GROUP BY", "Show the average Marks of each class, only for students above 60 marks and only classes with average above 75.", "SELECT Class, AVG(Marks)\nFROM STUDENT\nWHERE Marks > 60\nGROUP BY Class\nHAVING AVG(Marks) > 75;"),

  // ---- JOINS (tables STUDENT and FEES(RollNo, Fee)) ----
  sc(61, "Join", "Cartesian product of STUDENT and FEES.", "SELECT * FROM STUDENT, FEES;\n-- every row of STUDENT paired with every row of FEES"),
  sc(62, "Join", "Equi-join of STUDENT and FEES on RollNo (WHERE style).", "SELECT * FROM STUDENT, FEES\nWHERE STUDENT.RollNo = FEES.RollNo;"),
  sc(63, "Join", "Join STUDENT and FEES on RollNo using JOIN ... ON.", "SELECT S.Name, F.Fee\nFROM STUDENT S JOIN FEES F\nON S.RollNo = F.RollNo;"),
  sc(64, "Join", "Natural join of STUDENT and FEES.", "SELECT * FROM STUDENT\nNATURAL JOIN FEES;\n-- joins on the common column (RollNo), which appears once"),

  // ---- FUNCTIONS ----
  sc(65, "String fn", "Show names in capital letters and their length.", "SELECT UPPER(Name), LENGTH(Name)\nFROM STUDENT;\n-- LOWER(Name) gives small letters"),
  sc(66, "String fn", "Show the first 2 letters and last 2 letters of Name.", "SELECT LEFT(Name, 2), RIGHT(Name, 2)\nFROM STUDENT;"),
  sc(67, "String fn", "Extract 3 characters of Name starting from position 2.", "SELECT MID(Name, 2, 3)\nFROM STUDENT;\n-- SUBSTR(Name, 2, 3) works the same"),
  sc(68, "String fn", "Find the position of 'a' in Name / remove spaces around text.", "SELECT INSTR(Name, 'a'), TRIM('  hi  ')\nFROM STUDENT;\n-- LTRIM() and RTRIM() trim one side only"),
  sc(69, "Math fn", "Round 45.678 to 1 decimal, find 2 to the power 3, and 17 mod 5.", "SELECT ROUND(45.678, 1), POWER(2, 3), MOD(17, 5);\n-- results: 45.7, 8, 2"),
  sc(70, "Date fn", "Show today's date, current date-time, and year, month and day name of a date.", "SELECT CURDATE(), NOW();\nSELECT YEAR('2026-10-28'), MONTH('2026-10-28'), DAYNAME('2026-10-28');"),

  // ---------- Python-SQL Interface: COMMANDS ----------
  pc(1, "Setup", "Import the MySQL connector.", "import mysql.connector"),
  pc(2, "Setup", "Connect to a MySQL database.", "con = mysql.connector.connect(\n    host=\"localhost\",\n    user=\"root\",\n    passwd=\"your_password\",\n    database=\"school\"\n)"),
  pc(3, "Setup", "Check whether the connection is successful.", "if con.is_connected():\n    print(\"Connected\")"),
  pc(4, "Setup", "Create a cursor object.", "cur = con.cursor()"),
  pc(5, "Execute", "Run a SELECT query using the cursor.", "cur.execute(\"SELECT * FROM STUDENT\")"),
  pc(6, "Fetch", "Get all rows of the result.", "rows = cur.fetchall()"),
  pc(7, "Fetch", "Get only the next row of the result.", "row = cur.fetchone()"),
  pc(8, "Fetch", "Get the next 3 rows of the result.", "rows = cur.fetchmany(3)"),
  pc(9, "Fetch", "Display every row from the result.", "cur.execute(\"SELECT * FROM STUDENT\")\nfor row in cur.fetchall():\n    print(row)"),
  pc(10, "Execute", "Insert a record using %s placeholders.", "q = \"INSERT INTO STUDENT VALUES (%s, %s, %s, %s)\"\ncur.execute(q, (6, \"Anu\", \"XII\", 78))\ncon.commit()"),
  pc(11, "Execute", "Update marks for a roll number taken from variables.", "q = \"UPDATE STUDENT SET Marks = %s WHERE RollNo = %s\"\ncur.execute(q, (90, 2))\ncon.commit()"),
  pc(12, "Execute", "Delete a record using format() (string formatting).", "q = \"DELETE FROM STUDENT WHERE RollNo = {}\".format(5)\ncur.execute(q)\ncon.commit()"),
  pc(13, "Save", "Save the changes made by INSERT / UPDATE / DELETE.", "con.commit()"),
  pc(14, "Cursor", "Find the number of rows affected or returned by the last query.", "cur.rowcount"),
  pc(15, "Setup", "Close the connection.", "con.close()"),
];

export const CARD_KINDS: { id: CardKind; label: string; icon: string; desc: string }[] = [
  { id: "theory", label: "Theory", icon: "📖", desc: "Definitions, differences and concepts" },
  { id: "commands", label: "Commands", icon: "⌨️", desc: "Syntax and code you must remember" },
];
