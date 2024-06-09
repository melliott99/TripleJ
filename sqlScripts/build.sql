-- Create the Users table
CREATE TABLE Users (
    UserId CHAR(36) PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
	HasVoted bit NOT NULL,
);

 
 CREATE TABLE Songs (
	TrackId VARCHAR(22) PRIMARY KEY, 
	Song VARCHAR(MAX),
	Artist VARCHAR(MAX),
	Album VARCHAR(MAX),
	TrackImg VARCHAR(MAX),
	PlaylistOwner VARCHAR(MAX)
	);

  
  CREATE TABLE Votes (
    TrackId VARCHAR(22),
    Point INT,
    Voter CHAR(36), 
	PRIMARY KEY(TrackId, Voter),
	FOREIGN KEY (TrackId) REFERENCES Songs(TrackId),
	FOREIGN KEY (Voter) REFERENCES Users(UserId)
);



-- Insert the users with the provided UUIDs
INSERT INTO Users (UserId, Name, HasVoted) VALUES ('df30709f-7031-4adb-a813-6c512200704a', 'Alex Reynolds',0);
INSERT INTO Users (UserId, Name, HasVoted) VALUES ('284b6548-1009-488e-972f-974264620982', 'Blair Hammond',0);
INSERT INTO Users (UserId, Name, HasVoted) VALUES ('17804a32-1b3c-48cc-ba93-0e3e68278c5b', 'Charlie Wisker',0);
INSERT INTO Users (UserId, Name, HasVoted) VALUES ('ec63ba4c-8b27-4b71-aa85-54c8c8649837', 'Chris Roberts',0);
INSERT INTO Users (UserId, Name, HasVoted) VALUES ('99862b21-1e79-481f-8b01-197729fc3223', 'Connor Cherry',0);
INSERT INTO Users (UserId, Name, HasVoted) VALUES ('b92626e2-b0dd-4fae-8797-a163bef9086a', 'Jack Darley',0);
INSERT INTO Users (UserId, Name, HasVoted) VALUES ('c4f00e48-33c5-4b12-9e03-c1361ec34ba3', 'Jack King',0);
INSERT INTO Users (UserId, Name, HasVoted) VALUES ('61e1b462-2527-4f82-8c93-be6393b65fb0', 'Jed Allen',0);
INSERT INTO Users (UserId, Name, HasVoted) VALUES ('46a81bd2-38d6-453f-b1c6-a096c3f29996', 'Jess Robinson',0);
INSERT INTO Users (UserId, Name, HasVoted) VALUES ('d9666a61-0552-4ae4-963e-3061d1617620', 'Jock Holyman',0);
INSERT INTO Users (UserId, Name, HasVoted) VALUES ('93351cd7-a1a0-4cd1-81b8-59cf8a61cc17', 'Michael Elliott',0);
INSERT INTO Users (UserId, Name, HasVoted) VALUES ('b4054eaa-0581-4af0-81cf-fb17c505576f', 'Mitch Abbit',0);
INSERT INTO Users (UserId, Name, HasVoted) VALUES ('cb294a86-339c-4e26-9982-f2159432931f', 'Noah Johnson',0);
INSERT INTO Users (UserId, Name, HasVoted) VALUES ('22dc894b-1d58-4278-a9ed-7dc8b0bab199', 'Riley Smith',0);
INSERT INTO Users (UserId, Name, HasVoted) VALUES ('f10e0ba7-ef38-4d23-b245-efacf47ffcba', 'Sebastian Du Toit',0);
INSERT INTO Users (UserId, Name, HasVoted) VALUES ('9fb8f05f-b864-4949-9fa5-b2a019569f4a', 'Vail Reynolds',0);


drop table votes
drop table Songs
drop table Users