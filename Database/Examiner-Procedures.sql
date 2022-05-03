SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[ExaminerProfile]
    @examinerId INT
AS
Select E.name, E.fieldOfWork, P.email
from Examiner E
    INNER JOIN PostGradUser P on E.id = P.id
WHERE P.id = @examinerId


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[editExaminerPassword]
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
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE  PROC  [dbo].[ExaminerAttendedDefense]
    @id int
as
    select  GS.id, T.serialNumber, T.title as Title, T.field, T.[type], CONCAT(S.firstName,s.lastName) as Supervisor, GS.firstName as Student, EV.[date] as DATE, D.grade as GRADE, Ev.comment as COMMENT
    from ExaminerEvaluateDefense EV inner join GUCianRegisterThesis GRT on EV.thesisSerialNumber=GRT.thesisSerialNumber
        inner join Thesis T on EV.thesisSerialNumber=T.serialNumber
        inner join GucianStudent GS on GRT.GUCianID = GS.id
        inner join Supervisor S on GRT.supervisor_id=S.id
        Inner join Defense D on EV.thesisSerialNumber =D.thesisSerialNumber AND ev.[date]=D.[date]
    where EV.examiner_id = @id
UNION
    select NGS.id, T.serialNumber, T.title as Title, T.field, T.[type], CONCAT(S.firstName,s.lastName) as Supervisor, NGS.firstName as Student, EV.[date] as DATE, D.grade as GRADE, Ev.comment as COMMENT
    from ExaminerEvaluateDefense EV inner join NonGUCianRegisterThesis NGRT on EV.thesisSerialNumber=NGRT.thesisSerialNumber
        inner join Thesis T on EV.thesisSerialNumber=T.serialNumber
        inner join NonGucianStudent NGS on NGRT.NonGUCianID = NGS.id
        inner join Supervisor S on NGRT.supervisor_id=S.id
        Inner join Defense D on EV.thesisSerialNumber =D.thesisSerialNumber AND ev.[date]=D.[date]
    where EV.examiner_id = @id
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[AddCommentsGrade]
    @ThesisSerialNo INT ,
    @DefenseDate Datetime ,
    @comments VARCHAR(300),
    @grade DECIMAL
AS
BEGIN
    UPDATE ExaminerEvaluateDefense
    SET comment = @comments
    
    WHERE thesisSerialNumber = @ThesisSerialNo AND date = @DefenseDate
    --EXECUTE ADDdefensegrade
    EXEC AddDefenseGrade @ThesisSerialNo, @DefenseDate, @grade
END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[ExaminerRegister]
    @name VARCHAR(50),
    @email VARCHAR(50),
    @password VARCHAR(50),
    @fieldOfWOrk VARCHAR(50),
    @isNational BIT
AS
BEGIN
    INSERT INTO PostGradUser
        (email, password)
    VALUES
        (@email, @password);

    DECLARE @examiner_id INT = SCOPE_IDENTITY();
    INSERT INTO Examiner
        (id, name, fieldOfWork, isNational)
    VALUES
        (@examiner_id, @name, @fieldOfWork, @isNational);
        
END


GO




