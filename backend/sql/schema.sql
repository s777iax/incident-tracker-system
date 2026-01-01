BEGIN;

CREATE TABLE public.users (
	user_id serial4 NOT NULL,
	email varchar(100) NOT NULL,
	"role" varchar(10) NOT NULL,
	password_hash text NOT NULL,

	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (user_id),
	CONSTRAINT users_role_check CHECK (role IN ('user', 'admin'))
);

CREATE TABLE public.incidents (
	incident_id serial4 NOT NULL,
	title varchar(50) NOT NULL,
	description text NOT NULL,
	status varchar(20) DEFAULT 'OPEN' NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	created_by int4 NOT NULL,
	ai_summary text NULL,

	CONSTRAINT incidents_pkey PRIMARY KEY (incident_id),
	CONSTRAINT incidents_status_check CHECK (status IN ('OPEN', 'IN_PROGRESS', 'RESOLVED'))
);

ALTER TABLE public.incidents
ADD CONSTRAINT incidents_created_by_fkey
FOREIGN KEY (created_by)
REFERENCES public.users(user_id);

COMMIT;