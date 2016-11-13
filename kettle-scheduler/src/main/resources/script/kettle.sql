-- Repository creation/upgrade DDL: 
--
-- Nothing was created nor modified in the target repository database.
-- Hit the OK button to execute the generated SQL or Close to reject the changes.
-- Please note that it is possible to change/edit the generated SQL before execution.
--
CREATE TABLE R_REPOSITORY_LOG
(
  ID_REPOSITORY_LOG BIGINT NOT NULL PRIMARY KEY
, REP_VERSION VARCHAR(255)
, LOG_DATE DATETIME
, LOG_USER VARCHAR(255)
, OPERATION_DESC MEDIUMTEXT
)
;

CREATE TABLE R_VERSION
(
  ID_VERSION BIGINT NOT NULL PRIMARY KEY
, MAJOR_VERSION INT
, MINOR_VERSION INT
, UPGRADE_DATE DATETIME
, IS_UPGRADE CHAR(1)
)
;

INSERT INTO R_VERSION(ID_VERSION, MAJOR_VERSION, MINOR_VERSION, UPGRADE_DATE, IS_UPGRADE) VALUES (1,5,0,'2016/11/12 22:16:00.338','N');

CREATE TABLE R_DATABASE_TYPE
(
  ID_DATABASE_TYPE BIGINT NOT NULL PRIMARY KEY
, CODE VARCHAR(255)
, DESCRIPTION VARCHAR(255)
)
;

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (1,'ORACLERDB','Oracle RDB');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (2,'INFINIDB','Calpont InfiniDB');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (3,'INFOBRIGHT','Infobright');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (4,'KettleThin','Pentaho Data Services');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (5,'PALO','Palo MOLAP Server');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (6,'GENERIC','Generic database');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (7,'AS/400','AS/400');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (8,'SYBASEIQ','SybaseIQ');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (9,'HIVE2','Hadoop Hive 2');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (10,'SQLITE','SQLite');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (11,'DERBY','Apache Derby');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (12,'INFORMIX','Informix');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (13,'INGRES','Ingres');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (14,'HIVE','Hadoop Hive');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (15,'IMPALASIMBA','Cloudera Impala');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (16,'REMEDY-AR-SYSTEM','Remedy Action Request System');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (17,'POSTGRESQL','PostgreSQL');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (18,'SAPR3','SAP ERP System');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (19,'REDSHIFT','Redshift');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (20,'CACHE','Intersystems Cache');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (21,'MSSQL','MS SQL Server');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (22,'TERADATA','Teradata');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (23,'DB2','IBM DB2');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (24,'SQLBASE','Gupta SQL Base');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (25,'MYSQL','MySQL');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (26,'FIREBIRD','Firebird SQL');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (27,'HYPERSONIC','Hypersonic');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (28,'MSACCESS','MS Access');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (29,'KINGBASEES','KingbaseES');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (30,'INTERBASE','Borland Interbase');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (31,'VERTICA5','Vertica 5+');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (32,'MSSQLNATIVE','MS SQL Server (Native)');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (33,'EXASOL4','Exasol 4');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (34,'EXTENDB','ExtenDB');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (35,'OpenERPDatabaseMeta','OpenERP Server');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (36,'UNIVERSE','UniVerse database');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (37,'NEOVIEW','Neoview');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (38,'LucidDB','LucidDB');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (39,'SAPDB','MaxDB (SAP DB)');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (40,'VERTICA','Vertica');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (41,'DBASE','dBase III, IV or 5');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (42,'H2','H2');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (43,'VECTORWISE','Ingres VectorWise');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (44,'SYBASE','Sybase');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (45,'ORACLE','Oracle');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (46,'MONDRIAN','Native Mondrian');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (47,'NETEZZA','Netezza');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (48,'IMPALA','Impala');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (49,'GREENPLUM','Greenplum');

INSERT INTO R_DATABASE_TYPE(ID_DATABASE_TYPE, CODE, DESCRIPTION) VALUES (50,'MONETDB','MonetDB');

CREATE TABLE R_DATABASE_CONTYPE
(
  ID_DATABASE_CONTYPE BIGINT NOT NULL PRIMARY KEY
, CODE VARCHAR(255)
, DESCRIPTION VARCHAR(255)
)
;

INSERT INTO R_DATABASE_CONTYPE(ID_DATABASE_CONTYPE, CODE, DESCRIPTION) VALUES (1,'Native','Native (JDBC)');

INSERT INTO R_DATABASE_CONTYPE(ID_DATABASE_CONTYPE, CODE, DESCRIPTION) VALUES (2,'ODBC','ODBC');

INSERT INTO R_DATABASE_CONTYPE(ID_DATABASE_CONTYPE, CODE, DESCRIPTION) VALUES (3,'OCI','OCI');

INSERT INTO R_DATABASE_CONTYPE(ID_DATABASE_CONTYPE, CODE, DESCRIPTION) VALUES (4,'Plugin','Plugin specific access method');

INSERT INTO R_DATABASE_CONTYPE(ID_DATABASE_CONTYPE, CODE, DESCRIPTION) VALUES (5,'JNDI','JNDI');

INSERT INTO R_DATABASE_CONTYPE(ID_DATABASE_CONTYPE, CODE, DESCRIPTION) VALUES (6,',','Custom');

CREATE TABLE R_NOTE
(
  ID_NOTE BIGINT NOT NULL PRIMARY KEY
, VALUE_STR MEDIUMTEXT
, GUI_LOCATION_X INT
, GUI_LOCATION_Y INT
, GUI_LOCATION_WIDTH INT
, GUI_LOCATION_HEIGHT INT
, FONT_NAME MEDIUMTEXT
, FONT_SIZE INT
, FONT_BOLD CHAR(1)
, FONT_ITALIC CHAR(1)
, FONT_COLOR_RED INT
, FONT_COLOR_GREEN INT
, FONT_COLOR_BLUE INT
, FONT_BACK_GROUND_COLOR_RED INT
, FONT_BACK_GROUND_COLOR_GREEN INT
, FONT_BACK_GROUND_COLOR_BLUE INT
, FONT_BORDER_COLOR_RED INT
, FONT_BORDER_COLOR_GREEN INT
, FONT_BORDER_COLOR_BLUE INT
, DRAW_SHADOW CHAR(1)
)
;

CREATE TABLE R_DATABASE
(
  ID_DATABASE BIGINT NOT NULL PRIMARY KEY
, NAME VARCHAR(255)
, ID_DATABASE_TYPE INT
, ID_DATABASE_CONTYPE INT
, HOST_NAME VARCHAR(255)
, DATABASE_NAME MEDIUMTEXT
, PORT INT
, USERNAME VARCHAR(255)
, PASSWORD VARCHAR(255)
, SERVERNAME VARCHAR(255)
, DATA_TBS VARCHAR(255)
, INDEX_TBS VARCHAR(255)
)
;

CREATE TABLE R_DATABASE_ATTRIBUTE
(
  ID_DATABASE_ATTRIBUTE BIGINT NOT NULL PRIMARY KEY
, ID_DATABASE INT
, CODE VARCHAR(255)
, VALUE_STR MEDIUMTEXT
)
;

CREATE UNIQUE INDEX IDX_RDAT ON R_DATABASE_ATTRIBUTE(ID_DATABASE, CODE)
;

CREATE TABLE R_DIRECTORY
(
  ID_DIRECTORY BIGINT NOT NULL PRIMARY KEY
, ID_DIRECTORY_PARENT INT
, DIRECTORY_NAME VARCHAR(255)
)
;

CREATE UNIQUE INDEX IDX_RDIR ON R_DIRECTORY(ID_DIRECTORY_PARENT, DIRECTORY_NAME)
;

CREATE TABLE R_TRANSFORMATION
(
  ID_TRANSFORMATION BIGINT NOT NULL PRIMARY KEY
, ID_DIRECTORY INT
, NAME VARCHAR(255)
, DESCRIPTION MEDIUMTEXT
, EXTENDED_DESCRIPTION MEDIUMTEXT
, TRANS_VERSION VARCHAR(255)
, TRANS_STATUS INT
, ID_STEP_READ INT
, ID_STEP_WRITE INT
, ID_STEP_INPUT INT
, ID_STEP_OUTPUT INT
, ID_STEP_UPDATE INT
, ID_DATABASE_LOG INT
, TABLE_NAME_LOG VARCHAR(255)
, USE_BATCHID CHAR(1)
, USE_LOGFIELD CHAR(1)
, ID_DATABASE_MAXDATE INT
, TABLE_NAME_MAXDATE VARCHAR(255)
, FIELD_NAME_MAXDATE VARCHAR(255)
, OFFSET_MAXDATE DOUBLE
, DIFF_MAXDATE DOUBLE
, CREATED_USER VARCHAR(255)
, CREATED_DATE DATETIME
, MODIFIED_USER VARCHAR(255)
, MODIFIED_DATE DATETIME
, SIZE_ROWSET INT
)
;

CREATE TABLE R_TRANS_ATTRIBUTE
(
  ID_TRANS_ATTRIBUTE BIGINT NOT NULL PRIMARY KEY
, ID_TRANSFORMATION INT
, NR INT
, CODE VARCHAR(255)
, VALUE_NUM BIGINT
, VALUE_STR MEDIUMTEXT
)
;

CREATE UNIQUE INDEX IDX_TATT ON R_TRANS_ATTRIBUTE(ID_TRANSFORMATION, CODE, NR)
;

CREATE TABLE R_JOB_ATTRIBUTE
(
  ID_JOB_ATTRIBUTE BIGINT NOT NULL PRIMARY KEY
, ID_JOB INT
, NR INT
, CODE VARCHAR(255)
, VALUE_NUM BIGINT
, VALUE_STR MEDIUMTEXT
)
;

CREATE UNIQUE INDEX IDX_JATT ON R_JOB_ATTRIBUTE(ID_JOB, CODE, NR)
;

CREATE TABLE R_DEPENDENCY
(
  ID_DEPENDENCY BIGINT NOT NULL PRIMARY KEY
, ID_TRANSFORMATION INT
, ID_DATABASE INT
, TABLE_NAME VARCHAR(255)
, FIELD_NAME VARCHAR(255)
)
;

CREATE TABLE R_PARTITION_SCHEMA
(
  ID_PARTITION_SCHEMA BIGINT NOT NULL PRIMARY KEY
, NAME VARCHAR(255)
, DYNAMIC_DEFINITION CHAR(1)
, PARTITIONS_PER_SLAVE VARCHAR(255)
)
;

CREATE TABLE R_PARTITION
(
  ID_PARTITION BIGINT NOT NULL PRIMARY KEY
, ID_PARTITION_SCHEMA INT
, PARTITION_ID VARCHAR(255)
)
;

CREATE TABLE R_TRANS_PARTITION_SCHEMA
(
  ID_TRANS_PARTITION_SCHEMA BIGINT NOT NULL PRIMARY KEY
, ID_TRANSFORMATION INT
, ID_PARTITION_SCHEMA INT
)
;

CREATE TABLE R_CLUSTER
(
  ID_CLUSTER BIGINT NOT NULL PRIMARY KEY
, NAME VARCHAR(255)
, BASE_PORT VARCHAR(255)
, SOCKETS_BUFFER_SIZE VARCHAR(255)
, SOCKETS_FLUSH_INTERVAL VARCHAR(255)
, SOCKETS_COMPRESSED CHAR(1)
, DYNAMIC_CLUSTER CHAR(1)
)
;

CREATE TABLE R_SLAVE
(
  ID_SLAVE BIGINT NOT NULL PRIMARY KEY
, NAME VARCHAR(255)
, HOST_NAME VARCHAR(255)
, PORT VARCHAR(255)
, WEB_APP_NAME VARCHAR(255)
, USERNAME VARCHAR(255)
, PASSWORD VARCHAR(255)
, PROXY_HOST_NAME VARCHAR(255)
, PROXY_PORT VARCHAR(255)
, NON_PROXY_HOSTS VARCHAR(255)
, MASTER CHAR(1)
)
;

CREATE TABLE R_CLUSTER_SLAVE
(
  ID_CLUSTER_SLAVE BIGINT NOT NULL PRIMARY KEY
, ID_CLUSTER INT
, ID_SLAVE INT
)
;

CREATE TABLE R_TRANS_SLAVE
(
  ID_TRANS_SLAVE BIGINT NOT NULL PRIMARY KEY
, ID_TRANSFORMATION INT
, ID_SLAVE INT
)
;

CREATE TABLE R_TRANS_CLUSTER
(
  ID_TRANS_CLUSTER BIGINT NOT NULL PRIMARY KEY
, ID_TRANSFORMATION INT
, ID_CLUSTER INT
)
;

CREATE TABLE R_TRANS_HOP
(
  ID_TRANS_HOP BIGINT NOT NULL PRIMARY KEY
, ID_TRANSFORMATION INT
, ID_STEP_FROM INT
, ID_STEP_TO INT
, ENABLED CHAR(1)
)
;

CREATE TABLE R_TRANS_STEP_CONDITION
(
  ID_TRANSFORMATION INT
, ID_STEP INT
, ID_CONDITION INT
)
;

CREATE TABLE R_CONDITION
(
  ID_CONDITION BIGINT NOT NULL PRIMARY KEY
, ID_CONDITION_PARENT INT
, NEGATED CHAR(1)
, OPERATOR VARCHAR(255)
, LEFT_NAME VARCHAR(255)
, CONDITION_FUNCTION VARCHAR(255)
, RIGHT_NAME VARCHAR(255)
, ID_VALUE_RIGHT INT
)
;

CREATE TABLE R_VALUE
(
  ID_VALUE BIGINT NOT NULL PRIMARY KEY
, NAME VARCHAR(255)
, VALUE_TYPE VARCHAR(255)
, VALUE_STR VARCHAR(255)
, IS_NULL CHAR(1)
)
;

CREATE TABLE R_STEP_TYPE
(
  ID_STEP_TYPE BIGINT NOT NULL PRIMARY KEY
, CODE VARCHAR(255)
, DESCRIPTION VARCHAR(255)
, HELPTEXT VARCHAR(255)
)
;

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (1,'MappingInput','映射输入规范','指定一个映射的字段输入');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (2,'SystemInfo','获取系统信息','获取系统信息，例如时间、日期.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (3,'OpenERPObjectOutputImport','OpenERP Object Output','Writes data into OpenERP objects using the object import procedure');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (4,'SASInput','SAS 输入','This step reads files in sas7bdat (SAS) native format');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (5,'GPBulkLoader','Greenplum Bulk Loader','Greenplum Bulk Loader');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (6,'MergeJoin','记录集连接','Joins two streams on a given key and outputs a joined set. The input streams must be sorted on the join key');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (7,'ExecSQLRow','执行SQL脚本(字段流替换)','Execute SQL script extracted from a field\ncreated in a previous step.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (8,'TableExists','检查表是否存在','Check if a table exists on a specified connection');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (9,'GetFileNames','获取文件名','Get file names from the operating system and send them to the next step.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (10,'SocketWriter','Socket 写','Socket writer.  A socket server that can send rows of data to a socket reader.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (11,'Injector','记录注射','Injector step to allow to inject rows into the transformation through the java API');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (12,'SingleThreader','Single Threader','Executes a transformation snippet in a single thread.  You need a standard mapping or a transformation with an Injector step where data from the parent transformation will arive in blocks.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (13,'MailValidator','检验邮件地址','Check if an email address is valid.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (14,'AutoDoc','自动文档输出','This step automatically generates documentation based on input in the form of a list of transformations and jobs');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (15,'PropertyOutput','配置文件输出','Write data to properties file');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (16,'UniqueRowsByHashSet','唯一行 (哈希值)','Remove double rows and leave only unique occurrences by using a HashSet.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (17,'CheckSum','增加校验列','Add a checksum column for each input row');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (18,'FilesFromResult','从结果获取文件','This step allows you to read filenames used or generated in a previous entry in a job.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (19,'OraBulkLoader','Oracle 批量加载','Use Oracle Bulk Loader to load data');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (20,'GetTableNames','获取表名','Get table names from database connection and send them to the next step');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (21,'SocketReader','Socket 读','Socket reader.  A socket client that connects to a server (Socket Writer step).');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (22,'DataGrid','自定义常量数据','Enter rows of static data in a grid, usually for testing, reference or demo purpose');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (23,'HadoopFileOutputPlugin','Hadoop File Output','Create files in an HDFS location ');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (24,'XBaseInput','XBase输入','从一个XBase类型的文件(DBF)读取记录');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (25,'SyslogMessage','发送信息至Syslog','Send message to Syslog server');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (26,'ExcelInput','Excel输入','从一个微软的Excel文件里读取数据. 兼容Excel 95, 97 and 2000.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (27,'SapInput','SAP 输入','Read data from SAP ERP, optionally with parameters');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (28,'InfobrightOutput','Infobright 批量加载','Load data to an Infobright database table');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (29,'CassandraInput','Cassandra Input','Reads data from a Cassandra table');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (30,'SelectValues','字段选择','选择或移除记录里的字。{0}此外，可以设置字段的元数据: 类型, 长度和精度.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (31,'MongoDbOutput','MongoDB Output','Writes to a Mongo DB collection');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (32,'MonetDBAgileMart','MonetDB Agile Mart','Load data into MonetDB for Agile BI use cases');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (33,'ChangeFileEncoding','改变文件编码','Change file encoding and create a new file');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (34,'Script','Script','Calculate values by scripting in Ruby, Python, Groovy, JavaScript, ... (JSR-223)');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (35,'PrioritizeStreams','数据流优先级排序','Prioritize streams in an order way.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (36,'TextFileOutput','文本文件输出','写记录到一个文本文件.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (37,'FixedInput','固定宽度文件输入','Fixed file input');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (38,'CouchDbInput','CouchDb Input','Reads from a Couch DB view');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (39,'XSDValidator','使用 XSD 检验 XML 文件','Validate XML source (files or streams) against XML Schema Definition.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (40,'XMLOutput','XML输出','写数据到一个XML文件');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (41,'HTTP','HTTP client','Call a web service over HTTP by supplying a base URL by allowing parameters to be set dynamically');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (42,'Unique','去除重复记录','去除重复的记录行，保持记录唯一{0}这个仅仅基于一个已经排好序的输入.{1}如果输入没有排序, 仅仅两个连续的记录行被正确处理.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (43,'PGPDecryptStream','PGP Decrypt stream','Decrypt data stream with PGP');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (44,'SortedMerge','排序合并','Sorted Merge');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (45,'OpenERPObjectInput','OpenERP Object Input','Reads data from OpenERP objects');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (46,'StringCut','剪切字符串','Strings cut (substring).');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (47,'SampleRows','样本行','Filter rows based on the line number.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (48,'ExecProcess','启动一个进程','Execute a process and return the result');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (49,'XMLInputStream','XML 文件输入 (StAX解析)','This step is capable of processing very large and complex XML files very fast.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (50,'StreamLookup','流查询','从转换中的其它流里查询值.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (51,'Sequence','增加序列','从序列获取下一个值');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (52,'YamlInput','Yaml 输入','Read YAML source (file or stream) parse them and convert them to rows and writes these to one or more output. ');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (53,'TableInput','表输入','从数据库表里读取信息.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (54,'SetSessionVariableStep','Set session variables','Set session variables in the current user session.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (55,'RowsToResult','复制记录到结果','使用这个步骤把记录写到正在执行的任务.{0}信息将会被传递给同一个任务里的下一个条目.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (56,'JsonInput','Json 输入','Extract relevant portions out of JSON structures (file or incoming field) and output rows');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (57,'SymmetricCryptoTrans','对称加密','Encrypt or decrypt a string using symmetric encryption.\nAvailable algorithms are DES, AES, TripleDES.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (58,'SSTableOutput','SSTable Output','Writes to a filesystem directory as a Cassandra SSTable');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (59,'SalesforceUpdate','Salesforce Update','Update records in Salesforce module.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (60,'MetaInject','ETL元数据注入','This step allows you to inject metadata into an existing transformation prior to execution.  This allows for the creation of dynamic and highly flexible data integration solutions.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (61,'MondrianInput','Mondrian 输入','Execute and retrieve data using an MDX query against a Pentaho Analyses OLAP server (Mondrian)');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (62,'RandomValue','生成随机数','Generate random value');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (63,'PGPEncryptStream','PGP Encrypt stream','Encrypt data stream with PGP');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (64,'LDAPOutput','LDAP 输出','Perform Insert, upsert, update, add or delete operations on records based on their DN (Distinguished  Name).');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (65,'TextFileInput','文本文件输入','从一个文本文件（几种格式）里读取数据{0}这些数据可以被传递到下一个步骤里...');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (66,'HBaseRowDecoder','HBase Row Decoder','Decodes an incoming key and HBase result object according to a mapping ');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (67,'Update','更新','基于关键字更新记录到数据库');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (68,'SwitchCase','Switch / Case','Switch a row to a certain target step based on the case value in a field.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (69,'SFTPPut','SFTP Put','Upload a file or a stream file to remote host via SFTP');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (70,'HBaseOutput','HBase Output','Writes data to an HBase table according to a mapping');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (71,'HBaseInput','HBase Input','Reads data from a HBase table according to a mapping ');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (72,'ValueMapper','值映射','Maps values of a certain field from one value to another');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (73,'GetVariable','获取变量','Determine the values of certain (environment or Kettle) variables and put them in field values.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (74,'DynamicSQLRow','执行Dynamic SQL','Execute dynamic SQL statement build in a previous field');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (75,'TypeExitExcelWriterStep','Microsoft Excel 输出','Writes or appends data to an Excel file');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (76,'AvroInput','Avro Input','Reads data from an Avro file');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (77,'MergeRows','合并记录','合并两个数据流, 并根据某个关键字排序.  这两个数据流被比较，以标识相等的、变更的、删除的和新建的记录.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (78,'PaloDimInput','Palo Dim Input','Reads data from a defined Palo Dimension');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (79,'Rest','REST Client','Consume RESTfull services.\nREpresentational State Transfer (REST) is a key design idiom that embraces a stateless client-server\narchitecture in which the web services are viewed as resources and can be identified by their URLs');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (80,'NumberRange','数值范围','Create ranges based on numeric field');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (81,'Mapping','映射 (子转换)','运行一个映射 (子转换), 使用MappingInput和MappingOutput来指定接口的字段');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (82,'ExcelOutput','Excel输出','Stores records into an Excel (XLS) document with formatting information.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (83,'AnalyticQuery','分析查询','Execute analytic queries over a sorted dataset (LEAD/LAG/FIRST/LAST)');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (84,'Mail','发送邮件','Send eMail.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (85,'ProcessFiles','处理文件','Process one file per row (copy or move or delete).\nThis step only accept filename in input.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (86,'ColumnExists','检查表里的列是否存在','Check if a column exists in a table on a specified connection.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (87,'GPLoad','Greenplum Load','Greenplum Load');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (88,'RegexEval','正则表达式','Regular expression Evaluation\nThis step uses a regular expression to evaluate a field. It can also extract new fields out of an existing field with capturing groups.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (89,'FuzzyMatch','模糊匹配','Finding approximate matches to a string using matching algorithms.\nRead a field from a main stream and output approximative value from lookup stream.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (90,'SplitFieldToRows3','列拆分为多行','Splits a single string field by delimiter and creates a new row for each split term');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (91,'ReplaceString','字符串替换','Replace all occurences a word in a string with another word.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (92,'TableAgileMart','Table Agile Mart','Load data into a table for Agile BI use cases');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (93,'MemoryGroupBy','在内存中分组','Builds aggregates in a group by fashion.\nThis step doesn\'t require sorted input.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (94,'WriteToLog','写日志','Write data to log');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (95,'IfNull','替换NULL值','Sets a field value to a constant if it is null.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (96,'TeraFast','Teradata Fastload 批量加载','The Teradata Fastload Bulk loader');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (97,'FilterRows','过滤记录','使用简单的相等来过滤记录');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (98,'GetSlaveSequence','Get ID from slave server','Retrieves unique IDs in blocks from a slave server.  The referenced sequence needs to be configured on the slave server in the XML configuration file.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (99,'GetRepositoryNames','获取资源库配置','Lists detailed information about transformations and/or jobs in a repository');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (100,'MongoDbInput','MongoDB Input','Reads from a Mongo DB collection');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (101,'Denormaliser','列转行','Denormalises rows by looking up key-value pairs and by assigning them to new fields in the输出 rows.{0}This method aggregates and needs the输入 rows to be sorted on the grouping fields');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (102,'PaloCellInput','Palo Cell Input','Reads data from a defined Palo Cube ');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (103,'XMLJoin','XML 连接','Joins a stream of XML-Tags into a target XML string');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (104,'Dummy','空操作 (什么也不做)','这个步骤类型什么都不作.{0} 当你想测试或拆分数据流的时候有用.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (105,'ZipFile','Zip 文件','Zip a file.\nFilename will be extracted from incoming stream.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (106,'SecretKeyGenerator','生成密钥','Generate secret key for algorithms such as DES, AES, TripleDES.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (107,'SetValueField','设置字段值','Set value of a field with another value field');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (108,'HL7Input','HL7 Input','Reads and parses HL7 messages and outputs a series of values from the messages');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (109,'Delay','延迟行','Output each input row after a delay');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (110,'S3FileOutputPlugin','S3 File Output','Create files in an S3 location');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (111,'OpenERPObjectDelete','OpenERP Object Delete','Deletes OpenERP objects');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (112,'UserDefinedJavaClass','Java 代码','This step allows you to program a step using Java code');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (113,'RssInput','RSS 输入','Read RSS feeds');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (114,'SQLFileOutput','SQL 文件输出','Output SQL INSERT statements to file');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (115,'DetectLastRow','识别流的最后一行','Last row will be marked');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (116,'OldTextFileInput','Old Text file input','从一个文本文件（几种格式）里读取数据{0}这些数据可以被传递到下一个步骤里...');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (117,'SetValueConstant','将字段值设置为常量','Set value of a field to a constant');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (118,'PGBulkLoader','PostgreSQL 批量加载','PostgreSQL Bulk Loader');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (119,'OlapInput','OLAP 输入','Execute and retrieve data using an MDX query against any XML/A OLAP datasource using olap4j');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (120,'InsertUpdate','插入 / 更新','基于关键字更新或插入记录到数据库.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (121,'CreditCardValidator','检验信用卡号码是否有效','The Credit card validator step will help you tell:\n(1) if a credit card number is valid (uses LUHN10 (MOD-10) algorithm)\n(2) which credit card vendor handles that number\n(VISA, MasterCard, Diners Club, EnRoute, American Express (AMEX),...)');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (122,'TransExecutor','Transformation Executor','This step executes a Pentaho Data Integration transformation, sets parameters and passes rows.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (123,'Calculator','计算器','通过执行简单的计算创建一个新字段');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (124,'JavaFilter','根据Java代码过滤记录','Filter rows using java code');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (125,'TypeExitEdi2XmlStep','Edi to XML','Converts Edi text to generic XML');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (126,'CloneRow','克隆行','Clone a row as many times as needed');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (127,'Normaliser','行转列','De-normalised information can be normalised using this step type.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (128,'DetectEmptyStream','检测空流','This step will output one empty row if input stream is empty\n(ie when input stream does not contain any row)');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (129,'LDAPInput','LDAP 输入','Read data from LDAP host');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (130,'TableOutput','表输出','写信息到一个数据库表');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (131,'FieldSplitter','拆分字段','当你想把一个字段拆分成多个时，使用这个类型.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (132,'MonetDBBulkLoader','MonetDB 批量加载','Load data into MonetDB by using their bulk load command in streaming mode.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (133,'CubeOutput','Cube输出','把数据写入一个cube');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (134,'Janino','利用Janino计算Java表达式','Calculate the result of a Java Expression using Janino');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (135,'SynchronizeAfterMerge','数据同步','This step perform insert/update/delete in one go based on the value of a field. ');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (136,'BlockUntilStepsFinish','阻塞数据直到步骤都完成','Block this step until selected steps finish.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (137,'JsonOutput','Json 输出','Create Json bloc and output it in a field ou a file.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (138,'SortRows','排序记录','基于字段值把记录排序(升序或降序)');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (139,'LucidDBStreamingLoader','LucidDB Streaming Loader','Load data into LucidDB by using Remote Rows UDX.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (140,'VectorWiseBulkLoader','Ingres VectorWise 批量加载','This step interfaces with the Ingres VectorWise Bulk Loader "COPY TABLE" command.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (141,'TableCompare','比较表','Compares 2 tables and gives back a list of differences');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (142,'PentahoReportingOutput','Pentaho 报表输出','Executes an existing report (PRPT)');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (143,'SSH','运行SSH命令','Run SSH commands and returns result.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (144,'S3CSVINPUT','S3 CSV Input','Is capable of reading CSV data stored on Amazon S3 in parallel');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (145,'TypeExitGoogleAnalyticsInputStep','Google Analytics','Fetches data from google analytics account');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (146,'Formula','公式','使用 Pentaho 的公式库来计算公式');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (147,'SetVariable','设置变量','Set environment variables based on a single input row.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (148,'EFileInput','E文件输入','!!');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (149,'CassandraOutput','Cassandra Output','Writes to a Cassandra table');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (150,'JoinRows','记录关联 (笛卡尔输出)','这个步骤的输出是输入流的笛卡尔的结果.{0} 输出结果的记录数是输入流记录之间的乘积.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (151,'DBJoin','数据库连接','使用数据流里的值作为参数执行一个数据库查询');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (152,'ReservoirSampling','数据采样','[Transform] Samples a fixed number of rows from the incoming stream');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (153,'RandomCCNumberGenerator','生成随机的信用卡号','Generate random valide (luhn check) credit card numbers');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (154,'MailInput','邮件信息输入','Read POP3/IMAP server and retrieve messages');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (155,'GetFilesRowsCount','获取文件行数','Returns rows count for text files.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (156,'LDIFInput','LDIF 输入','Read data from LDIF files');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (157,'DBLookup','数据库查询','使用字段值在数据库里查询值');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (158,'SimpleMapping','Simple Mapping (sub-transformation)','Run a mapping (sub-transformation), use MappingInput and MappingOutput to specify the fields interface.  This is the simplified version only allowing one input and one output data set.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (159,'WebServiceAvailable','检查web服务是否可用','Check if a webservice is available');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (160,'SalesforceDelete','Salesforce Delete','Delete records in Salesforce module.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (161,'WebServiceLookup','Web 服务查询','使用 Web 服务查询信息');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (162,'ClosureGenerator','Closure Generator','This step allows you to generates a closure table using parent-child relationships.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (163,'UnivariateStats','单变量统计','This step computes some simple stats based on a single input field');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (164,'VerticaBulkLoader','Vertica Bulk Loader','Bulk load data into a Vertica database table');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (165,'MySQLBulkLoader','MySQL 批量加载','MySQL bulk loader step, loading data over a named pipe (not available on MS Windows)');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (166,'RowGenerator','生成记录','产生一些空记录或相等的行.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (167,'GroupBy','分组','以分组的形式创建聚合.{0}这个仅仅在一个已经排好序的输入有效.{1}如果输入没有排序, 仅仅两个连续的记录行被正确处理.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (168,'HadoopFileInputPlugin','Hadoop File Input','Process files from an HDFS location');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (169,'Constant','增加常量','给记录增加一到多个常量');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (170,'StringOperations','字符串操作','Apply certain operations like trimming, padding and others to string value.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (171,'Validator','数据检验','Validates passing data based on a set of rules');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (172,'CombinationLookup','联合查询/更新','更新数据仓库里的一个junk维 {0} 可选的, 科研查询维里的信息.{1}junk维的主键是所有的字段.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (173,'PaloCellOutput','Palo Cell Output','Writes data to a defined Palo Cube');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (174,'EFileOutput','E文件输出','!!');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (175,'Delete','删除','基于关键字删除记录');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (176,'DummyStep','Example Step','This is a plugin example step');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (177,'NullIf','设置值为NULL','如果一个字段值等于某个固定值，那么把这个字段值设置成null');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (178,'SalesforceInput','Salesforce Input','Extract data from Salesforce');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (179,'CallEndpointStep','Call endpoint','Call an endpoint of the BA Server.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (180,'StepMetastructure','流的元数据','This is a step to read the metadata of the incoming stream.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (181,'Append','追加流','Append 2 streams in an ordered way');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (182,'RowsFromResult','从结果获取记录','这个允许你从同一个任务的前一个条目里读取记录.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (183,'DBProc','调用DB存储过程','通过调用数据库存储过程获得返回值.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (184,'Flattener','行扁平化','Flattens consequetive rows based on the order in which they appear in the输入 stream');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (185,'PropertyInput','配置文件输入','Read data (key, value) from properties files.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (186,'FilesToResult','复制文件到结果','This step allows you to set filenames in the result of this transformation.\nSubsequent job entries can then use this information.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (187,'ExecSQL','执行SQL脚本','执行一个SQL脚本, 另外，可以使用输入的记录作为参数');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (188,'getXMLData','XML 文件输入','Get data from XML file by using XPath.\n This step also allows you to parse XML defined in a previous field.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (189,'DimensionLookup','维度查询/更新','在一个数据仓库里更新一个渐变维 {0} 或者在这个维里查询信息.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (190,'FieldsChangeSequence','根据字段值来改变序列','Add sequence depending of fields value change.\nEach time value of at least one field change, PDI will reset sequence. ');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (191,'FileLocked','检查文件是否已被锁定','Check if a file is locked by another process');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (192,'GetSubFolders','获取子目录名','Read a parent folder and return all subfolders');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (193,'SalesforceUpsert','Salesforce Upsert','Insert or update records in Salesforce module.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (194,'CsvInput','CSV文件输入','Simple CSV file input');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (195,'RssOutput','RSS 输出','Read RSS stream.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (196,'LoadFileInput','文件内容加载至内存','Load file content in memory');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (197,'AccessOutput','Access 输出','Stores records into an MS-Access database table.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (198,'AccessInput','Access 输入','Read data from a Microsoft Access file');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (199,'StepsMetrics','转换步骤信息统计','Return metrics for one or several steps');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (200,'MappingOutput','映射输出规范','指定一个映射的字段输出');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (201,'MultiwayMergeJoin','Multiway Merge Join','Multiway Merge Join');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (202,'AddXML','增加XML列','Encode several fields into an XML fragment');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (203,'ParallelGzipCsvInput','GZIP CSV Input','Parallel GZIP CSV file input reader');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (204,'RuleExecutor','Rules Executor','Rules Executor Step');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (205,'RuleAccumulator','Rules Accumulator','Rules Accumulator Step');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (206,'SalesforceInsert','Salesforce Insert','Insert records in Salesforce module.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (207,'CubeInput','Cube 文件输入','从一个cube读取记录.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (208,'ScriptValueMod','JavaScript代码','This is a modified plugin for the Scripting Values with improved interface and performance.\nWritten & donated to open source by Martin Lange, Proconis : http://www.proconis.de');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (209,'Abort','中止','Abort a transformation');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (210,'XSLT','XSL 转换','Transform XML stream using XSL (eXtensible Stylesheet Language).');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (211,'TeraDataBulkLoader','Teradata TPT Bulk Loader','Teradata TPT bulkloader, using tbuild command');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (212,'ElasticSearchBulk','ElasticSearch Bulk Insert','Performs bulk inserts into ElasticSearch');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (213,'HTTPPOST','HTTP Post','Call a web service request over HTTP by supplying a base URL by allowing parameters to be set dynamically');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (214,'GetSessionVariableStep','Get session variables','Get session variables from the current user session.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (215,'HadoopEnterPlugin','MapReduce Input','Enter a Hadoop Mapper or Reducer transformation');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (216,'PaloDimOutput','Palo Dim Output','Writes data to defined Palo Dimension');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (217,'JobExecutor','执行作业','This step executes a Pentaho Data Integration job, sets parameters and passes rows.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (218,'FileExists','检查文件是否存在','Check if a file exists');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (219,'BlockingStep','阻塞数据','This step blocks until all incoming rows have been processed.  Subsequent steps only recieve the last input row to this step.');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (220,'ShapeFileReader','ESRI Shapefile Reader','Reads shape file data from an ESRI shape file and linked DBF file');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (221,'ConcatFields','Concat Fields','Concat fields together into a new field (similar to the Text File Output step)');

INSERT INTO R_STEP_TYPE(ID_STEP_TYPE, CODE, DESCRIPTION, HELPTEXT) VALUES (222,'HadoopExitPlugin','MapReduce Output','Exit a Hadoop Mapper or Reducer transformation ');

CREATE TABLE R_STEP
(
  ID_STEP BIGINT NOT NULL PRIMARY KEY
, ID_TRANSFORMATION INT
, NAME VARCHAR(255)
, DESCRIPTION MEDIUMTEXT
, ID_STEP_TYPE INT
, DISTRIBUTE CHAR(1)
, COPIES INT
, GUI_LOCATION_X INT
, GUI_LOCATION_Y INT
, GUI_DRAW CHAR(1)
, COPIES_STRING VARCHAR(255)
)
;

CREATE TABLE R_STEP_ATTRIBUTE
(
  ID_STEP_ATTRIBUTE BIGINT NOT NULL PRIMARY KEY
, ID_TRANSFORMATION INT
, ID_STEP INT
, NR INT
, CODE VARCHAR(255)
, VALUE_NUM BIGINT
, VALUE_STR MEDIUMTEXT
)
;

CREATE UNIQUE INDEX IDX_RSAT ON R_STEP_ATTRIBUTE(ID_STEP, CODE, NR)
;

CREATE TABLE R_STEP_DATABASE
(
  ID_TRANSFORMATION INT
, ID_STEP INT
, ID_DATABASE INT
)
;

CREATE INDEX IDX_RSD1 ON R_STEP_DATABASE(ID_TRANSFORMATION)
;

CREATE INDEX IDX_RSD2 ON R_STEP_DATABASE(ID_DATABASE)
;

CREATE TABLE R_TRANS_NOTE
(
  ID_TRANSFORMATION INT
, ID_NOTE INT
)
;

CREATE TABLE R_LOGLEVEL
(
  ID_LOGLEVEL BIGINT NOT NULL PRIMARY KEY
, CODE VARCHAR(255)
, DESCRIPTION VARCHAR(255)
)
;

INSERT INTO R_LOGLEVEL(ID_LOGLEVEL, CODE, DESCRIPTION) VALUES (1,'Error','错误日志');

INSERT INTO R_LOGLEVEL(ID_LOGLEVEL, CODE, DESCRIPTION) VALUES (2,'Minimal','最小日志');

INSERT INTO R_LOGLEVEL(ID_LOGLEVEL, CODE, DESCRIPTION) VALUES (3,'Basic','基本日志');

INSERT INTO R_LOGLEVEL(ID_LOGLEVEL, CODE, DESCRIPTION) VALUES (4,'Detailed','详细日志');

INSERT INTO R_LOGLEVEL(ID_LOGLEVEL, CODE, DESCRIPTION) VALUES (5,'Debug','调试');

INSERT INTO R_LOGLEVEL(ID_LOGLEVEL, CODE, DESCRIPTION) VALUES (6,'Rowlevel','行级日志(非常详细)');

CREATE TABLE R_LOG
(
  ID_LOG BIGINT NOT NULL PRIMARY KEY
, NAME VARCHAR(255)
, ID_LOGLEVEL INT
, LOGTYPE VARCHAR(255)
, FILENAME VARCHAR(255)
, FILEEXTENTION VARCHAR(255)
, ADD_DATE CHAR(1)
, ADD_TIME CHAR(1)
, ID_DATABASE_LOG INT
, TABLE_NAME_LOG VARCHAR(255)
)
;

CREATE TABLE R_JOB
(
  ID_JOB BIGINT NOT NULL PRIMARY KEY
, ID_DIRECTORY INT
, NAME VARCHAR(255)
, DESCRIPTION MEDIUMTEXT
, EXTENDED_DESCRIPTION MEDIUMTEXT
, JOB_VERSION VARCHAR(255)
, JOB_STATUS INT
, ID_DATABASE_LOG INT
, TABLE_NAME_LOG VARCHAR(255)
, CREATED_USER VARCHAR(255)
, CREATED_DATE DATETIME
, MODIFIED_USER VARCHAR(255)
, MODIFIED_DATE DATETIME
, USE_BATCH_ID CHAR(1)
, PASS_BATCH_ID CHAR(1)
, USE_LOGFIELD CHAR(1)
, SHARED_FILE VARCHAR(255)
)
;

CREATE TABLE R_JOBENTRY_DATABASE
(
  ID_JOB INT
, ID_JOBENTRY INT
, ID_DATABASE INT
)
;

CREATE INDEX IDX_RJD1 ON R_JOBENTRY_DATABASE(ID_JOB)
;

CREATE INDEX IDX_RJD2 ON R_JOBENTRY_DATABASE(ID_DATABASE)
;

CREATE TABLE R_JOBENTRY_TYPE
(
  ID_JOBENTRY_TYPE BIGINT NOT NULL PRIMARY KEY
, CODE VARCHAR(255)
, DESCRIPTION VARCHAR(255)
)
;

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (1,'DELAY','等待');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (2,'HTTP','HTTP');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (3,'UNZIP','解压缩文件');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (4,'FILES_EXIST','检查多个文件是否存在');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (5,'HL7MLLPInput','HL7 MLLP Input');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (6,'GET_POP','POP 收信');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (7,'MAIL','发送邮件');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (8,'EMRJobExecutorPlugin','Amazon EMR Job Executor');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (9,'HadoopCopyFilesPlugin','Hadoop Copy Files');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (10,'WRITE_TO_FILE','写入文件');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (11,'EVAL_FILES_METRICS','计算文件大小或个数');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (12,'FILE_EXISTS','检查一个文件是否存在');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (13,'WAIT_FOR_SQL','等待SQL');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (14,'SFTP','SFTP 下载');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (15,'SET_VARIABLES','设置变量');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (16,'MS_ACCESS_BULK_LOAD','MS Access Bulk Load');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (17,'TRANS','转换');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (18,'XML_WELL_FORMED','检查 XML 文件格式');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (19,'SEND_NAGIOS_PASSIVE_CHECK','发送Nagios 被动检查');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (20,'SUCCESS','成功');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (21,'FTP_DELETE','FTP 删除');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (22,'SQL','SQL');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (23,'HiveJobExecutorPlugin','Amazon Hive Job Executor');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (24,'EVAL_TABLE_CONTENT','计算表中的记录数');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (25,'PALO_CUBE_CREATE','Palo Cube Create');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (26,'COPY_FILES','复制文件');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (27,'DELETE_FILE','删除一个文件');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (28,'MOVE_FILES','移动文件');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (29,'CONNECTED_TO_REPOSITORY','检查是否连接到资源库');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (30,'MSGBOX_INFO','显示消息对话框');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (31,'PALO_CUBE_DELETE','Palo Cube Delete');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (32,'FTPS_GET','FTPS 下载');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (33,'EXPORT_REPOSITORY','导出资源库到XML文件');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (34,'PGP_VERIFY_FILES','用PGP验证文件签名');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (35,'TELNET','远程登录一台主机');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (36,'ABORT','中止作业');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (37,'DELETE_RESULT_FILENAMES','从结果文件中删除文件');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (38,'CHECK_FILES_LOCKED','检查文件是否被锁');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (39,'DELETE_FOLDERS','删除目录');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (40,'FILE_COMPARE','比较文件');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (41,'HadoopJobExecutorPlugin','Hadoop Job Executor ');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (42,'SIMPLE_EVAL','检验字段的值');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (43,'WRITE_TO_LOG','写日志');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (44,'WAIT_FOR_FILE','等待文件');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (45,'TRUNCATE_TABLES','清空表');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (46,'CHECK_DB_CONNECTIONS','检查数据库连接');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (47,'OozieJobExecutor','Oozie Job Executor');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (48,'SparkSubmit','Spark Submit');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (49,'ZIP_FILE','Zip 压缩文件');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (50,'COPY_MOVE_RESULT_FILENAMES','复制/移动结果文件');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (51,'FTP_PUT','FTP 上传');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (52,'JOB','作业');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (53,'WEBSERVICE_AVAILABLE','检查web服务是否可用');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (54,'DummyJob','Example Job');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (55,'TALEND_JOB_EXEC','Talend 作业执行');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (56,'MSSQL_BULK_LOAD','SQLServer 批量加载');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (57,'FOLDER_IS_EMPTY','检查目录是否为空');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (58,'HadoopTransJobExecutorPlugin','Pentaho MapReduce');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (59,'HadoopPigScriptExecutorPlugin','Pig Script Executor');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (60,'MAIL_VALIDATOR','邮件验证');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (61,'HL7MLLPAcknowledge','HL7 MLLP Acknowledge');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (62,'SqoopImport','Sqoop Import');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (63,'CREATE_FOLDER','创建一个目录');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (64,'SHELL','Shell');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (65,'DELETE_FILES','删除多个文件');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (66,'ADD_RESULT_FILENAMES','添加文件到结果文件中');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (67,'XSD_VALIDATOR','XSD 验证器');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (68,'PING','Ping 一台主机');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (69,'FTP','FTP 下载');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (70,'MYSQL_BULK_FILE','从 Mysql 批量导出到文件');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (71,'XSLT','XSL 转换');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (72,'SPECIAL','特殊作业项');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (73,'EVAL','使用 JavaScript 脚本验证');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (74,'COLUMNS_EXIST','检查列是否存在');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (75,'DOS_UNIX_CONVERTER','DOS和UNIX之间的文本转换');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (76,'CREATE_FILE','创建文件');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (77,'SqoopExport','Sqoop Export');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (78,'PGP_DECRYPT_FILES','用PGP解密文件');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (79,'SYSLOG','用 Syslog 发送信息');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (80,'FOLDERS_COMPARE','比较目录');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (81,'FTPS_PUT','FTPS 上传');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (82,'SFTPPUT','SFTP 上传');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (83,'DTD_VALIDATOR','DTD 验证');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (84,'SNMP_TRAP','发送 SNMP 自陷');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (85,'TABLE_EXISTS','检查表是否存在');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (86,'MYSQL_BULK_LOAD','Mysql 批量加载');

INSERT INTO R_JOBENTRY_TYPE(ID_JOBENTRY_TYPE, CODE, DESCRIPTION) VALUES (87,'PGP_ENCRYPT_FILES','用PGP加密文件');

CREATE TABLE R_JOBENTRY
(
  ID_JOBENTRY BIGINT NOT NULL PRIMARY KEY
, ID_JOB INT
, ID_JOBENTRY_TYPE INT
, NAME VARCHAR(255)
, DESCRIPTION MEDIUMTEXT
)
;

CREATE TABLE R_JOBENTRY_COPY
(
  ID_JOBENTRY_COPY BIGINT NOT NULL PRIMARY KEY
, ID_JOBENTRY INT
, ID_JOB INT
, ID_JOBENTRY_TYPE INT
, NR INT
, GUI_LOCATION_X INT
, GUI_LOCATION_Y INT
, GUI_DRAW CHAR(1)
, PARALLEL CHAR(1)
)
;

CREATE TABLE R_JOBENTRY_ATTRIBUTE
(
  ID_JOBENTRY_ATTRIBUTE BIGINT NOT NULL PRIMARY KEY
, ID_JOB INT
, ID_JOBENTRY INT
, NR INT
, CODE VARCHAR(255)
, VALUE_NUM DOUBLE
, VALUE_STR MEDIUMTEXT
)
;

CREATE UNIQUE INDEX IDX_RJEA ON R_JOBENTRY_ATTRIBUTE(ID_JOBENTRY_ATTRIBUTE, CODE, NR)
;

CREATE TABLE R_JOB_HOP
(
  ID_JOB_HOP BIGINT NOT NULL PRIMARY KEY
, ID_JOB INT
, ID_JOBENTRY_COPY_FROM INT
, ID_JOBENTRY_COPY_TO INT
, ENABLED CHAR(1)
, EVALUATION CHAR(1)
, UNCONDITIONAL CHAR(1)
)
;

CREATE TABLE R_JOB_NOTE
(
  ID_JOB INT
, ID_NOTE INT
)
;

CREATE TABLE R_TRANS_LOCK
(
  ID_TRANS_LOCK BIGINT NOT NULL PRIMARY KEY
, ID_TRANSFORMATION INT
, ID_USER INT
, LOCK_MESSAGE MEDIUMTEXT
, LOCK_DATE DATETIME
)
;

CREATE TABLE R_JOB_LOCK
(
  ID_JOB_LOCK BIGINT NOT NULL PRIMARY KEY
, ID_JOB INT
, ID_USER INT
, LOCK_MESSAGE MEDIUMTEXT
, LOCK_DATE DATETIME
)
;

CREATE TABLE R_NAMESPACE
(
  ID_NAMESPACE BIGINT NOT NULL PRIMARY KEY
, NAME MEDIUMTEXT
)
;

CREATE TABLE R_ELEMENT_TYPE
(
  ID_ELEMENT_TYPE BIGINT NOT NULL PRIMARY KEY
, ID_NAMESPACE INT
, NAME MEDIUMTEXT
, DESCRIPTION MEDIUMTEXT
)
;

CREATE TABLE R_ELEMENT
(
  ID_ELEMENT BIGINT NOT NULL PRIMARY KEY
, ID_ELEMENT_TYPE INT
, NAME MEDIUMTEXT
)
;

CREATE TABLE R_ELEMENT_ATTRIBUTE
(
  ID_ELEMENT_ATTRIBUTE BIGINT NOT NULL PRIMARY KEY
, ID_ELEMENT INT
, ID_ELEMENT_ATTRIBUTE_PARENT INT
, ATTR_KEY VARCHAR(255)
, ATTR_VALUE MEDIUMTEXT
)
;

CREATE TABLE R_USER
(
  ID_USER BIGINT NOT NULL PRIMARY KEY
, LOGIN VARCHAR(255)
, PASSWORD VARCHAR(255)
, NAME VARCHAR(255)
, DESCRIPTION VARCHAR(255)
, ENABLED CHAR(1)
)
;

INSERT INTO R_USER(ID_USER, LOGIN, PASSWORD, NAME, DESCRIPTION, ENABLED) VALUES (1,'admin','2be98afc86aa7f2e4cb79ce71da9fa6d4','Administrator','User manager','Y');

INSERT INTO R_USER(ID_USER, LOGIN, PASSWORD, NAME, DESCRIPTION, ENABLED) VALUES (2,'guest','2be98afc86aa7f2e4cb79ce77cb97bcce','Guest account','Read-only guest account','Y');

