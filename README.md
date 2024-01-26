# Getting Started

1. Clone the repo: `git clone https://github.com/huntabyte/sveltekit-lucia-prisma.git`
2. Install the base packages: `npm i`
3. Initialise the Prisma db: `npx prisma migrate dev --name init`
4. Generate the Prisma client and types (is this typescript?): `npx prisma generate`

# Upgrading Lucia from v1 to v2

1. 2 packages have been updated, adapter-prisma and lucia-auth (now called simply lucia), so you'll need to remove lucia-auth and run `npm i` with the updated _package.json_ file.
2. The Prisma Lucia schema has been slightly tweaked. The default version removes two entries in the **auth_key** table, as well as removing the _auth\__ prefix to the tables. You can override the latter in the settings, which is what I've done. You'll need to run a Prisma migration with something like this command: `npx prisma migrate dev --name auth_key` so it updates the tables correctly.
