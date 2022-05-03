SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
---- Admin Operations ----
GO
CREATE PROC [dbo].[viewAdminProfile] 
@id INT
AS 
BEGIN
    SELECT * FROM Admin WHERE Admin.id = @id
END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[AdminListSup]
AS
    SELECT S.*, U.email, U.password
    FROM Supervisor S
    INNER JOIN PostGradUser U ON U.id = S.id;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[AdminViewStudentThesisBySupervisor]
@supervisorID INT
AS
    SELECT S1.firstName, S1.lastName, T1.title AS Thesis, GUCianStudent.firstName AS First_name, GUCianStudent.lastName AS Last_name, GUCianStudent.id AS studentID
    FROM GUCianRegisterThesis
        INNER JOIN Supervisor S1 On S1.id = GUCianRegisterThesis.supervisor_id
        INNER JOIN Thesis T1 on T1.serialNumber = GUCianRegisterThesis.thesisSerialNumber
        INNER JOIN GUCianStudent ON GUCianStudent.id = GUCianRegisterThesis.GUCianID
        WHERE T1.endDate > GETDATE() AND S1.id = @supervisorID

    UNION
    
    SELECT S2.firstName, S2.lastName, T2.title AS Thesis, NonGUCianStudent.firstName AS First_name, NonGUCianStudent.lastName AS Last_name, NonGUCianStudent.id AS studentID
    FROM NonGUCianRegisterThesis
        INNER JOIN Supervisor S2 On S2.id = NonGUCianRegisterThesis.supervisor_id
        INNER JOIN Thesis T2 on T2.serialNumber = NonGUCianRegisterThesis.thesisSerialNumber
        INNER JOIN NonGUCianStudent ON NonGUCianStudent.id = NonGUCianRegisterThesis.NonGUCianID
        WHERE T2.endDate > GETDATE() AND S2.id = @supervisorID
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[AdminViewStudentProfile]
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

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[AdminViewSupervisorProfile]
    @supID INT
AS
    SELECT *
    FROM Supervisor
    INNER JOIN PostGradUser ON PostGradUser.id = Supervisor.id
    WHERE Supervisor.id = @supID;

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[CancelThesis]
@ThesisSerialNo int,@successBit bit output
as
if(exists(
select *
from GUCianProgressReport
where thesisSerialNumber = @ThesisSerialNo
))
begin
declare @gucianEval int
set @gucianEval = (
select top 1 evaluation
from GUCianProgressReport
where thesisSerialNumber = @ThesisSerialNo
order by progressReportNumber desc
)
if(@gucianEval = 0)
begin
delete from Thesis where serialNumber = @ThesisSerialNo
set @successBit = 1
end
end
else
begin
declare @nonGucianEval int
set @nonGucianEval = (
select top 1 evaluation
from NonGUCianProgressReport
where thesisSerialNumber = @ThesisSerialNo
order by progressReportNumber desc
)
if(@nonGucianEval = 0)
begin
delete from Thesis where serialNumber = @ThesisSerialNo
set @successBit = 1
end
end
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[AdminViewAllTheses]
    AS
    SELECT *
    FROM Thesis;

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[AdminUpdateExtension]
    @ThesisSerial INT
AS
    UPDATE Thesis 
    SET Thesis.noExtension = Thesis.noExtension + 1
    WHERE Thesis.serialNumber = @ThesisSerial

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[viewAllGUCians]
AS
    BEGIN
        SELECT GUCianStudent.*, PostGradUser.email, PostGradUser.password FROM GUCianStudent 
        INNER JOIN PostGradUser
        ON GUCianStudent.id = PostGradUser.id
    END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[viewAllNonGUCians]
AS
    BEGIN
        SELECT NonGUCianStudent.*, PostGradUser.email, PostGradUser.password FROM NonGUCianStudent
        INNER JOIN PostGradUser
        ON NonGUCianStudent.id = PostGradUser.id
    END
GO


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC  [dbo].[viewAllCourses]
AS
    BEGIN 
        SELECT * FROM Course
    END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[AddCourse]
    @coursecode varchar(10),
    @creditHrs INT,
    @fees DECIMAL
AS
INSERT INTO Course
    (code , creditHours , fees)
VALUES
    (@coursecode, @creditHrs , @fees)

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[linkCourseHelper]
    @coursecode VARCHAR(10),
    @studentID INT
AS
BEGIN
    DECLARE @courseID INT
    SELECT @courseID = id
    FROM Course
    WHERE code = @coursecode
    EXEC linkCourseStudent @courseID, @studentID
END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[AddStudentCourseGrade]
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




SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[AdminListNonGucianCourse]
    @courseID Int
AS
    SELECT  NonGUCianTakeCourse.NonGUCianID, NG.firstName , NG.lAStName, C.code, NonGUCianTakeCourse.grade
    FROM NonGUCianTakeCourse
        INNER JOIN NonGUCianStudent NG ON NG.id = NonGUCianTakeCourse.NonGUCianID
        INNER JOIN Course C ON C.id = NonGUCianTakeCourse.course_id
        Where NonGUCianTakeCourse.course_id = @courseID;



SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[AdminListAcceptPublication]
    @serialNumber INT
AS
select P.title, P.place, P.host
FROM Thesis_Publication
    INNER JOIN Publication P ON P.id = Thesis_Publication.publication_id
Where P.isAccepted = 1 AND Thesis_Publication.thesisSerialNumber = @serialNumber

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[ListThesesWithNoPayment] 
AS 
    SELECT Thesis.* FROM Thesis
    WHERE Thesis.payment_id IS NULL;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[AdminIssueThesisPayment]
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

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[AdminIssueInstallPayment]
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


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[ViewOnGOingTheses]
AS
    SELECT * FROM Thesis T
    Where T.endDate > GETDATE();

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[ViewExamSupDefense]
   
AS
    select E.name , S.firstName, S.lastName, ExaminerEvaluateDefense.[date]
    FROM ExaminerEvaluateDefense
        INNER JOIN Examiner E ON E.id = ExaminerEvaluateDefense.examiner_id
        INNER JOIN GUCianRegisterThesis ON ExaminerEvaluateDefense.thesisSerialNumber = GUCianRegisterThesis.thesisSerialNumber
        INNER JOIN Supervisor S ON S.id = GUCianRegisterThesis.supervisor_id
    

    UNION
    
    select E.name , S.firstName, S.lastName, ExaminerEvaluateDefense.[date]
    FROM ExaminerEvaluateDefense
        INNER JOIN Examiner E ON E.id = ExaminerEvaluateDefense.examiner_id
        INNER JOIN NonGUCianRegisterThesis ON ExaminerEvaluateDefense.thesisSerialNumber = NonGUCianRegisterThesis.thesisSerialNumber
        INNER JOIN Supervisor S ON S.id = NonGUCianRegisterThesis.supervisor_id
GO


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[ViewExpiredTheses]
AS
    SELECT * FROM Thesis T
    Where T.endDate < GETDATE();
GO


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[ListAllPayments] 
AS 
    SELECT Payment.*, Thesis.title, Thesis.serialNumber FROM Payment
    INNER JOIN Thesis
    ON Thesis.payment_id = Payment.id
    WHERE Payment.id NOT IN (   SELECT Installment.paymentID AS id FROM Installment )
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[ListUnlinkedTheses] 
AS 
    SELECT Thesis.* FROM Thesis
    WHERE Thesis.serialNumber NOT IN (  SELECT GUCianRegisterThesis.thesisSerialNumber AS serialNumber
                                        FROM GUCianRegisterThesis
                                        UNION
                                        SELECT NonGUCianRegisterThesis.thesisSerialNumber AS serialNumber 
                                        FROM NonGUCianRegisterThesis);
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 CREATE PROC [dbo].[LinkThesis]
 @serialNumber INT,
 @studentID INT,
 @SupervisorID INT
 AS
 BEGIN
    IF EXISTS(select * from GUCianStudent where id = @studentID)
        BEGIN 
            INSERT INTO GUCianRegisterThesis(GUCianID, supervisor_id, thesisSerialNumber)
            VALUES (@studentID, @SupervisorID, @serialNumber)
        END
    ELSE 
        BEGIN 
            INSERT INTO NonGUCianRegisterThesis(NonGUCianID, supervisor_id, thesisSerialNumber)
            VALUES (@studentID, @SupervisorID, @serialNumber)
        END
END;
GO










