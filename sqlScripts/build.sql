  CREATE TABLE Votes (
    TrackId VARCHAR(22),
    Point INT,
    Voter VARCHAR(255), 
	PRIMARY KEY(TrackId, Voter),
	FOREIGN KEY (TrackId) REFERENCES Songs(TrackId)
);



CREATE TABLE Songs (
	TrackId VARCHAR(22) PRIMARY KEY, 
	Song VARCHAR(MAX),
	Artist VARCHAR(MAX),
	Album VARCHAR(MAX),
	TrackImg VARCHAR(MAX),
	PlaylistOwner VARCHAR(MAX)
	);