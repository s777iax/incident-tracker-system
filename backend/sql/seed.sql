BEGIN;

INSERT INTO public.users (email, "role", password_hash) VALUES
('sally@email.com', 'admin', '$2b$10$GYujkoFILKQPc4tJMoLo0Og37kso13DovmRFfb8p0kemepSudR6Ra'),
('john@email.com', 'user', '$2b$10$02BMt3KZfITEFMX54TD7IOxIRHOfEv/QcRrmIUPDggRDqsX2TDnei'),
('jane@email.com', 'user', '$2b$10$/AqCkj.78O/FgKskZwbM8.X1Opz8qJMqcJC3Qi/TD2ck.M93Cbgui');

INSERT INTO public.incidents (title, description, status, created_by, ai_summary) VALUES
('Bus crash', 'Just now there was this super loud crash sound and I didn''t even know what it was at first. Then I looked over at Jurong West Avenue 1 and realised bus 98 and bus 99 somehow crashed into each other. It all happened quite fast so I was lowkey confused what I was seeing. The glass was all shattered everywhere which made it look quite bad, and a lot of people inside seemed injured or at least very shocked. Everyone was kind of standing around not really knowing what to do, like the whole scene just felt chaotic and blur for a while.', 'OPEN', 2, NULL),
('Noisy neighbours', 'I have been hearing repeated screaming sounds coming from my neighbour next door, and it has been happening more than once, which makes it hard to ignore. At first, I wasnt sure if it was just noise from a television or some kind of argument, but the sounds seem quite loud and real. I cant really tell what is going on inside, but it feels concerning and uncomfortable. Im not sure whether someone should step in or if there is a way to get help to stop the situation, because it doesnt sound like something normal.', 'OPEN', 3, NULL);

COMMIT;