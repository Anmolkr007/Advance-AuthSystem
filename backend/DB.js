import {neon} from "@neondatabase/serverless"
import dotenv from "dotenv/config"

const {PGHOST,PGUSER,PGDATABASE,PGPASSWORD} = process.env

export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`,
)

