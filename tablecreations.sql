-- TODO: Needs revision against our schema,
-- because the relation schema posted is not entirely correct! 
EXEC xp_ReadErrorLog 0, 1, N'Server is listening on', N'any', NULL, NULL, 'DESC'

-- Creating the database
CREATE DATABASE PostGradSystem;
USE PostGradSystem;

-- Entities:
CREATE TABLE PostGradUser
(
    id INT PRIMARY KEY IDENTITY,
    email VARCHAR(255),
    password VARCHAR (255)
)


CREATE TABLE Admin
(
    id INT PRIMARY KEY,

    FOREIGN KEY(id) REFERENCES PostGradUser(id) ON DELETE CASCADE ON UPDATE CASCADE
)


CREATE TABLE GUCianStudent
(
    id INT PRIMARY KEY,
    firstName VARCHAR(20),
    lastName VARCHAR(20),
    type VARCHAR(10),
    faculty VARCHAR(10),
    address VARCHAR(50),
    GPA DECIMAL,
    underGradID INT,

    FOREIGN KEY (id) REFERENCES PostGradUser(id) ON DELETE CASCADE ON UPDATE CASCADE
)


CREATE TABLE NonGUCianStudent
(
    id INT PRIMARY KEY,
    firstName VARCHAR(20),
    lastName VARCHAR(20),
    type VARCHAR(10),
    faculty VARCHAR(10),
    address VARCHAR(50),
    GPA DECIMAL,

    FOREIGN KEY (id) REFERENCES PostGradUser(id) ON DELETE CASCADE ON UPDATE CASCADE
)


CREATE TABLE Supervisor
(
    id INT PRIMARY KEY,
    firstName VARCHAR(20),
    lastName VARCHAR(20),
    faculty VARCHAR(20),

    FOREIGN KEY(id) REFERENCES PostGradUser(id) ON DELETE CASCADE ON UPDATE CASCADE
)


CREATE TABLE Course
(
    id INT PRIMARY KEY IDENTITY,
    fees INT,
    creditHours INT,
    code VARCHAR(10),
)


CREATE TABLE Payment
(
    id INT PRIMARY KEY IDENTITY,
    amount INT,
    installmentsCnt INT,
    fundPercentage DECIMAL,
)


CREATE TABLE Installment
(
    date DATETIME,
    paymentID INT,
    amount INT,
    isPaid BIT,

    PRIMARY KEY (paymentID, date),

    FOREIGN KEY (paymentID) REFERENCES Payment(id) ON DELETE CASCADE ON UPDATE CASCADE
)


CREATE TABLE Thesis
(
    serialNumber INT PRIMARY KEY IDENTITY,
    type VARCHAR(50),
    field VARCHAR(50),
    title VARCHAR(50),
    startDate DATETIME,
    endDate DATETIME,
    defenseDate DATETIME,
    years           AS DATEDIFF(YEAR, startDate, endDate),
    grade DECIMAL,
    payment_id INT,
    noExtension INT,

    FOREIGN KEY (payment_id) REFERENCES Payment(id) ON DELETE CASCADE ON UPDATE CASCADE
)


CREATE TABLE Publication
(
    id INT PRIMARY KEY IDENTITY,
    title VARCHAR(50),
    date DATETIME,
    place VARCHAR(50),
    isAccepted BIT,
    host VARCHAR(50),
)


CREATE TABLE GUCianProgressReport
(
    student_id INT,
    progressReportNumber INT IDENTITY,
    date DATETIME,
    description VARCHAR(200),
    evaluation INT,
    state INT,
    thesisSerialNumber INT,
    supervisor_id INT,

    PRIMARY KEY (student_id, progressReportNumber),

    FOREIGN KEY (student_id) REFERENCES GUCianStudent(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (thesisSerialNumber) REFERENCES Thesis(serialNumber) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (supervisor_id) REFERENCES Supervisor(id)
)


CREATE TABLE NonGUCianProgressReport
(
    student_id INT,
    progressReportNumber INT IDENTITY,
    date DATETIME,
    description VARCHAR(200),
    evaluation INT,
    state INT,
    thesisSerialNumber INT,
    supervisor_id INT,

    PRimary KEY (student_id, progressReportNumber),

    FOREIGN KEY (student_id) REFERENCES NonGUCianStudent(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (thesisSerialNumber) REFERENCES Thesis(serialNumber) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (supervisor_id) REFERENCES Supervisor(id)
)


CREATE TABLE Examiner
(
    id INT PRIMARY KEY,
    name VARCHAR(60),
    fieldOfWork VARCHAR(50),
    isNational BIT,

    FOREIGN KEY (id) REFERENCES PostGradUser(id) ON DELETE CASCADE ON UPDATE CASCADE
)


CREATE TABLE Defense
(
    thesisSerialNumber INT,
    date DATETIME,
    location VARCHAR(50),
    grade DECIMAL,

    PRIMARY KEY (thesisSerialNumber, date),

    FOREIGN KEY (thesisSerialNumber) REFERENCES Thesis(serialNumber) ON DELETE CASCADE ON UPDATE CASCADE
)
--------------------- END OF ENTITIES ---------------------


-- Relations:
CREATE TABLE GUCStudentPhoneNumber
(
    GUCianID INT,
    phoneNumber VARCHAR(20),

    PRIMARY KEY (GUCianID, phoneNumber),

    FOREIGN KEY (GUCianID) REFERENCES GUCianStudent(id) ON DELETE CASCADE ON UPDATE CASCADE
)


CREATE TABLE NonGUCianPhoneNumber
(
    NonGUCianID INT,
    phoneNumber VARCHAR(20),

    PRIMARY KEY (NonGUCianID, phoneNumber),

    FOREIGN KEY (NonGUCianID) REFERENCES NonGUCianStudent(id) ON DELETE CASCADE ON UPDATE CASCADE
)


CREATE TABLE NonGUCianPayCourse
(
    NonGUCianID INT,
    payment_id INT,
    course_id INT,

    PRIMARY KEY (NonGUCianID, course_id, payment_id),

    FOREIGN KEY (NonGUCianID) REFERENCES NonGUCianStudent(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Course(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (payment_id) REFERENCES Payment(id) ON DELETE CASCADE ON UPDATE CASCADE
)


CREATE TABLE NonGUCianTakeCourse
(
    NonGUCianID INT,
    course_id INT,
    grade DECIMAL,

    PRIMARY KEY (NonGUCianID, course_id),

    FOREIGN KEY (NonGUCianID) REFERENCES NonGUCianStudent(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Course(id) ON DELETE CASCADE
)


CREATE TABLE NonGUCianRegisterThesis
(
    NonGUCianID INT,
    supervisor_id INT,
    thesisSerialNumber INT,

    PRIMARY KEY (NonGUCianID, thesisSerialNumber,supervisor_id),

    FOREIGN KEY (NonGUCianID) REFERENCES NonGUCianStudent(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (thesisSerialNumber) REFERENCES Thesis(serialNumber) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (supervisor_id) REFERENCES Supervisor(id)
)


CREATE TABLE GUCianRegisterThesis
(
    GUCianID INT,
    supervisor_id INT,
    thesisSerialNumber INT,

    PRIMARY KEY (GUCianID, thesisSerialNumber, supervisor_id),

    FOREIGN KEY (GUCianID) REFERENCES GUCianStudent(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (supervisor_id) REFERENCES Supervisor(id),
    FOREIGN KEY (thesisSerialNumber) REFERENCES Thesis(serialNumber) ON DELETE CASCADE ON UPDATE CASCADE
)


CREATE TABLE Thesis_Publication
(
    thesisSerialNumber INT,
    publication_id INT,

    PRIMARY KEY (thesisSerialNumber, publication_id),

    FOREIGN KEY (thesisSerialNumber) REFERENCES Thesis(serialNumber) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (publication_id) REFERENCES Publication(id) ON DELETE CASCADE ON UPDATE CASCADE
)


CREATE TABLE ExaminerEvaluateDefense
(
    date DATETIME,
    thesisSerialNumber INT,
    examiner_id INT,
    comment VARCHAR(255),

    PRIMARY KEY (date, thesisSerialNumber, examiner_id),

    FOREIGN KEY (examiner_id) REFERENCES Examiner(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (thesisSerialNumber, date) REFERENCES Defense(thesisSerialNumber,date) ON DELETE CASCADE ON UPDATE CASCADE
)
CREATE TABLE GucianStudent_Publications
(
    student_id INT,
    publication_id INT,

    PRIMARY KEY (student_id, publication_id),
    FOREIGN KEY (student_id) REFERENCES GUCianStudent(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (publication_id) REFERENCES Publication(id) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE NonGucianStudent_Publications
(
    student_id INT,
    publication_id INT,

    PRIMARY KEY (student_id, publication_id),
    FOREIGN KEY (student_id) REFERENCES NonGUCianStudent(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (publication_id) REFERENCES Publication(id) ON DELETE CASCADE ON UPDATE CASCADE
)
--------------------- END OF RELATIONS ---------------------


select * from Publication;