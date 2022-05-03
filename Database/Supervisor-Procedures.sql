SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SupViewProfile]
    @supervisorID INT
AS
BEGIN
    SELECT Supervisor.id, Supervisor.firstName, Supervisor.lastName, Supervisor.faculty,PostGradUser.email,PostGradUser.[password]
    FROM Supervisor
    INNER JOIN PostGradUser ON PostGradUser.id = Supervisor.id
    WHERE sSupervisor.id = @supervisorID
END

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Proc [dbo].[SupervisorViewMyStudents]
@id int
As
Select s.firstname as SupervisorFirstname,s.lastname as SupervisorLastName,t.title as ThesisTitle,t.years as Years,gs.firstName as StudentFirstName,gs.lastName as StudentLastName,gs.id as StudentId,t.serialNumber as thesisSerialNumber
From Thesis t inner join GUCianRegisterThesis sr on t.serialNumber=sr.thesisSerialNumber
inner join Supervisor s on s.id=sr.supervisor_id inner join GucianStudent gs on sr.GUCianID=gs.id
where s.id = @id
union
Select s.firstname as SupervisorFirstname,s.lastname as SupervisorLastName,t.title as ThesisTitle,t.years as Years,gs.firstName as StudentFirstName,gs.lastName as StudentLastName,gs.id as StudentId,t.serialNumber as thesisSerialNumber
From Thesis t inner join NonGUCianRegisterThesis sr on t.serialNumber=sr.thesisSerialNumber
inner join Supervisor s on s.id=sr.supervisor_id inner join NonGucianStudent gs on sr.nongucianID=gs.id
where s.id = @id
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

create proc [dbo].[supervisorListProgressReport]
@studentId int
as
select GS.firstName as firstName,Gs.lastName as lastName, GPR.progressReportNumber as progressReportNumber, GPR.date as date, GPR.description,
GPR.evaluation as evaluation,GPR.state, GPR.thesisSerialNumber, T.title as ThesisTitle
from GUCianProgressReport GPR inner join GucianStudent GS on GPR.student_id=GS.id inner join thesis T on T.serialNumber=GPR.thesisSerialNumber where GPR.student_id=@studentId
UNION
select NGS.firstName as firstName, NGS.lastName as lastName, NGPR.progressReportNumber as progressReportNumber, NGPR.date as date, NGPR.description,
NGPR.evaluation as evaluation, NGPR.state, NGPR.thesisSerialNumber, T.title as ThesisTitle
from NonGUCianProgressReport NGPR inner join NonGucianStudent NGS on NGPR.student_id=NGS.id inner join thesis T on T.serialNumber=NGPR.thesisSerialNumber where NGPR.student_id=@studentId
GO


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[getExaminers]
as 
select E.id as examinerId,E.name as examinerName from Examiner E
GO


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[SupervisorAddDefense]
@thesisSerialNumber int,@examinerId int,@defenseDate date,@defenseLocation varchar(50),@comment varchar(300)
as
insert into Defense values(@thesisSerialNumber,@defenseDate,@defenseLocation,null)
insert into ExaminerEvaluateDefense values(@DefenseDate,@ThesisSerialNumber,@examinerId,@comment)
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
create proc [dbo].[SupervisorEvaluateReport]
    @studentId int,
    @progressReportNumber int,
    @grade int,
    @success bit output
as
set @success=0
if exists(select *
from GUCianProgressReport
where @studentId=student_id and @progressReportNumber=progressReportNumber)
begin
    update GUCianProgressReport set evaluation=@grade where @studentId=student_id and @progressReportNumber=progressReportNumber
    set @success=1
end
else
if exists(select *
from nonGUCianProgressReport
where @studentId=student_id and @progressReportNumber=progressReportNumber)
begin
    update nonGUCianProgressReport set evaluation=@grade where @studentId=student_id and @progressReportNumber=progressReportNumber
    set @success=1
end
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

create proc [dbo].[viewAllProgressReports]
as
select GPR.student_Id as studentId,GPR.progressReportNumber,GPR.date,GS.firstName,GS.lastName from GUCianProgressReport GPR inner join GucianStudent GS on GPR.student_id=GS.id where GPR.supervisor_id is null
Union
select NGPR.student_Id as studentId,NGPR.progressReportNumber,NGPR.date,NGS.firstName,NGS.lastName from NonGUCianProgressReport NGPR inner join NonGucianStudent NGS on NGPR.student_id=NGS.id where NGPR.supervisor_id is null
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[SupervisorChooseProgressReport]
    @studentId int,
    @progressReportNumber int,
    @supervisorId int,
    @success bit output
as
if exists(select *
from GUCianProgressReport
where @studentId=student_id and @progressReportNumber=progressReportNumber)
begin
    set @success =1
    update GUCianProgressReport set supervisor_id = @supervisorId where student_id=@studentId and @progressReportNumber=progressReportNumber
end
else
set @success=0
if exists(select *
from nonGUCianProgressReport
where @studentId=student_id and @progressReportNumber=progressReportNumber)
begin
    update NonGUCianProgressReport set supervisor_id = @supervisorId where student_id=@studentId and @progressReportNumber=progressReportNumber
    set @success = 1
end
GO


