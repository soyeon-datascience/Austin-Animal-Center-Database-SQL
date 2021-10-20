-- Name: Soyeon Park, Meena Muthusubramanian
-- Email: soyeon.park@vanderbilt.edu, meena.muthusubramanian@vanderbilt.edu
-- Project 2

-- Database Creation
DROP DATABASE IF EXISTS austin_animal_center;
CREATE DATABASE austin_animal_center;
USE austin_animal_center;

/* The create table statement for the mega table */
DROP TABLE IF EXISTS in_out_mega;
CREATE TABLE in_out_mega (
	age_upon_outcome			VARCHAR(255),
    animal_id_outcome			CHAR(7),
    date_of_birth				DATE,
    outcome_subtype				VARCHAR(255),
    outcome_type				VARCHAR(255),
    sex_upon_outcome			VARCHAR(255),
    age_upon_outcome_days		INT UNSIGNED,
	age_upon_outcome_years		TINYINT UNSIGNED,
    age_upon_outcome_age_group	VARCHAR(255),
    outcome_datetime			DATETIME,
    outcome_month				TINYINT UNSIGNED,		
	outcome_year				SMALLINT UNSIGNED,
    outcome_monthyear			CHAR(7),
    outcome_weekday				VARCHAR(9),
    outcome_hour				TINYINT UNSIGNED,
    outcome_number				SMALLINT UNSIGNED,
    dob_year					SMALLINT UNSIGNED,		
    dob_month					TINYINT UNSIGNED,
    dob_monthyear				CHAR(7),
    age_upon_intake				VARCHAR(255),
    animal_id_intake			CHAR(7),
    animal_type					VARCHAR(255),
    breed						VARCHAR(255),
    color						VARCHAR(255),
    found_location				VARCHAR(255),
    intake_condition			VARCHAR(255),
    intake_type					VARCHAR(255),
    sex_upon_intake				VARCHAR(255),
    count						SMALLINT UNSIGNED,
    age_upon_intake_days		INT UNSIGNED,
    age_upon_intake_years		TINYINT UNSIGNED,
    age_upon_intake_age_group	VARCHAR(255),
    intake_datetime				DATETIME,
    intake_month				TINYINT UNSIGNED,	
    intake_year					SMALLINT UNSIGNED,
    intake_monthyear			CHAR(7),
    intake_weekday				VARCHAR(9),
    intake_hour					TINYINT UNSIGNED,
    intake_number				SMALLINT UNSIGNED,
    time_in_shelter				VARCHAR(255),
    time_in_shelter_days		VARCHAR(255)
) ENGINE = InnoDB;

/* Load raw data into the "in_out_mega" table created above */
LOAD DATA INFILE '/Users/audacious/Desktop/Sem02/DS5420_Data_Management_Systems/Project2/data/aac_intakes_outcomes.csv'
INTO TABLE in_out_mega
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

/* The create table statements to create the normalized tables */
DROP TABLE IF EXISTS animal_info;
CREATE TABLE animal_info (
	animal_id_intake 			CHAR(7),				
	animal_type					VARCHAR(255),
    breed						VARCHAR(255),
    color						VARCHAR(255),
    date_of_birth				DATE,
PRIMARY KEY (animal_id_intake)
) ENGINE = InnoDB;

DROP TABLE IF EXISTS intake;
CREATE TABLE intake (
	animal_id_intake 			CHAR(7),	
    intake_number				SMALLINT UNSIGNED,
    intake_datetime				DATETIME,
	intake_weekday				VARCHAR(9), /* The longest word among weekday words is "Wednesday", which consists of 9 letters */
    age_upon_intake_years		TINYINT UNSIGNED,
    age_upon_intake_days		INT UNSIGNED,
    sex_upon_intake				VARCHAR(255),
    intake_type					VARCHAR(255),
    intake_condition			VARCHAR(255),
    found_location				VARCHAR(255),
	PRIMARY KEY (animal_id_intake, intake_number),
	CONSTRAINT fk_animal_id_intake FOREIGN KEY (animal_id_intake)
		REFERENCES animal_info (animal_id_intake)
		ON DELETE CASCADE /* If the parent row is deleted, I want the child rows to be deleted as well */
		ON UPDATE CASCADE /* If the parent row changes, I want the child rows to be propagated. */
) ENGINE = InnoDB;

DROP TABLE IF EXISTS outcome;
CREATE TABLE outcome (
	animal_id_intake 			CHAR(7),	
    outcome_number				SMALLINT UNSIGNED,
    outcome_datetime			DATETIME,
	outcome_weekday				VARCHAR(9), /* The longest word among weekday words is "Wednesday", which consists of 9 letters */
    age_upon_outcome_years		TINYINT UNSIGNED,
    age_upon_outcome_days		INT UNSIGNED,
    sex_upon_outcome			VARCHAR(255),
    outcome_type				VARCHAR(255),
    outcome_subtype				VARCHAR(255),
    PRIMARY KEY (animal_id_intake, outcome_number),
    CONSTRAINT fk_animal_id_intake_outcome FOREIGN KEY (animal_id_intake)
		REFERENCES animal_info (animal_id_intake)
        ON DELETE CASCADE /* If the parent row is deleted, I want the child rows to be deleted as well */
        ON UPDATE CASCADE /* If the parent row changes, I want the child rows to be propagated. */
) ENGINE = InnoDB;

DROP TABLE IF EXISTS time_in_shelter;
CREATE TABLE time_in_shelter (
	animal_id_intake 			CHAR(7),	
    intake_number				SMALLINT UNSIGNED,
    time_in_shelter_days		FLOAT,
    PRIMARY KEY (animal_id_intake, intake_number),
    CONSTRAINT fk_animal_id_intake_number_time_in_shelter FOREIGN KEY (animal_id_intake, intake_number)
		REFERENCES intake (animal_id_intake, intake_number)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE = InnoDB;

/* The create table statement having unnessasary attributes that our team will not use */
DROP TABLE IF EXISTS no_use;
CREATE TABLE no_use (
	animal_id_outcome			CHAR(7),			/* The all values in "animal_id_outcome" are same as those in "animal_id_intake" */
    count						SMALLINT UNSIGNED,	/* The all values in "count" is the same as 1. */
    dob_monthyear				CHAR(7),			/* The 'date_of_birth' attribute already has this information */
	age_upon_intake_age_group	VARCHAR(255),		/* The 'age_upon_intake_years' attribute already has this information */ 
    age_upon_outcome_age_group	VARCHAR(255),		/* The 'age_upon_outcome_years' attribute already has this information */ 
    dob_year					SMALLINT UNSIGNED,	/* The 'date_of_birth' attribute already has this information */	
    dob_month					TINYINT UNSIGNED,	/* The 'date_of_birth' attribute already has this information */
    intake_monthyear			CHAR(7),			/* The 'intake_datetime' attribute already has this information */
    intake_year					SMALLINT UNSIGNED,	/* The 'intake_datetime' attribute already has this information */
    intake_month				TINYINT UNSIGNED,	/* The 'intake_datetime' attribute already has this information */	
    intake_hour					TINYINT UNSIGNED,	/* The 'intake_datetime' attribute already has this information */
    age_upon_intake				VARCHAR(255),		/* The 'age_upon_intake_years' attribute already has this information */ 
    outcome_monthyear			CHAR(7),			/* The 'outcome_datetime' attribute already has this information */
    outcome_year				SMALLINT UNSIGNED,	/* The 'outcome_datetime' attribute already has this information */
    outcome_month				TINYINT UNSIGNED,	/* The 'outcome_datetime' attribute already has this information */
    outcome_hour				TINYINT UNSIGNED,	/* The 'outcome_datetime' attribute already has this information */
    age_upon_outcome			VARCHAR(255),		/* The 'age_upon_outcome_years' attribute already has this information */ 
	time_in_shelter				VARCHAR(255)		/* The 'tiime_in_shelter_days' attribute already has this information */ 
) ENGINE = InnoDB;

/* The 3 tables below are for trigger function */ 
DROP TABLE IF EXISTS trigger_animal_info;
CREATE TABLE trigger_animal_info (
	animal_id					CHAR(7),
    animal_type_old				VARCHAR(255),
    animal_type_new				VARCHAR(255),
    breed_old					VARCHAR(255),
    breed_new					VARCHAR(255),
    color_old					VARCHAR(255),
    color_new					VARCHAR(255),
    date_of_birth_old			DATE,
    date_of_birth_new			DATE,
    date_changed				DATETIME
) ENGINE = InnoDB;  

DROP TABLE IF EXISTS trigger_intake;
CREATE TABLE trigger_intake (
	animal_id					CHAR(7),
    intake_number				SMALLINT,
    intake_datetime_old			DATETIME,
    intake_datetime_new			DATETIME,
    sex_upon_intake_old			VARCHAR(255),
    sex_upon_intake_new			VARCHAR(255),
    intake_type_old				VARCHAR(255),
    intake_type_new				VARCHAR(255),
    intake_condition_old		VARCHAR(255),
    intake_condition_new		VARCHAR(255),
    found_location_old			VARCHAR(255),
    found_location_new			VARCHAR(255),
    date_chaged					DATETIME
) ENGINE = InnoDB;  

DROP TABLE IF EXISTS trigger_outcome;
CREATE TABLE trigger_outcome (
	animal_id					CHAR(7),
    outcome_number				SMALLINT,
    outcome_datetime_old		DATETIME,
    outcome_datetime_new		DATETIME,
    sex_upon_outcome_old		VARCHAR(255),
    sex_upon_outcome_new		VARCHAR(255),
    outcome_type_old			VARCHAR(255),
    outcome_type_new			VARCHAR(255),
    outcome_subtype_old			VARCHAR(255),
    outcome_subtype_new			VARCHAR(255),
    date_chaged					DATETIME
) ENGINE = InnoDB;  





-- Data Insertion
/* The insert statements used to transfer the data from the original megatable to the new tables */
INSERT INTO animal_info
	(SELECT DISTINCT animal_id_intake, animal_type, breed, color, date_of_birth
	FROM in_out_mega);
    
/* Since the row below violates the rule of uniqueness of the primary key, we deleted it */
SET SQL_SAFE_UPDATES = 0;    
DELETE FROM in_out_mega
WHERE animal_id_outcome = "A672744" AND found_location = "Travis (TX)";    
    
INSERT INTO intake
	(SELECT DISTINCT animal_id_intake, intake_number, intake_datetime, intake_weekday, age_upon_intake_years, age_upon_intake_days, sex_upon_intake, intake_type, intake_condition, found_location
    FROM in_out_mega);
    
INSERT INTO outcome
	(SELECT DISTINCT animal_id_intake, outcome_number, outcome_datetime, outcome_weekday, age_upon_outcome_years, age_upon_outcome_days, sex_upon_outcome, outcome_type, outcome_subtype
    FROM in_out_mega);
    
INSERT INTO time_in_shelter
	(SELECT DISTINCT animal_id_intake, intake_number, 
                    ROUND(CONVERT(time_in_shelter_days, DECIMAL(10, 6)), 1)		/* For readability, rounded the numbers to 1 decimal places) */ 
    FROM in_out_mega);

INSERT INTO no_use
	(SELECT animal_id_outcome, count, dob_monthyear, age_upon_intake_age_group, age_upon_outcome_age_group, dob_year, dob_month, intake_monthyear, intake_year, intake_month, intake_hour, age_upon_intake, outcome_monthyear, outcome_year, outcome_month, outcome_hour, age_upon_outcome, time_in_shelter
    FROM in_out_mega);
    

-- Application Functionality    
-- STORED PROCEDURE #1 : search_id_animal_info
/* By using animal's ID, it allows to search animal's information */
DROP PROCEDURE IF EXISTS search_id_animal_info;
DELIMITER //
CREATE PROCEDURE search_id_animal_info(IN animal_id CHAR(7))

BEGIN

SELECT animal_id_intake, animal_type, breed, color, date_of_birth
FROM animal_info
WHERE animal_id = animal_id_intake;

END //
DELIMITER ;

-- STORED PROCEDURE #2 : search_id_intake
/* By using animal's ID, it displays the animal's all intake history */
DROP PROCEDURE IF EXISTS search_id_intake;
DELIMITER //
CREATE PROCEDURE search_id_intake(IN animal_id CHAR(7))

BEGIN

SELECT *
FROM intake
WHERE animal_id_intake = animal_id;

END //

DELIMITER ;

-- STORED PROCEDURE #3 : search_date_intake
/* By using the date of intake, it displays the all intake history of animals of which intake date is the same as the user's input */
DROP PROCEDURE IF EXISTS search_date_intake;
DELIMITER //
CREATE PROCEDURE search_date_intake(IN search_date DATE)	

BEGIN

SELECT *
FROM intake
WHERE CAST(intake_datetime AS date) = search_date;	/* since the datatyep of the 'intake_datetime' is datetime, and that of the input 'search_date' is date, I used CAST to match their datatype. */

END //

DELIMITER ;

-- STORED PROCEDURE #4 : search_id_outcome
/* By using animal's ID, it displays the animal's all outcome history */
DROP PROCEDURE IF EXISTS search_id_outcome;
DELIMITER //
CREATE PROCEDURE search_id_outcome(IN animal_id CHAR(7))

BEGIN

SELECT *
FROM outcome
WHERE animal_id_intake = animal_id;

END //

DELIMITER ;

-- STORED PROCEDURE #5 : search_date_outcome
/* By using the date of outcome, it displays the all outcome history of animals of which outcome date is the same as the user's input */
DROP PROCEDURE IF EXISTS search_date_outcome;
DELIMITER //
CREATE PROCEDURE search_date_outcome(IN search_date DATE)

BEGIN

SELECT *
FROM outcome
WHERE CAST(outcome_datetime AS date) = search_date;	/* since the datatyep of the 'outcome_datetime' is datetime, and that of the input 'search_date' is date, I used CAST to match their datatype. */

END //

DELIMITER ;

-- STORED PROCEDURE #6 : search_id_intake_outcome
/* By using animal's ID, it displays the animal's all intake and outcome history */
DROP PROCEDURE IF EXISTS search_id_intake_outcome;
DELIMITER //
CREATE PROCEDURE search_id_intake_outcome(IN animal_id CHAR(7))

BEGIN

SELECT i.animal_id_intake, i.intake_number, i.intake_datetime, i.intake_weekday, i.age_upon_intake_years, i.sex_upon_intake, i.intake_type, i.intake_condition, i.found_location, 
		o.outcome_datetime, o.outcome_weekday, o.age_upon_outcome_years, o.sex_upon_outcome, o.outcome_type, o.outcome_subtype, tis.time_in_shelter_days
FROM intake i LEFT JOIN outcome o ON i.animal_id_intake = o.animal_id_intake AND i.intake_number = o.outcome_number
				LEFT JOIN time_in_shelter tis ON i.animal_id_intake = tis.animal_id_intake AND i.intake_number = tis.intake_number
                /* There can be a case when intake data exists, but not outcome data. (ex. A dog came to the center, but never adopted or transffered etc.) */
                /* For that case, inner join will cannot show the intake data. To solve the situation, we used "LEFT_JOIN". */
WHERE i.animal_id_intake = animal_id;

END //

DELIMITER ;

-- STORED PROCEDURE #7 : search_intake_date_intake_outcome
/* By using the date of intake, we can see intake and outcome history of all animals of which the date of intake matches with the user's input */
DROP PROCEDURE IF EXISTS search_intake_date_intake_outcome;
DELIMITER //
CREATE PROCEDURE search_intake_date_intake_outcome(IN search_date DATE)

BEGIN

SELECT i.animal_id_intake, i.intake_number, i.intake_datetime, i.intake_weekday, i.age_upon_intake_years, i.sex_upon_intake, i.intake_type, i.intake_condition, i.found_location, 
		o.outcome_datetime, o.outcome_weekday, o.age_upon_outcome_years, o.sex_upon_outcome, o.outcome_type, o.outcome_subtype, tis.time_in_shelter_days
FROM intake i LEFT JOIN outcome o ON i.animal_id_intake = o.animal_id_intake AND i.intake_number = o.outcome_number
				LEFT JOIN time_in_shelter tis ON i.animal_id_intake = tis.animal_id_intake AND i.intake_number = tis.intake_number
                /* There can be a case when intake data exists, but not outcome data. (ex. A dog came to the center, but never adopted or transffered etc.)
                /* For that case, inner join cannot show the intake data. To solve the situation, we used "LEFT_JOIN". */
WHERE CAST(i.intake_datetime AS date) = search_date 
		/* since the datatyep of the 'intake_datetime' is datetime, and that of the input 'search_date' is date, I used CAST to match their datatype. */
ORDER BY i.animal_id_intake, intake_number;

END //

DELIMITER ;

-- STORED PROCEDURE #8 : search_outcome_date_intake_outcome
/* By using the date of outcome, we can see intake and outcome history of all animals of which the date of outcome matches with the user's input */
DROP PROCEDURE IF EXISTS search_outcome_date_intake_outcome;
DELIMITER //
CREATE PROCEDURE search_outcome_date_intake_outcome(IN search_date DATE)

BEGIN

SELECT i.animal_id_intake, i.intake_number, i.intake_datetime, i.intake_weekday, i.age_upon_intake_years, i.sex_upon_intake, i.intake_type, i.intake_condition, i.found_location, 
		o.outcome_datetime, o.outcome_weekday, o.age_upon_outcome_years, o.sex_upon_outcome, o.outcome_type, o.outcome_subtype, tis.time_in_shelter_days
FROM intake i LEFT JOIN outcome o ON i.animal_id_intake = o.animal_id_intake AND i.intake_number = o.outcome_number
				LEFT JOIN time_in_shelter tis ON i.animal_id_intake = tis.animal_id_intake AND i.intake_number = tis.intake_number
				/* There can be a case when intake data exists, but not outcome data. (ex. A dog came to the center, but never adopted or transffered etc.)
                /* For that case, inner join cannot show the intake data. To solve the situation, we used "LEFT_JOIN". */
WHERE CAST(o.outcome_datetime AS date) = search_date
		/* since the datatyep of the 'outcome_datetime' is datetime, and that of the input 'search_date' is date, I used CAST to match their datatype. */
ORDER BY i.animal_id_intake, intake_number;

END //

DELIMITER ;

-- STORED PROCEDURE #9: insert_new_animal
/* When the center get a new animal, they need to save the animal's information. This function take an animal's information and save it in the database */
DROP PROCEDURE IF EXISTS insert_new_animal;
DELIMITER //
CREATE PROCEDURE insert_new_animal(IN animal_id CHAR(7), 
									IN animal_type VARCHAR(255), 
                                    IN breed VARCHAR(255), 
                                    IN color VARCHAR(255),
                                    IN date_of_birth DATE)
BEGIN

DECLARE EXIT HANDLER FOR 1062
SELECT CONCAT('Animal ID ', animal_id, ' already exist.') AS message;
/* If animal_id already exists in the table, it stops the executing the stored procedure and shows the error message. */

INSERT INTO animal_info
VALUES (animal_id, animal_type, breed, color, date_of_birth);
/* Insert a new animal's information */
        
END//

DELIMITER ;

-- STORED PROCEDURE #10: insert_intake 
/* When the animal's information already exist, we can insert a new intake data */
DROP PROCEDURE IF EXISTS insert_intake ;
DELIMITER //
CREATE PROCEDURE insert_intake (IN animal_id CHAR(7),
								IN intake_datetime DATETIME, 
								IN sex_upon_intake VARCHAR(255), 
								IN intake_type VARCHAR(255),
								IN intake_condition VARCHAR(255),
								IN found_location VARCHAR(255))
BEGIN

IF animal_id NOT IN (SELECT DISTINCT animal_id_intake /* If the animal's information does not exist in the "animal_info" table, a new intake informaiton cannot be saved */
					FROM animal_info) THEN
	SELECT 'The animal ID does not exist. Enroll a new animal.' AS message;
ELSE 
	SET @dob = @new_number = @outcome_date = @time_number = '';

	/* @dob parameter is used when we calculate an animal's age. */
	SELECT date_of_birth INTO @dob
	FROM animal_info
	WHERE animal_id_intake = animal_id;
    
    /* @new_number parameter is used to give a new number to the animal automatically */ 
	SELECT MAX(intake_number) + 1 INTO @new_number /* If the database already has 3 as intake number, 4 will be the new information's number */
	FROM intake
	WHERE animal_id_intake = animal_id
	GROUP BY animal_id_intake;

	/* If the animal does not have any history, this algorithm give 1 for the history's number */
	IF (@new_number is null) THEN
		SET @new_number = 1;
    END IF;
    
    /* To calculate a value for time_in_shelter, we need the animal's outcome_date. @outcome_date holds the value */
    SELECT outcome_datetime INTO @outcome_date
	FROM outcome
	WHERE animal_id_intake = animal_id AND outcome_number = @new_number;
	
    /* If intake table already has the same [animal_id + intake_number] as [animal_id + outcome_number] in outcome, it puts calculated time_in_shelter_days value and fill it. If not, it leave the cell empty. */
	IF @new_number NOT IN (SELECT outcome_number
							FROM outcome
							WHERE animal_id_intake = animal_id) THEN 
		SET @time_number = NULL; /* Since there is no intake data related to this outcome_number, we can't calculate time_in_shelter */
	ELSE 
		SET @time_number = ROUND(DATEDIFF(CAST(@outcome_date AS date), CAST(intake_datetime AS date)), 1);
	END IF;	

	/* Insert new information in intake and time_in_shelter tables */   
	INSERT INTO intake
	VALUES (animal_id, @new_number, intake_datetime, 
			DAYNAME(CAST(intake_datetime AS date)),
			ROUND((DATEDIFF(CAST(intake_datetime AS date), @dob) / 365), 0),	/* (intake_datetime - date_of_birth) / 365 = age(years) */
			DATEDIFF(CAST(intake_datetime AS date), @dob),	/* intake_datetime - date_of_birth = age(days) */
            sex_upon_intake, intake_type, intake_condition, found_location);
	
    INSERT INTO time_in_shelter
	VALUES (animal_id, @new_number, @time_number);
            
END IF;
END//

DELIMITER ;

-- STORED PROCEDURE #11: insert_outcome
/* When the animal's information already exist, we can insert a new outcome data */
DROP PROCEDURE IF EXISTS insert_outcome;
DELIMITER //
CREATE PROCEDURE insert_outcome(IN animal_id CHAR(7),
								IN outcome_datetime DATETIME, 
								IN sex_upon_outcome VARCHAR(255), 
								IN outcome_type VARCHAR(255),
								IN outcome_subtype VARCHAR(255))

BEGIN

IF animal_id NOT IN (SELECT DISTINCT animal_id_intake	/* If the animal's information does not exist in the "animal_info" table, a new outcome informaiton cannot be saved */
					FROM animal_info) THEN
	SELECT 'The animal ID does not exist. Enroll a new animal.' AS message;
ELSE 
	SET @dob = @new_number = @intake_date = '';

	/* @dob parameter is used when we calculate an animal's age. */
	SELECT date_of_birth INTO @dob
	FROM animal_info
	WHERE animal_id_intake = animal_id;

	/* @new_number parameter is used to give a new number to the animal automatically */ 
	SELECT MAX(outcome_number) + 1 INTO @new_number	/* If the database already has 3 as intake number, 4 will be the new information's number */
	FROM outcome
	WHERE animal_id_intake = animal_id
	GROUP BY animal_id_intake;
    
    /* If the animal does not have any history, this algorithm give 1 for the history's number */
    IF (@new_number is null) THEN
		SET @new_number = 1;
    END IF;
    
    /* To calculate a value for time_in_shelter, we need the animal's intake_date. @intake_date holds the value */
    SELECT intake_datetime INTO @intake_date
    FROM intake
    WHERE animal_id_intake = animal_id AND intake_number = @new_number;
    
	/* insert a new record into outcome and time_in_shelter tables */       
	INSERT INTO outcome
	VALUES (animal_id, @new_number, outcome_datetime, 
			DAYNAME(CAST(outcome_datetime AS date)), 
			ROUND((DATEDIFF(CAST(outcome_datetime AS date), @dob) / 365), 0),
			DATEDIFF(CAST(outcome_datetime AS date), @dob),
            sex_upon_outcome, outcome_type, outcome_subtype);
	
    /* If intake table already has the same [animal_id + intake_number] as [animal_id + outcome_number] in outcome, it put calculated time_in_shelter_days value and fill it. If not, it leave the cell empty. */
    IF @new_number NOT IN (SELECT intake_number
							FROM intake
							WHERE animal_id_intake = animal_id) THEN 
		SET @time_number = NULL;
        /* If the income data having same as the animal_id and the outcome_number, time_in_shelter is NULL */
        
        INSERT INTO time_in_shelter
		VALUES (animal_id, @new_number, @time_number);
        
	ELSE /* When the intake table already has the same [animal_id + intake_number] as [animal_id + outcome_number] */
		UPDATE time_in_shelter /* Since time_in_shelter is not empty, we need to update it with a new time */
		SET time_in_shelter_days = ROUND(DATEDIFF(CAST(outcome_datetime AS date), CAST(@intake_date AS date)), 1)
		WHERE animal_id_intake = animal_id AND intake_number = @new_number;
			
	END IF;	 
    
END IF;
END//

DELIMITER ;                                 
    
-- STORED PROCEDURE #12 : delete_id_animal_info
/* Users can choose a specific animal's ID, and they can delete it */
DROP PROCEDURE IF EXISTS delete_id_animal_info;
DELIMITER //
CREATE PROCEDURE delete_id_animal_info(IN animal_id CHAR(7))
BEGIN

IF animal_id NOT IN (SELECT DISTINCT animal_id_intake /* If the animal_id does not exist, the error messsage will pop up */
					FROM animal_info) THEN
	SELECT 'The animal ID does not exist. Type a different ID.' AS message;
ELSE 
	DELETE FROM animal_info
    WHERE animal_id_intake = animal_id;
   
END IF;
END//

DELIMITER ;

-- STORED PROCEDURE #13 : delete_id_number_intake
/* User can delete a specific intake data by selecting animal's ID and intake_number. */
DROP PROCEDURE IF EXISTS delete_id_number_intake;
DELIMITER //
CREATE PROCEDURE delete_id_number_intake(IN animal_id CHAR(7), IN number SMALLINT)
BEGIN

IF animal_id NOT IN (SELECT DISTINCT animal_id_intake
					FROM animal_info) THEN
	SELECT 'The animal ID does not exist. Type a different ID.' AS message;	/* If the animal_id does not exist, the error messsage will pop up */
ELSE 
	DELETE FROM intake
    WHERE animal_id_intake = animal_id AND intake_number = number;
    
    DELETE FROM time_in_shelter
    WHERE animal_id_intake = animal_id AND intake_number = number;
    /* Since time_in_shelter can exist only when intake and outcome data exist together. Therefore, deleting intake info means deleting time_in_shelter as well */
   
END IF;
END//

DELIMITER ;

-- STORED PROCEDURE #14 : delete_id_number_outcome
/* User can delete a specific outcome data by selecting animal's ID and intake_number. */
DROP PROCEDURE IF EXISTS delete_id_number_outcome;
DELIMITER //
CREATE PROCEDURE delete_id_number_outcome(IN animal_id CHAR(7), IN number SMALLINT)
BEGIN

IF animal_id NOT IN (SELECT DISTINCT animal_id_intake
					FROM animal_info) THEN
	SELECT 'The animal ID does not exist. Type a different ID.' AS message; 	/* If the animal_id does not exist, the error messsage will pop up */
ELSE 
	DELETE FROM outcome
    WHERE animal_id_intake = animal_id AND outcome_number = number;
   
END IF;
END//

DELIMITER ;

-- STORED PROCEDURE #15 : update_animal_info
/* User can update animal's information */
DROP PROCEDURE IF EXISTS update_animal_info
DELIMITER //
CREATE PROCEDURE update_animal_info(IN animal_id CHAR(7),
									IN animal_type VARCHAR(255),
                                    IN breed VARCHAR(255),
                                    IN color VARCHAR(255),
                                    IN date_of_birth DATE)
BEGIN

UPDATE animal_info
SET animal_type = animal_type
WHERE animal_id_intake = animal_id;

UPDATE animal_info
SET breed = breed
WHERE animal_id_intake = animal_id;

UPDATE animal_info
SET color = color
WHERE animal_id_intake = animal_id;

UPDATE animal_info
SET date_of_birth = date_of_birth
WHERE animal_id_intake = animal_id;

END//

DELIMITER ;


-- STORED PROCEDURE #16 : update_intake
/* User can update intake table */
DROP PROCEDURE IF EXISTS update_intake;
DELIMITER //
CREATE PROCEDURE update_intake(IN animal_id CHAR(7),
								IN intake_num SMALLINT,
								IN intake_datetime DATETIME,
								IN sex_upon_intake VARCHAR(255),
								IN intake_type VARCHAR(255),
								IN intake_condition VARCHAR(255),
								IN found_location VARCHAR(255))
BEGIN

SET @dob = @outcome_date = '';

/* To calculate an animal's age, we need the animal's birthday. @dob holds the value */
SELECT date_of_birth INTO @dob
FROM animal_info
WHERE animal_id_intake = animal_id;

/* To calculate how long an animal spent in the center, we need the animal's outcome date. @outcome_date holds the value */
SELECT outcome_datetime INTO @outcome_date
FROM outcome
WHERE animal_id_intake = animal_id AND outcome_number = intake_num;

/* Codes below show update statements */
UPDATE intake
SET intake_datetime = intake_datetime
WHERE animal_id_intake = animal_id AND intake_number = intake_num;

UPDATE intake
SET intake_weekday = DAYNAME(CAST(intake_datetime AS date))
WHERE animal_id_intake = animal_id AND intake_number = intake_num;

UPDATE intake
SET age_upon_intake_years = ROUND((DATEDIFF(CAST(intake_datetime AS date), @dob) / 365), 0) /* (intake_date - date_of_birth) / 365 = age(years) */
WHERE animal_id_intake = animal_id AND intake_number = intake_num;

UPDATE intake
SET age_upon_intake_days = DATEDIFF(CAST(intake_datetime AS date), @dob) /* intake_date - date_of_birth = age(days) */
WHERE animal_id_intake = animal_id AND intake_number = intake_num;

UPDATE intake
SET sex_upon_intake = sex_upon_intake
WHERE animal_id_intake = animal_id AND intake_number = intake_num;

UPDATE intake
SET intake_type = intake_type
WHERE animal_id_intake = animal_id AND intake_number = intake_num;

UPDATE intake
SET intake_condition = intake_condition
WHERE animal_id_intake = animal_id AND intake_number = intake_num;

UPDATE intake
SET found_location = found_location
WHERE animal_id_intake = animal_id AND intake_number = intake_num;

UPDATE time_in_shelter
SET time_in_shelter_days = ROUND(DATEDIFF(CAST(@outcome_date AS date), CAST(intake_datetime AS date)), 1) /* outcome_date - income_date = time_in_shelter_days */
WHERE animal_id_intake = animal_id AND intake_number = intake_num;

END//

DELIMITER ;



-- STORED PROCEDURE #17 : update_outcome
DROP PROCEDURE IF EXISTS update_outcome;
/* User can update outcome table */
DELIMITER //
CREATE PROCEDURE update_outcome(IN animal_id CHAR(7),
								IN outcome_num SMALLINT,
								IN outcome_datetime DATETIME,
								IN sex_upon_outcome VARCHAR(255),
								IN outcome_type VARCHAR(255),
								IN outcome_subtype VARCHAR(255))
BEGIN

SET @dob = @intake_date = '';

/* To calculate an animal's age, we need the animal's birthday. @dob holds the value */
SELECT date_of_birth INTO @dob
FROM animal_info
WHERE animal_id_intake = animal_id;

/* To calculate how long an animal spent in the center, we need the animal's intake date. @intake_date holds the value */
SELECT intake_datetime INTO @intake_date
FROM intake
WHERE animal_id_intake = animal_id AND intake_number = outcome_num;

/* Codes below show update statements */
UPDATE outcome
SET outcome_datetime = outcome_datetime
WHERE animal_id_intake = animal_id AND outcome_number = outcome_num;

UPDATE outcome
SET outcome_weekday = DAYNAME(CAST(outcome_datetime AS date))
WHERE animal_id_intake = animal_id AND outcome_number = outcome_num;

UPDATE outcome
SET age_upon_outcome_years = ROUND((DATEDIFF(CAST(outcome_datetime AS date), @dob) / 365), 0)	/* (outcome_date - date_of_birth) / 365 = age(years) */
WHERE animal_id_intake = animal_id AND outcome_number = outcome_num;

UPDATE outcome
SET age_upon_outcome_days = DATEDIFF(CAST(outcome_datetime AS date), @dob)	/* intake_date - date_of_birth = age(days) */
WHERE animal_id_intake = animal_id AND outcome_number = outcome_num;

UPDATE outcome
SET sex_upon_outcome = sex_upon_outcome
WHERE animal_id_intake = animal_id AND outcome_number = outcome_num;

UPDATE outcome
SET outcome_type = outcome_type
WHERE animal_id_intake = animal_id AND outcome_number = outcome_num;

UPDATE outcome
SET outcome_subtype = outcome_subtype
WHERE animal_id_intake = animal_id AND outcome_number = outcome_num;

UPDATE time_in_shelter
SET time_in_shelter_days = ROUND(DATEDIFF(CAST(outcome_datetime AS date), CAST(@intake_date AS date)), 1)
WHERE animal_id_intake = animal_id AND outcome_number = outcome_num;

END//

DELIMITER ;

-- TRIGGER #1 : audit_update_animal_info
/* Whenever a user update the animal_info table, this trigger leaves history about what to be changed. This tracks update history. */
DROP TRIGGER IF EXISTS audit_update_animal_info;
DELIMITER //
CREATE TRIGGER audit_update_animal_info
AFTER UPDATE
ON animal_info
FOR EACH ROW
BEGIN
	IF OLD.animal_type <> NEW.animal_type OR OLD.breed <> NEW.breed OR OLD.color <> NEW.color OR OLD.date_of_birth <> NEW.date_of_birth THEN
		INSERT INTO trigger_animal_info
		VALUES (OLD.animal_id_intake, OLD.animal_type, NEW.animal_type, OLD.breed, NEW.breed, OLD.color, NEW.color, OLD.date_of_birth, NEW.date_of_birth, NOW());
	END IF;
END //

DELIMITER ;

-- TRIGGER #2 : audit_update_intake
/* Whenever a user update the intake table, this trigger leaves history about what to be changed. This tracks update history. */
DROP TRIGGER IF EXISTS audit_update_intake;
DELIMITER //
CREATE TRIGGER audit_update_intake
AFTER UPDATE
ON intake
FOR EACH ROW
BEGIN
	IF OLD.intake_datetime <> NEW.intake_datetime OR OLD.sex_upon_intake <> NEW.sex_upon_intake OR OLD.intake_type <> NEW.intake_type OR OLD.intake_condition <> NEW.intake_condition OR OLD.found_location <> NEW.found_location THEN
		INSERT INTO trigger_intake
		VALUES (OLD.animal_id_intake, OLD.intake_number, OLD.intake_datetime, NEW.intake_datetime, OLD.sex_upon_intake, NEW.sex_upon_intake, OLD.intake_type, NEW.intake_type, OLD.intake_condition, 
				NEW.intake_condition, OLD.found_location, NEW.found_location, NOW());
	END IF;
END //

DELIMITER ;

-- TRIGGER #3 : audit_update_outcome
/* Whenever a user update the outcome table, this trigger leaves history about what to be changed. This tracks update history. */
DROP TRIGGER IF EXISTS audit_update_outcome;
DELIMITER //
CREATE TRIGGER audit_update_outcome
AFTER UPDATE
ON outcome
FOR EACH ROW
BEGIN
	IF OLD.outcome_datetime <> NEW.outcome_datetime OR OLD.sex_upon_outcome <> NEW.sex_upon_outcome OR OLD.outcome_type <> NEW.outcome_type OR OLD.outcome_subtype <> NEW.outcome_subtype THEN
		INSERT INTO trigger_outcome
		VALUES (OLD.animal_id_intake, OLD.outcome_number, OLD.outcome_datetime, NEW.outcome_datetime, OLD.sex_upon_outcome, NEW.sex_upon_outcome, OLD.outcome_type, NEW.outcome_type, 
				OLD.outcome_subtype, NEW.outcome_subtype, NOW());
	END IF;
END //

DELIMITER ;

/* We created 3 views which shows the animals which need special care and attention */

-- VIEW #1 : gender_changed_list
/* Users can see the list of animals whose of gender was changed. */
DROP VIEW IF EXISTS gender_changed_list;
CREATE VIEW gender_changed_list AS
SELECT i.animal_id_intake, i.intake_number, i.sex_upon_intake, o.sex_upon_outcome
FROM intake i JOIN outcome o ON i.animal_id_intake = o.animal_id_intake AND i.intake_number = o.outcome_number
WHERE i.sex_upon_intake <> o.sex_upon_outcome;

-- VIEW #2 : adoption list
/* Users can see the list of adopted animals. */
DROP VIEW IF EXISTS adoption_list;
CREATE VIEW adoption_list AS
SELECT i.animal_id_intake, i.intake_number, ai.animal_type, ai.breed, ai.color, i.intake_type, o.outcome_type
FROM intake i LEFT JOIN outcome o ON i.animal_id_intake = o.animal_id_intake AND i.intake_number = o.outcome_number
				/* There can be a case when intake data exists, but not outcome data. (ex. A dog came to the center, but never adopted or transffered etc.)
                /* For that case, inner join cannot show the intake data. To solve the situation, we used "LEFT_JOIN". */
				JOIN animal_info ai ON i.animal_id_intake = ai.animal_id_intake
WHERE o.outcome_type = "Adoption";

-- VIEW #3 : transfer_list
/* Users can see the list of transffered animals. */
DROP VIEW IF EXISTS transfer_list;
CREATE VIEW transfer_list AS
SELECT i.animal_id_intake, i.intake_number, ai.animal_type, ai.breed, ai.color, i.intake_type, o.outcome_type
FROM intake i LEFT JOIN outcome o ON i.animal_id_intake = o.animal_id_intake AND i.intake_number = o.outcome_number
                /* There can be a case when intake data exists, but not outcome data. (ex. A dog came to the center, but never adopted or transffered etc.)
                /* For that case, inner join cannot show the intake data. To solve the situation, we used "LEFT_JOIN". */
				JOIN animal_info ai ON i.animal_id_intake = ai.animal_id_intake
WHERE o.outcome_type = "Transfer";

