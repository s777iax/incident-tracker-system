BEGIN;

-- =========================
-- Test Users (For Demo Only)
-- Password for all accounts: myPassword123
-- =========================

INSERT INTO public.users (email, "role", password_hash) VALUES
('sally@email.com', 'admin', '$2b$10$.5bcCndJ9d2U9tkOq1cYhOirkObBV.0Aay.YJSH0h3EkiL2dsMQO.'),
('john@email.com', 'user', '$2b$10$sua7q.457.6d9oT1NC0MRu38wAWvwaFGWGpLtO1Zqj4NABu5Nt3h2'),
('jane@email.com', 'user', '$2b$10$wdDisDAMEIbK/sNlgdobreeJHhrzopxBMhsr8BwzzQRCDxEC8H8pa');

INSERT INTO public.incidents (title, description, status, created_by, ai_summary) VALUES
('Bus crash', 'Just now there was this super loud crash sound and I didn''t even know what it was at first. Then I looked over at Jurong West Avenue 1 and realised bus 98 and bus 99 somehow crashed into each other. It all happened quite fast so I was lowkey confused what I was seeing. The glass was all shattered everywhere which made it look quite bad, and a lot of people inside seemed injured or at least very shocked. Everyone was kind of standing around not really knowing what to do, like the whole scene just felt chaotic and blur for a while.', 'OPEN', 2, NULL),
('Noisy neighbours', 'I have been hearing repeated screaming sounds coming from my neighbour next door, and it has been happening more than once, which makes it hard to ignore. At first, I wasnt sure if it was just noise from a television or some kind of argument, but the sounds seem quite loud and real. I cant really tell what is going on inside, but it feels concerning and uncomfortable. Im not sure whether someone should step in or if there is a way to get help to stop the situation, because it doesnt sound like something normal.', 'OPEN', 3, NULL);

COMMIT;