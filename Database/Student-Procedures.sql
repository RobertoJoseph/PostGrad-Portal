SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[viewMyProfile]
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

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[editMyProfile]
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

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[StudentRegister]
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

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[addUndergradID]
    @studentID INT,
    @undergradID VARCHAR(10)
AS
BEGIN
    UPDATE GUCianStudent
    SET undergradID = @undergradID
    WHERE GUCianStudent.id = @studentID
END

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[ViewCoursesGrades]
    @studentID INT
AS
BEGIN
    SELECT C.course_id, C.grade
    FROM NonGUCianTakeCourse C
    WHERE C.NonGUCianID = @studentID
END

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[ViewCoursePaymentsInstall]
    @studentID INT
AS
BEGIN
    SELECT CP.course_id, I.*, C.code
    FROM NonGUCianPayCourse CP
        INNER JOIN Installment I ON I.paymentID = CP.payment_id
        INNER JOIN Course C ON C.id = CP.course_id 
    WHERE CP.NonGUCianID = @studentID
END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[ViewThesisPaymentsInstall] 
    @studentID INT
AS
BEGIN
    IF EXISTS (
        SELECT *
        FROM GUCianStudent
        WHERE GUCianStudent.id = @studentID
    )
        BEGIN
        SELECT GUCianThesis.thesisSerialNumber, I.*, T.title
        FROM GUCianRegisterThesis GUCianThesis
            INNER JOIN Thesis T ON T.serialNumber = GUCianThesis.thesisSerialNumber
            INNER JOIN Installment I ON I.paymentID = T.payment_id
        WHERE GUCianThesis.GUCianID = @studentID
    END
    ELSE
        BEGIN
        SELECT NonGUCianThesis.thesisSerialNumber, I.*, T.title
        FROM NonGUCianRegisterThesis NonGUCianThesis
            INNER JOIN Thesis T ON T.serialNumber = NonGUCianThesis.thesisSerialNumber
            INNER JOIN Installment I ON I.paymentID = T.payment_id
        WHERE NonGUCianThesis.NonGUCianID = @studentID
        END
END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[ViewUpcomingInstallments]
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

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[ViewMissedInstallments]
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

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[AddAndFillProgressReport]
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
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[ViewEvalProgressReport]
    @studentId INT
AS
BEGIN
    IF EXISTS (
        SELECT *
    FROM GUCianStudent
    WHERE GUCianStudent.id = @studentId
    )
   
        BEGIN
        SELECT PR.evaluation, S.firstName, S.lastName, T.title
        FROM GUCianProgressReport PR INNER JOIN Supervisor S on S.id = PR .supervisor_id INNER JOIN THESIS T ON T.serialNumber = PR.thesisSerialNumber
        WHERE PR.student_id = @studentId

    END
    ELSE
        BEGIN
        SELECT NPR.evaluation, S.firstName, S.lastName, T.title
        FROM NonGUCianProgressReport NPR INNER JOIN Supervisor S on S.id = NPR .supervisor_id INNER JOIN THESIS T ON T.serialNumber = NPR.thesisSerialNumber
        WHERE NPR.student_id = @studentId
    END
END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[viewStudentThesisById]
    @id int
AS
IF exists(Select *
from GUCianStudent
Where GUCianStudent.id = @id)
BEGIN
    SELECT *
    FROM Thesis
        INNER JOIN GUCianRegisterThesis ON GUCianRegisterThesis.thesisSerialNumber = Thesis.serialNumber
        WHere GUCianRegisterThesis.GUCianID = @id
END
ELSE
BEGIN
    SELECT *
    FROM Thesis
        INNER JOIN NonGUCianRegisterThesis ON NonGUCianRegisterThesis.thesisSerialNumber = Thesis.serialNumber
        WHere NonGUCianRegisterThesis.NonGUCianID = @id

END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[StudentViewAllCourses]
    @studentID INT
AS
Select C.* , NGC.grade
from Course C
    INNER JOIN NonGUCianTakeCourse NGC ON NGC.course_id = C.id
WHERE NGC.NonGUCianID = @studentID;
GO



SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[addPublication]
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
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[linkPubThesis]
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
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[ViewAStudentPublications]
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
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[editMyPassword]
    @studentId INT,
    @oldPassword VARCHAR(10),
    @newPassword VARCHAR(10)

AS

IF(exists(select * from PostGradUser where @studentId=id and @oldPassword= password))
    BEGIN
    
        UPDATE PostGradUser
        SET  password = @newPassword
        WHERE PostGradUser.id = @studentId


    END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[getIdOfSelectedThesisByStudent]

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
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[checkGUCian]
    @ID INT,
    @Success BIT OUTPUT
AS
BEGIN
    IF EXISTS (
        SELECT *
    FROM GUCianStudent S
    WHERE S.id = @ID
    )
        BEGIN
        SET @Success = 1;
    END
    ELSE
        BEGIN
        SET @Success = 0;
    END
END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO










