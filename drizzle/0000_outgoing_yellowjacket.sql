CREATE TABLE `cards` (
	`scryfall_id` text PRIMARY KEY NOT NULL,
	`name` text,
	`embedding` F32_BLOB(384)
);
