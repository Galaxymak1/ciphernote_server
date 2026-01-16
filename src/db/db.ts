import {drizzle} from 'drizzle-orm/postgres-js'
import {relations} from "./schema"

const db = drizzle(process.env.DATABASE_URL!,{relations})

export default db