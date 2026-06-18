import {neon} from "@neondatabase/serverless"


const {PGHOST,PGUSER,PGDATABASE,PGPASSWORD} = process.env

export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`,
)

