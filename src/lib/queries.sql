create table public.users (
  clerk_id TEXT primary key,
  username TEXT,
  email TEXT,
  image_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ default now()
);

alter table public.users enable row level security;

CREATE TABLE public.characters (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(255) REFERENCES public.users(clerk_id) ON DELETE CASCADE,  -- FK to Clerk ID
  name text NOT NULL,
  race text CHECK (race IN ('Human', 'Pigeon', 'Elf', 'Gnome', 'Goblin', 'Werewolf')),
  class text  CHECK (class IN ('Bard', 'Hunter', 'sorcerer', 'Explorer', 'Barbarian')),
  age int,
  gender text,
  avatar text, 
  background text,
  created_at timestamptz DEFAULT now(),
  current_adventure text,
  current_step text,
  adventure_state jsonb DEFAULT '{}'
  is_active BOOL DEFAULT false
);

CREATE POLICY user_access_policy ON public.users FOR SELECT
USING (clerk_id = current_setting('app.clerk_id', true));

CREATE POLICY character_access_policy ON public.characters FOR SELECT
USING (user_id = current_setting('app.clerk_id', true));

SELECT
  characters.name,
  characters.race,
  characters.class,
  characters.age,
  characters.gender,
  characters.avatar,
  characters.background,
  users.clerk_id
FROM
  characters
JOIN
  users ON users.clerk_id = characters.user_id
WHERE
  users.clerk_id = 'user_34eK6bd0OWMgdK7QBTdbtY2ODLG'

UPDATE characters SET is_active = true WHERE id = 'ddd8a1b0-c1e1-4387-9e81-43bad69e12e3'

UPDATE characters SET is_active = true