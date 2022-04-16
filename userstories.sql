USE Kaka;
------------------- (1) Unregistered User's Features -------------------
-- 1.a:  Register to the website.
GO
CREATE PROC StudentRegister
    @first_name VARCHAR(20),
    @lASt_name VARCHAR(20),
    @pASsword VARCHAR(20),
    @faculty VARCHAR(20),
    @Gucian BIT,
    @email VARCHAR(50),
    @address VARCHAR(20)
AS
BEGIN
    INSERT INTO PostGradUser
        (email, password)
    VALUES
        (@email, @pASsword);

    DECLARE @student_id INT = SCOPE_IDENTITY();

    IF @Gucian = 1
        BEGIN
        INSERT INTO GUCianStudent
            (id, firstName, lAStName, type, faculty, address)
        VALUES
            (@student_id, @first_name, @lASt_name, 'GUCian', @faculty, @address);
    END
    ELSE
        BEGIN
        INSERT INTO NonGUCianStudent
            (id, firstName, lAStName, type, faculty, address)
        VALUES
            (@student_id, @first_name, @lASt_name, 'Non GUCian', @faculty, @address);
    END
END

GO
CREATE PROC SupervisorRegister
    @firstName VARCHAR(20),
    @lastName VARCHAR(20),
    @pASsword VARCHAR(20),
    @faculty VARCHAR(20),
    @email VARCHAR(20)
AS
BEGIN
    INSERT INTO PostGradUser
        (email, pASsword)
    VALUES
        (@email, @pASsword);

    DECLARE @supervisor_id INT = SCOPE_IDENTITY();

    INSERT INTO Supervisor
        (id, firstName, lastName, faculty)
    VALUES
        (@supervisor_id, @firstName, @lastName, @faculty);
END

------------------- (2) Registered User's Features -------------------
-- 2.a: login using my username and pASsword.
drop proc userlogin
GO
CREATE PROC userLogin
    @ID INT,
    @pASsword VARCHAR(20),
    @Success BIT OUTPUT,
    @userType INT OUTPUT
AS
BEGIN
    IF EXISTS (
        SELECT *
    FROM PostGradUser
    WHERE id = @ID AND pASsword = @pASsword
    )
    BEGIN
        IF Exists(select *
        from GUCianStudent
        where id = @id)
        begin
            set @userType = 0;
        end
        Else if Exists(select *
        from NonGUCianStudent
        where id = @id)
        begin
            set @userType = 1;
        end
        Else if Exists(select *
        from Supervisor
        where id = @id)
        begin
            set @userType = 2;
        end
        Else if Exists(select *
        from Examiner
        where id = @id)
        begin
            set @userType = 3;
        end
        SET @Success = 1;
    END
    ELSE
        BEGIN
        SET @Success = 0;
    END
END

-- 2.b: add my mobile number(s).
GO
CREATE PROC addMobile
    @ID INT,
    @mobile_number VARCHAR(20)
AS
BEGIN
    IF EXISTS (
        SELECT *
    FROM GUCianStudent
    WHERE id = @ID
    )
        BEGIN
        INSERT INTO GUCStudentPhoneNumber
            (GUCianID, phoneNumber)
        VALUES
            (@ID, @mobile_number);
    END
    ELSE
        BEGIN
        INSERT INTO NonGUCianPhoneNumber
            (NonGUCianID, phoneNumber)
        VALUES
            (@ID, @mobile_number);
    END
END
------------------- (3) Admin's Features -------------------
-- 3.a: List all supervisors in the system.
GO
CREATE PROC AdminListSup
AS
SELECT *
FROM Supervisor
    INNER JOIN PostGradUser ON PostGradUser.id = Supervisor.id;

-- 3.b: view the profile of any supervisor that contains all his/her information.
GO
CREATE PROC AdminViewSupervisorProfile
    @supID INT
AS
SELECT *
FROM Supervisor
    INNER JOIN PostGradUser ON PostGradUser.id = Supervisor.id
WHERE Supervisor.id = @supID;

-- 3.c: List all Theses in the system.  
GO
CREATE PROC AdminViewAllTheses
AS
SELECT *
FROM Thesis;

-- 3.d: List the number of on going theses.
GO

CREATE PROC AdminViewOnGOingTheses
    @ThesisCount SMALLINT Output
AS
SELECT @ThesisCount = Count(*)
FROM Thesis T
Where T.endDate > GETDATE();




exec AdminViewStudentThesisBySupervisor
select * from GUCianRegisterThesis
select * from GUCianStudent
select * from thesis
select * from Supervisor
drop proc AdminViewStudentThesisBySupervisor
-- 3.e: List all supervisors’ names currently supervising students, theses title, student name.
GO
CREATE Proc AdminViewStudentThesisBySupervisor
As
Select s.firstname,s.lastname,t.title,gs.firstName
From Thesis t inner join GUCianRegisterThesis sr on t.serialNumber=sr.thesisSerialNumber
inner join Supervisor s on s.id=sr.supervisor_id inner join GucianStudent gs on sr.GUCianID=gs.id
where t.endDate > Convert(Date,CURRENT_TIMESTAMP)
union
Select s.firstname,s.lastname,t.title,gs.firstName
From Thesis t inner join NonGUCianRegisterThesis sr on t.serialNumber=sr.thesisSerialNumber
inner join Supervisor s on s.id=sr.supervisor_id inner join NonGucianStudent gs on sr.nongucianID=gs.id
where t.endDate > Convert(Date,CURRENT_TIMESTAMP)
        
-- 3.f: List nonGucians names, course code, and respective grade.
GO
CREATE PROC AdminListNonGucianCourse
    @courseID Int
AS
SELECT NG.firstName , NG.lAStName, C.code, NonGUCianTakeCourse.grade
FROM NonGUCianTakeCourse
    INNER JOIN NonGUCianStudent NG ON NG.id = NonGUCianTakeCourse.NonGUCianID
    INNER JOIN Course C ON C.id = NonGUCianTakeCourse.course_id
Where NonGUCianTakeCourse.course_id = @courseID;


-- 3.g: Update the number of thesis extension by 1.
GO
CREATE PROC AdminUpdateExtension
    @ThesisSerial INT
AS
UPDATE Thesis 
    SET Thesis.noExtension = Thesis.noExtension + 1
    WHERE Thesis.serialNumber = @ThesisSerial

-- 3.h: Issue a thesis payment.
GO
CREATE PROC AdminIssueThesisPayment
    @ThesisSerial INT,
    @amount DECIMAL,
    @noOfInstallments INT,
    @fundPrecentage Decimal ,
    @success bit OUTPUT
AS
BEGIN
    IF EXISTS ( 
        SELECT *
    FROM Thesis
    WHERE Thesis.serialNumber = @ThesisSerial
    )
        BEGIN
        SET @success = 1;

        INSERT INTO Payment
            (amount, installmentsCnt, fundPercentage)
        VALUES
            (@amount, @noOfInstallments, @fundPrecentage)

        DECLARE @payment_id INT = SCOPE_IDENTITY();

        UPDATE Thesis
            SET Thesis.payment_id = @payment_id
            WHERE Thesis.serialNumber = @ThesisSerial

    END
    ELSE
        BEGIN
        SET @success = 0;
    END
END

-- 3.i: view the profile of any student that contains all his/her information.
GO
CREATE PROC AdminViewStudentProfile
    @sid INT
AS
BEGIN
    IF EXISTS (
        SELECT *
    FROM GUCianStudent
    WHERE GUCianStudent.id = @sid
    )
    BEGIN
        SELECT *
        FROM GUCianStudent INNER JOIN PostGradUser ON PostGradUser.id = GUCianStudent.id
            INNER JOIN GUCStudentPhoneNumber GP ON GP.GUCianID = GUCianStudent.id
        WHERE GUCianStudent.id = @sid
    END
    ELSE 
        BEGIN
        SELECT *
        FROM NonGUCianStudent INNER JOIN PostGradUser ON PostGradUser.id = NonGUCianStudent.id
            INNER JOIN NonGUCianPhoneNumber GP ON GP.NonGUCianID = NonGUCianStudent.id
        WHERE NonGUCianStudent.id = @sid;
    END
END

-- 3.j: Issue installments as per the number of installments for a certain payment every six months starting from the entered date.
GO
CREATE PROC AdminIssueInstallPayment
    @paymentID INT,
    @installStartDate DATE
AS
DECLARE @numberOfInstallments INT
SELECT @numberOfInstallments = Payment.installmentsCnt
FROM Payment
WHERE Payment.id = @paymentID

DECLARE @totalPaymentAmount INT
SELECT @totalPaymentAmount = Payment.amount
FROM Payment
WHERE Payment.id = @paymentID

DECLARE @dateAdded DATE
SET @dateAdded = @installStartDate

DECLARE @amountOfInstallment INT
SET @amountOfInstallment = @totalPaymentAmount/@numberOfInstallments

WHILE(@numberOfInstallments > 0)
    BEGIN
    INSERT INTO Installment
        (date, paymentID, amount, isPaid)
    VALUES
        (@dateAdded, @paymentID, @amountOfInstallment, 0)
    SET @dateAdded = DATEADD(month, 6, @dateAdded);
    SET @numberOfInstallments = @numberOfInstallments - 1
END



-- 3.k: Issue installments as per the number of installments for a certain payment every six months starting from the entered date.
GO
CREATE PROC AdminListAcceptPublication
AS
select P.title
FROM Thesis_Publication
    INNER JOIN Publication P ON P.id = Thesis_Publication.publication_id
Where P.isAccepted = 1;



-- 3.l: Add courses and link courses to students. 
GO
CREATE PROC AddCourse
    @coursecode varchar(10),
    @creditHrs INT,
    @fees DECIMAL
AS
INSERT INTO Course
    (code , creditHours , fees)
VALUES
    (@coursecode, @creditHrs , @fees)

GO
CREATE PROC linkCourseStudent
    @courseID INT,
    @studentID INT
AS
IF EXISTS (select *
FROM NonGUCianTakeCourse
where NonGUCianTakeCourse.NonGUCianID = @studentID)
BEGIN
    INSERT INTO NonGUCianTakeCourse
        (course_id ,NonGUCianID)
    VALUES(@courseID, @studentID)
end


GO
CREATE PROC AddStudentCourseGrade
    @courseID INT,
    @studentID INT,
    @grade DECIMAL
AS
IF EXISTS (
    select *
FROM NonGUCianTakeCourse
where NonGUCianTakeCourse.NonGUCianID = @studentID and NonGUCianTakeCourse.course_id = @courseID
)
    BEGIN
    UPDATE NonGUCianTakeCourse
        SET grade = @grade
        where NonGUCianTakeCourse.NonGUCianID = @studentID AND NonGUCianTakeCourse.course_id = @courseID;
END




-- 3.m: View examiners and supervisor(s) names attending a thesis defense taking place on a certain date.
GO
CREATE PROC ViewExamSupDefense
    @defenseDate DATETIME
AS
    select E.name , S.firstName, S.lastName
    FROM ExaminerEvaluateDefense
        INNER JOIN Examiner E ON E.id = ExaminerEvaluateDefense.examiner_id
        INNER JOIN GUCianRegisterThesis ON ExaminerEvaluateDefense.thesisSerialNumber = GUCianRegisterThesis.thesisSerialNumber
        INNER JOIN Supervisor S ON S.id = GUCianRegisterThesis.supervisor_id
    WHEre ExaminerEvaluateDefense.[date] = @defenseDate

UNION

    select E.name , S.firstName, S.lastName
    FROM ExaminerEvaluateDefense
        INNER JOIN Examiner E ON E.id = ExaminerEvaluateDefense.examiner_id
        INNER JOIN NonGUCianRegisterThesis ON ExaminerEvaluateDefense.thesisSerialNumber = NonGUCianRegisterThesis.thesisSerialNumber
        INNER JOIN Supervisor S ON S.id = NonGUCianRegisterThesis.supervisor_id
    WHEre ExaminerEvaluateDefense.[date] = @defenseDate


------------------- (4) Supservisor's Features -------------------

-- 4.a: Evaluate a student’s progress report, and give evaluation value 0 to 3
GO
CREATE Proc EvaluateProgressReport
    @supervisorID int,
    @thesisSerialNo int,
    @progressReportNo int,
    @evaluation int
As
if(exists(select *
    from Thesis
    where serialNumber=@thesisSerialNo ) and
    @evaluation in(0,1,2,3) )
begin
    if(exists(select *
    from GUCianRegisterThesis
    where 
    thesisSerialNumber=@thesisSerialNo and supervisor_id=@supervisorID))
    begin
        declare @gucSid int
        select @gucSid=GUCianRegisterThesis.GUCianID
        from GUCianRegisterThesis
        where @thesisSerialNo=@thesisSerialNo
        update GUCianProgressReport
set evaluation=@evaluation
where student_id=@gucSid and thesisSerialNumber=@thesisSerialNo and
            progressReportNumber=@progressReportNo
    end
else if(exists(select *
    from NonGUCianRegisterThesis
    where
thesisSerialNumber=@thesisSerialNo and
        supervisor_id=@supervisorID))
begin
        declare @nonGucSid int
        select @nonGucSid=NonGUCianRegisterThesis.NonGUCianID
        from NonGUCianRegisterThesis
        where thesisSerialNumber=@thesisSerialNo
        update NonGUCianProgressReport
set evaluation=@evaluation
where student_id=@nonGucSid and thesisSerialNumber=@thesisSerialNo and
            progressReportNumber=@progressReportNo
    end
end

-- 4.b: View all my students’s names and years spent in the thesis.
exec ViewSupStudentsYears 11
GO
CREATE PROC ViewSupStudentsYears
    @supervisorID INT
AS
BEGIN
            SELECT GUCianStudent.firstName, GUCianStudent.lAStName, T1.years
        FROM GUCianRegisterThesis GUCianThesis
            INNER JOIN GUCianStudent GUCianStudent ON GUCianStudent.id = GUCianThesis.GUCianID
            INNER JOIN Thesis T1 ON T1.serialNumber = GUCianThesis.thesisSerialNumber
        WHERE GUCianThesis.supervisor_id = @supervisorID
    UNION
        SELECT NonGUCianStudent.firstName, NonGUCianStudent.lAStName, T2.years
        FROM NonGUCianRegisterThesis NonGUCianThesis
            INNER JOIN NonGUCianStudent NonGUCianStudent ON NonGUCianStudent.id = NonGUCianThesis.NonGUCianID
            INNER JOIN Thesis T2 ON T2.serialNumber = NonGUCianThesis.thesisSerialNumber
        WHERE NonGUCianThesis.supervisor_id = @supervisorID
END

-- 4.c: View my profile and update my personal information.
GO
CREATE PROC SupViewProfile
    @supervisorID INT
AS
BEGIN
    SELECT Supervisor.id, Supervisor.firstName, Supervisor.lastName, Supervisor.faculty, PostGradUser.email, PostGradUser.[password]
    FROM Supervisor
        INNER JOIN PostGradUser ON PostGradUser.id = Supervisor.id
    WHERE Supervisor.id = @supervisorID
END

GO
CREATE PROC UpdateSupProfile
    @supervisorID INT,
    @firstName VARCHAR(50),
    @lastName VARCHAR(50),
    @faculty VARCHAR(20)
AS
BEGIN
    UPDATE Supervisor
    SET firstName = @firstName, lastName = @lastName, faculty = @faculty
    WHERE Supervisor.id = @supervisorID
END

-- 4.d: View all publications of a student.
GO
CREATE PROC ViewAStudentPublications
    @studentID INT
AS
BEGIN
            Select P.*
        from Publication P
            INNER JOIN GucianStudent_Publications GucianStudent_Publications ON GucianStudent_Publications.publication_id = P.id
        WHERE GucianStudent_Publications.student_id = @studentID
    UNION ALL

        SELECT P.*
        from Publication P
            INNER JOIN NonGUCianStudent_Publications NonGUCianStudent_Publications ON NonGUCianStudent_Publications.publication_id = P.id
        WHERE NonGUCianStudent_Publications.student_id = @studentID
END

-- 4.e: Add defense for a thesis, for nonGucian students all courses’ grades should be greater than 50 percent.
-- TODO: not sure about not having grade
GO
CREATE PROC AddDefenseGucian
    @thesisSerialNo INT,
    @defenseDate DATETIME,
    @defenseLocation VARCHAR(15)
-- TODO: Shall we change the length to 15 in table_creations too? 
AS
BEGIN
    INSERT INTO Defense
        (thesisSerialNumber, date, location)
    VALUES
        (@thesisSerialNo, @defenseDate, @defenseLocation)

    UPDATE Thesis
    SET defenseDate = @defenseDate
    WHERE Thesis.serialNumber = @thesisSerialNo
END

GO
CREATE PROC AddDefenseNonGucian
    @thesisSerialNo INT,
    @defenseDate DATETIME,
    @defenseLocation VARCHAR(15),
    @Success Bit Output
-- TODO: Shall we change the length to 15 in table_creations too?
AS
BEGIN
    -- get NonGUCianID
    DECLARE @NonGUCianID INT
    SELECT @NonGUCianID = NonGUCianID
    FROM NonGUCianRegisterThesis T
    WHERE T.thesisSerialNumber = @thesisSerialNo
    SET @Success = 0;
    -- check if all student's grades are greater than 50 percent
    IF NOT EXISTS (
        SELECT *
    FROM NonGUCianTakeCourse C
    WHERE C.NonGUCianID = @NonGUCianID AND C.grade <= 50
    )
    BEGIN
        INSERT INTO Defense
            (thesisSerialNumber, date, location)
        VALUES
            (@thesisSerialNo, @defenseDate, @defenseLocation)
        SET @Success = 1;
        UPDATE Thesis
        SET defenseDate = @defenseDate
        WHERE Thesis.serialNumber = @thesisSerialNo
    END
END

-- 4.f: Add examiner(s) for a defense.
GO
CREATE PROC AddExaminer
    @thesisSerialNo INT,
    @DefenseDate DATETIME,
    @examinerID INT,
    @Success BIT OUTPUT
AS
BEGIN
    IF EXISTS (Select *
    From ExaminerEvaluateDefense
    WHere ExaminerEvaluateDefense.thesisSerialNumber = @thesisSerialNo
        AND ExaminerEvaluateDefense.date = @DefenseDate
        ANd ExaminerEvaluateDefense.examiner_id = @examinerID)
      BEGIN
        Set @Success =0
    END
      ELSE
      BEGIN
        INSERT INTO ExaminerEvaluateDefense
            (thesisSerialNumber, examiner_id, date)
        VALUES
            (@thesisSerialNo, @examinerID, @DefenseDate)
        Set @Success =1
    END
END

-- 4.g: Cancel a Thesis if the evaluation of the lASt progress report is zero.
GO
CREATE PROC CancelThesis
    @thesisSerialNo INT
AS
BEGIN
    IF ( 
        EXISTS (
            SELECT *
        FROM GUCianProgressReport PR
        WHERE PR.thesisSerialNumber = @thesisSerialNo
        ) AND (
            SELECT TOP 1
            evaluation
        FROM GUCianProgressReport PR
        WHERE PR.thesisSerialNumber = @thesisSerialNo
        ORDER BY PR.date DESC
        ) = 0
    )
    BEGIN
        DELETE FROM Thesis
        WHERE Thesis.serialNumber = @thesisSerialNo
    END
    ELSE IF (
        EXISTS (
            SELECT *
        FROM NonGUCianProgressReport PR
        WHERE PR.thesisSerialNumber = @thesisSerialNo
        ) AND (
            SELECT TOP 1
            evaluation
        FROM NonGUCianProgressReport PR
        WHERE PR.thesisSerialNumber = @thesisSerialNo
        ORDER BY PR.date DESC
        ) = 0
    )
    BEGIN
        DELETE FROM Thesis
        WHERE Thesis.serialNumber = @thesisSerialNo
    END
END

-- 4.h: Add a grade for a thesis.
-- TODO: grade missing in question statement!
GO
CREATE PROC AddGrade
    @thesisSerialNo INT,
    @grade DECIMAL
AS
BEGIN
    UPDATE Thesis
    SET grade = @grade
    WHERE Thesis.serialNumber = @thesisSerialNo
END



------------------- (5) Examiner's Features -------------------

-- 5.a: Add grade for a defense.
GO
CREATE PROC AddDefenseGrade
    @ThesisSerialNo INT,
    @DefenseDate DATETIME,
    @grade DECIMAL
AS
BEGIN
    UPDATE Defense
    SET grade = @grade
    WHERE Defense.thesisSerialNumber = @ThesisSerialNo AND Defense.date = @DefenseDate
END

-- 5.b: Add comments for a defense.
GO
CREATE PROC AddCommentsGrade
    @ThesisSerialNo INT ,
    @DefenseDate Datetime ,
    @comments VARCHAR(300)
AS
BEGIN
    UPDATE ExaminerEvaluateDefense
    SET comment = @comments
    WHERE thesisSerialNumber = @ThesisSerialNo AND date = @DefenseDate
END

------------------- (6) Registered Student's Features -------------------

-- 6.a: View my profile that contains all my information.
GO
CREATE PROC viewMyProfile
    @studentId INT
AS
BEGIN
    IF EXISTS (
        SELECT *
    FROM GUCianStudent
    WHERE GUCianStudent.id = @studentId
    )
        BEGIN
        SELECT PostGradUser.email, GUCianStudent.*
        FROM GUCianStudent
            INNER JOIN GUCStudentPhoneNumber ON GUCianStudent.id = GUCStudentPhoneNumber.GUCianID
            INNER JOIN PostGradUser ON GUCianStudent.id = PostGradUser.id
        WHERE GUCianStudent.id = @studentId
    END
    ELSE
        BEGIN
        SELECT PostGradUser.email, NonGUCianStudent.*
        FROM NonGUCianStudent
            INNER JOIN NonGUCianPhoneNumber ON NonGUCianStudent.id = NonGUCianPhoneNumber.NonGUCianID
            INNER JOIN PostGradUser ON NonGUCianStudent.id = PostGradUser.id
        WHERE NonGUCianStudent.id = @studentId
    END
END

-- 6.b: Edit my profile (change any of my personal information).
GO
CREATE PROC editMyProfile
    @studentId INT,
    @firstName VARCHAR(10),
    @lAStName VARCHAR(10),
    @pASsword VARCHAR(10),
    @email VARCHAR(10),
    @address VARCHAR(10),
    @type VARCHAR(10)
AS
BEGIN
    UPDATE PostGradUser
    SET email = @email, pASsword = @pASsword
    WHERE PostGradUser.id = @studentId

    IF EXISTS (
        SELECT *
    FROM GUCianStudent
    WHERE GUCianStudent.id = @studentId
    )
        BEGIN
        UPDATE GUCianStudent
            SET firstName = @firstName, lAStName = @lAStName, address = @address
            WHERE GUCianStudent.id = @studentId
    END
    ELSE
        BEGIN
        UPDATE NonGUCianStudent
            SET firstName = @firstName, lAStName = @lAStName, address = @address
            WHERE NonGUCianStudent.id = @studentId
    END
END

-- 6.c: AS a Gucian graduate, add my undergarduate ID.
GO
CREATE PROC addUndergradID
    @studentID INT,
    @undergradID VARCHAR(10)
AS
BEGIN
    UPDATE GUCianStudent
    SET undergradID = @undergradID
    WHERE GUCianStudent.id = @studentID
END

-- 6.d: AS a nonGucian student, view my courses’ grades.
GO
CREATE PROC ViewCoursesGrades
    @studentID INT
AS
BEGIN
    SELECT C.course_id, C.grade
    FROM NonGUCianTakeCourse C
    WHERE C.NonGUCianID = @studentID
END

-- 6.e: View all my payments and installments.
---- 6.e.1: View course paymeents.
GO
CREATE PROC ViewCoursePaymentsInstall
    @studentID INT
AS
BEGIN
    SELECT CP.course_id, I.*
    FROM NonGUCianPayCourse CP
        INNER JOIN Installment I ON I.paymentID = CP.payment_id
    WHERE CP.NonGUCianID = @studentID
END

---- 6.e.2: View thesis payments.
GO
CREATE PROC ViewThesisPaymentsInstall
    @studentID INT
AS
BEGIN
    IF EXISTS (
        SELECT *
    FROM GUCianStudent
    WHERE GUCianStudent.id = @studentID
    )
        BEGIN
        SELECT GUCianThesis.thesisSerialNumber, I.*
        FROM GUCianRegisterThesis GUCianThesis
            INNER JOIN Thesis T ON T.serialNumber = GUCianThesis.thesisSerialNumber
            INNER JOIN Installment I ON I.paymentID = T.payment_id
        WHERE GUCianThesis.GUCianID = @studentID
    END
    ELSE
        BEGIN
        SELECT NonGUCianThesis.thesisSerialNumber, I.*
        FROM NonGUCianRegisterThesis NonGUCianThesis
            INNER JOIN Thesis T ON T.serialNumber = NonGUCianThesis.thesisSerialNumber
            INNER JOIN Installment I ON I.paymentID = T.payment_id
        WHERE NonGUCianThesis.NonGUCianID = @studentID
    END
END

---- 6.e.3: View upcoming installments.
GO
CREATE PROC ViewUpcomingInstallments
    @studentID INT
AS
BEGIN
    IF EXISTS (
        SELECT *
    FROM GUCianStudent
    WHERE GUCianStudent.id = @studentID
    )
        BEGIN
        SELECT I.*
        FROM GUCianRegisterThesis GUCianThesis
            INNER JOIN Thesis T ON T.serialNumber = GUCianThesis.thesisSerialNumber
            INNER JOIN Installment I ON I.paymentID = T.payment_id
        WHERE GUCianThesis.GUCianID = @studentID AND I.date > GETDATE()
    END
    ELSE
        BEGIN
                    SELECT I.*
            FROM NonGUCianRegisterThesis NonGUCianThesis
                INNER JOIN Thesis T ON T.serialNumber = NonGUCianThesis.thesisSerialNumber
                INNER JOIN Installment I ON I.paymentID = T.payment_id
            WHERE NonGUCianThesis.NonGUCianID = @studentID AND I.date > GETDATE()

        UNION

            SELECT I.*
            FROM NonGUCianPayCourse CP
                INNER JOIN Installment I ON I.paymentID = CP.payment_id
            WHERE CP.NonGUCianID = @studentID AND I.date > GETDATE()
    END
END

---- 6.e.4: View missed installments.
GO
CREATE PROC ViewMissedInstallments
    @studentID INT
AS
BEGIN
    IF EXISTS (
        SELECT *
    FROM GUCianStudent
    WHERE GUCianStudent.id = @studentID
    )
        BEGIN
        SELECT I.*
        FROM GUCianRegisterThesis GUCianThesis
            INNER JOIN Thesis T ON T.serialNumber = GUCianThesis.thesisSerialNumber
            INNER JOIN Installment I ON I.paymentID = T.payment_id
        WHERE GUCianThesis.GUCianID = @studentID AND I.date < GETDATE() AND I.isPaid = 0
    END
    ELSE
        BEGIN
                    SELECT I.*
            FROM NonGUCianRegisterThesis NonGUCianThesis
                INNER JOIN Thesis T ON T.serialNumber = NonGUCianThesis.thesisSerialNumber
                INNER JOIN Installment I ON I.paymentID = T.payment_id
            WHERE NonGUCianThesis.NonGUCianID = @studentID AND I.date < GETDATE() AND I.isPaid = 0

        UNION

            SELECT I.*
            FROM NonGUCianPayCourse CP
                INNER JOIN Installment I ON I.paymentID = CP.payment_id
            WHERE CP.NonGUCianID = @studentID AND I.date < GETDATE() AND I.isPaid = 0
    END
END

-- 6.f: Add and fill my progress report(s).
---- 6.f.1: Add a progress report.
-- TODO: missing progressReportNumber?
GO
CREATE PROC AddProgressReport
    @thesisSerialNo INT,
    @progressReportDate DATE
AS
BEGIN
    IF EXISTS (
        SELECT *
    FROM GUCianRegisterThesis GT
    WHERE GT.thesisSerialNumber = @thesisSerialNo
    )
        BEGIN
        DECLARE @GUCianStudentID INT
        SELECT @GUCianStudentID = GUCianID
        FROM GUCianRegisterThesis
        WHERE thesisSerialNumber = @thesisSerialNo

        INSERT INTO GUCianProgressReport
            (student_id, date, thesisSerialNumber)
        VALUES
            (@GUCianStudentID, @progressReportDate, @thesisSerialNo)
    END
    ELSE
        BEGIN
        DECLARE @NonGUCianStudentID INT
        SELECT @NonGUCianStudentID = NonGUCianID
        FROM NonGUCianRegisterThesis
        WHERE thesisSerialNumber = @thesisSerialNo

        INSERT INTO NonGUCianProgressReport
            (student_id, date, thesisSerialNumber)
        VALUES
            (@NonGUCianStudentID, @progressReportDate, @thesisSerialNo)
    END
END

---- 6.f.2: Fill a progress report.
-- TODO: where's the description in schema?
GO
CREATE PROC FillProgressReport
    @thesisSerialNo INT,
    @progressReportNo INT,
    @state INT,
    @description VARCHAR(200)
AS
BEGIN
    IF EXISTS (
        SELECT *
    FROM GUCianRegisterThesis GT
    WHERE GT.thesisSerialNumber = @thesisSerialNo
    )
        BEGIN
        DECLARE @GUCianStudentID INT
        SELECT @GUCianStudentID = GUCianID
        FROM GUCianRegisterThesis
        WHERE thesisSerialNumber = @thesisSerialNo

        UPDATE GUCianProgressReport
            SET state = @state, description = @description
            WHERE progressReportNumber = @progressReportNo AND student_id = @GUCianStudentID
    END
    ELSE
        BEGIN
        DECLARE @NonGUCianStudentID INT
        SELECT @NonGUCianStudentID = NonGUCianID
        FROM NonGUCianRegisterThesis
        WHERE thesisSerialNumber = @thesisSerialNo

        UPDATE NonGUCianProgressReport
            SET state = @state, description = @description
            WHERE progressReportNumber = @progressReportNo AND student_id = @NonGUCianStudentID
    END
END

-- 6.g: View my progress report(s) evaluations.
GO
CREATE PROC ViewEvalProgressReport
    @studentId INT
AS
BEGIN
    IF EXISTS (
        SELECT *
    FROM GUCianProgressReport
    WHERE student_id = @studentId
    )
        BEGIN
        SELECT PR.evaluation, S.firstName, S.lastName, T.title
        FROM GUCianProgressReport PR, Supervisor S, Thesis T
        WHERE PR.student_id = @studentId AND PR.supervisor_id = S.id AND T.serialNumber = PR.thesisSerialNumber
    END
    ELSE
        BEGIN
        SELECT NPR.evaluation, S.firstName, S.lastName, T.title
        FROM NonGUCianProgressReport NPR, Supervisor S, Thesis T
        WHERE NPR.student_id = student_id AND NPR.supervisor_id = S.id AND T.serialNumber = NPR.thesisSerialNumber
    END
END
drop proc ViewEvalProgressReport

-- 6.h: Add Publication.
GO
CREATE PROC addPublication
    @title VARCHAR(50),
    @pubDate DATETIME,
    @host VARCHAR(50),
    @place VARCHAR(50),
    @accepted BIT,
    @studentID INT
AS
BEGIN


    INSERT INTO Publication
        (title, date, host, place, isAccepted)
    VALUES
        (@title, @pubDate, @host, @place, @accepted)
    DECLARE @publicationID INT = SCOPE_IDENTITY();

    IF EXISTS (
            SELECT *
    FROM GUCianStudent
    WHERE GUCianStudent.id = @studentID
        )
            BEGIN
        INSERT INTO GucianStudent_Publications
            (publication_id, student_id)
        VALUES
            (@publicationID, @studentID)
    END
        ELSE
            BEGIN
        INSERT INTO NonGucianStudent_Publications
            (publication_id, student_id)
        VALUES
            (@publicationID, @studentID)
    END

END


-- 6.i: Link publication to my thesis.
GO
create PROC linkPubThesis
    @PubID INT,
    @thesisSerialNo INT,
    @SuccessBit BIT OUTPUT
AS
BEGIN
    IF EXISTS(
    SELECT *
    From Thesis_Publication
    Where Thesis_Publication.thesisSerialNumber = @thesisSerialNo AND Thesis_Publication.publication_id = @PubID
    )
        BEGIN
        SET @SuccessBit = 0
    END
    ELSE
        BEGIN
        INSERT INTO Thesis_Publication
            (publication_id, thesisSerialNumber)
        VALUES
            (@PubID, @thesisSerialNo)
        SET @SuccessBit = 1
    END
END

drop proc linkPubThesis

select *
from Thesis_Publication
EXEC linkPubThesis 29, 20


-------------------------------------------------------

-------------- NEWLY ADDED PROCEDURES ----------------

go
Create proc AddCommentsGrade
    @ThesisSerialNo int ,
    @DefenseDate Datetime ,
    @comments varchar(300),
    @Success bit output
as
if (exists(select *
from Thesis
where serialNumber =@ThesisSerialNo))
begin
    set @Success =1
    update ExaminerEvaluateDefense
set comment = @comments
where thesisSerialNumber = @ThesisSerialNo and date = @DefenseDate
end
else set @Success=0
go
create proc AddDefenseGrade
    @ThesisSerialNo int ,
    @DefenseDate Datetime ,
    @grade decimal(4,2),
    @Success bit output
as
if(exists( select *
from Thesis
where serialNumber =@ThesisSerialNo))
begin
    set @Success =1
    update Defense
set grade = @grade
where thesisSerialNumber = @ThesisSerialNo and date = @DefenseDate
end 
else 
set @Success =0
go
Create PROC search
    @keyWord varchar(20),
    @Success bit output
As
if(exists(select *
from Thesis
where @keyWord=Thesis.title))
begin
    set @Success =1
    Select *
    from Thesis
    where @keyWord=Thesis.title
end
else
set @Success=0


GO
Create Proc editExaminer
    @ID varchar(20),
    @Name varchar(20) ,
    @Field varchar(20)
AS
Update Examiner 
Set name = @Name,
fieldOfWork = @Field
where id =@ID

Go
CREATE PROC viewStudentThesisById
    @id int
AS
select *
from Thesis T
    Inner JOIN GUCIanREGisterThesis GT on T.serialNumber=GT.thesisSerialNumber
where GT.GUCianID = @id
GO
Create proc getIDbyEmail
    @email varchar(30),
    @id int output,
    @Success BIT OUTPUT
as
BEGIN
    if exists(
select *
    from PostGradUser p
    where p.email = @email)
    BEGIN
        SET @Success = 1;
        select @id = p.id
        from PostGradUser p
        where p.email = @email
    END
    ELSE
    BEGIN
        SET @Success = 0;
    END
END

GO
CREATE PROC StudentViewAllCourses
    @studentID INT
AS
Select C.* , NGC.grade
from Course C
    INNER JOIN NonGUCianTakeCourse NGC ON NGC.course_id = C.id
WHERE NGC.NonGUCianID = @studentID;

GO
CREATE PROC AddAndFillProgressReport
    @thesisSerialNo INT,
    @progressReportDate Date,
    @state INT,
    @description VARCHAR(200)
AS
BEGIN
    IF EXISTS (
        SELECT *
    FROM GUCianRegisterThesis GT
    WHERE GT.thesisSerialNumber = @thesisSerialNo
    )
        BEGIN
        DECLARE @GUCianStudentID INT
        SELECT @GUCianStudentID = GUCianID
        FROM GUCianRegisterThesis
        WHERE thesisSerialNumber = @thesisSerialNo

        INSERT INTO GUCianProgressReport
            (student_id, date, thesisSerialNumber,description,state)
        VALUES
            (@GUCianStudentID, @progressReportDate, @thesisSerialNo, @description, @state)
    END
    ELSE
        BEGIN
        DECLARE @NonGUCianStudentID INT
        SELECT @NonGUCianStudentID = NonGUCianID
        FROM NonGUCianRegisterThesis
        WHERE thesisSerialNumber = @thesisSerialNo

        INSERT INTO NonGUCianProgressReport
            (student_id, date, thesisSerialNumber,description,state)
        VALUES
            (@NonGUCianStudentID, @progressReportDate, @thesisSerialNo, @description, @state)
    END
END

select *
from GUCianProgressReport

INSERT INTO
    Thesis
    (
    TYPE,
    field,
    title,
    startDate,
    endDate,
    defenseDate,
    grade,
    payment_id,
    noExtension
    )
VALUES
    (
        'PhD',
        'Computer Science',
        'Thesis on Algorithms',
        '2019-01-01',
        '2025-02-01',
        '2019-05-07',
        63.4,
        1,
        0
    )

GO
CREATE PROC GetUserInformation
    @id int
AS

IF exists (Select *
from GUCianStudent
Where GUCianStudent.id = @id)
BEGIN
    SELECT *
    FROM GUCianStudent
    WHERE GUCianStudent.id = @id
END
ELSE
BEGIN
    SELECT *
    FROM NonGUCianStudent
    WHERE NonGUCianStudent.id = @id
END

select *
from GUCianRegisterThesis G
where G.GUCianID = 1
DELETE from GUCianRegisterThesis 
WHERE  GUCianRegisterThesis.GUCianID = 1 AND GUCianRegisterThesis.supervisor_id=11;

drop proc GetUserInformation


-- TODO : Add the following procedures to the database.
-- 1.a: Get the id of the selected thesis by search for the title that the thesis made by the specefic studentID user



    


--------

GO
CREATE PROC editMyPassword
    @studentId INT,
    @oldPassword VARCHAR(10),
    @newPassword VARCHAR(10)

AS

IF(exists(select *
from PostGradUser
where @studentId=id and @oldPassword= password))
    BEGIN

    UPDATE PostGradUser
        SET  password = @newPassword
        WHERE PostGradUser.id = @studentId


END








GO
CREATE PROC StudentData
    @studentId INT


AS
BEGIN
    IF EXISTS (
    SELECT *
    FROM GUCianStudent G
        INNER JOIN PostGradUser U
        ON G.id = @studentId
            AND G.id = U.id)
    BEGIN
        SELECT *
        FROM GUCianStudent G
            INNER JOIN PostGradUser U
            ON G.id = @studentId
                AND G.id = U.id
    END
ELSE
BEGIN
        SELECT *
        FROM NonGUCianStudent G
            INNER JOIN PostGradUser U
            ON G.id = @studentId
                AND G.id = U.id
    END
END





GO
GO
CREATE PROC getIdOfSelectedThesisByStudent

    @studentId INT,
    @thesisTitle VARCHAR(20)
AS
BEGIN
    IF EXISTS (Select *
    from GUCianStudent
    where id = @studentId)

    BEGIN
        SELECT T.serialNumber
        from GUCianRegisterThesis
            INNER JOIN Thesis T
            ON GUCianRegisterThesis.thesisSerialNumber = T.serialNumber
        WHERE GUCianRegisterThesis.GUCianID = @studentId AND T.title = @thesisTitle
    END
    ELSE
    BEGIN
        SELECT T.serialNumber
        from NonGUCianRegisterThesis
            INNER JOIN Thesis T
            ON NonGUCianRegisterThesis.thesisSerialNumber = T.serialNumber
        WHERE NonGUCianRegisterThesis.NonGUCianID = @studentId AND T.title = @thesisTitle
    END
END
EXEC getIdOfSelectedThesisByStudent 1, 'Thesis on Algorithms'

select *
from Thesis_Publication
Delete from Thesis_Publication
where thesisSerialNumber=2 OR thesisSerialNumber =20;

INSERT INTO
    GUCianRegisterThesis
    (
    GUCianID,
    supervisor_id,
    thesisSerialNumber
    )
VALUES
    (1, 11, 2)






select *
from postgraduser
select *
from Supervisor







-- Examiner Proceudres
GO
CREATE PROC ExaminerProfile
    @examinerId INT
AS
Select E.name, E.fieldOfWork, P.email
from Examiner E
    INNER JOIN PostGradUser P on E.id = P.id
WHERE P.id = @examinerId




GO
CREATE  PROC  ExaminerAttendedDefense
    @id int
as
    select T.title as Title, T.field, T.[type], CONCAT(S.firstName,s.lastName) as Supervisor, GS.firstName as Student, EV.[date] as DATE, D.grade as GRADE, Ev.comment as COMMENT
    from ExaminerEvaluateDefense EV inner join GUCianRegisterThesis GRT on EV.thesisSerialNumber=GRT.thesisSerialNumber
        inner join Thesis T on EV.thesisSerialNumber=T.serialNumber
        inner join GucianStudent GS on GRT.GUCianID = GS.id
        inner join Supervisor S on GRT.supervisor_id=S.id
        Inner join Defense D on EV.thesisSerialNumber =D.thesisSerialNumber AND ev.[date]=D.[date]
    where EV.examiner_id = @id
UNION
    select T.title as Title, T.field, T.[type], CONCAT(S.firstName,s.lastName) as Supervisor, NGS.firstName as Student, EV.[date] as DATE, D.grade as GRADE, Ev.comment as COMMENT
    from ExaminerEvaluateDefense EV inner join NonGUCianRegisterThesis NGRT on EV.thesisSerialNumber=NGRT.thesisSerialNumber
        inner join Thesis T on EV.thesisSerialNumber=T.serialNumber
        inner join NonGucianStudent NGS on NGRT.NonGUCianID = NGS.id
        inner join Supervisor S on NGRT.supervisor_id=S.id
        Inner join Defense D on EV.thesisSerialNumber =D.thesisSerialNumber AND ev.[date]=D.[date]
    where EV.examiner_id = @id

drop proc ExaminerAttendedDefense
exec ExaminerAttendedDefense 16
select *
from ExaminerEvaluateDefense
select *
from Defense





GO
CREATE PROC editExaminerPassword
    @examinerID INT,
    @oldPassword VARCHAR(10),
    @newPassword VARCHAR(10),
    @Success BIT OUTPUT

AS

IF(exists(select *
from PostGradUser
where @examinerID=id and @oldPassword= password))
    BEGIN
    SET @Success = 1;

    UPDATE PostGradUser
        SET  password = @newPassword
        WHERE PostGradUser.id = @examinerID

END
ELSE
BEGIN
    SET @Success = 0;
END


drop proc editExaminerPassword
select *
from PostGradUser INNER JOIN Examiner
    ON PostGradUser.id = Examiner.id
where PostGradUser.id = 16;

UPDATE EXAMINER 
SET fieldOfWork = 'Software Engineering', NAME = 'Tyson'
WHERE id = 16;


