create table kettle_execution_log
(
	fireId varchar(100) primary key,
	jobName varchar(500),
	startTime timestamp,
	endTime timestamp,
	execMethod varchar(100),
	status varchar(50),
	executionConfiguration text,
	executionLog text
);