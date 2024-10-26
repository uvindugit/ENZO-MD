const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYVBrYnFLelFkVUQzRVpTVWtNWXB4aC8yUWNrOFNHakpaOTZnUkQwR0kwZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSEE3QlVlTDJyQ2lRQmQ5Ymt1c2JqNUJhNUVnYW0rOTJaQWxoeVY4R2xuTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXTjRha0JGdDVWU2tQb0tZZjFGVXBvbGRZMGZkV2Ryb24zYUQwdEhGSlhnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFSzZmaUFnL2E2K1daWXJWSFVDdlpVUmt6RUdiZmYvTXphSkVaNG91bUVJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9JSG9kejh1R1lIZGlBYk1iOTVFU2JVMFIyQlZrekVMT3I4Q3A3cEl1MVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJCN08ybWMveDQwU25sdUhSWU51TzJzSFBBeDFiSG12LzdkT09xTElreW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUN4ZzFXSEZkRmRSZ2prMmZRRkZpdmV3VEZRMkhsM3dmMUpGN2M3RUwwOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaHJPVVZ5VUpYcG01TEVRR2ZBVEx1Rk5nb0pCbzQ2MXIvK1F0QXJqdm1Bbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJWMGRmaDJqOS92Q05oNU9LTlROU3FxUWVEUkU5Ry9qVGVkcmh2RTlPc2dRQWFldm1FNldaeFZrSStIb2RIZGdKL2hFSE9KbU9iQk5NS1pZcEZOR2l3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE0LCJhZHZTZWNyZXRLZXkiOiJVRUErNnJmc3Y1Umc2NjJWNk1lNGlZTGxMOUFhVXkwY29mZXgzbllkRWpRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzU3NTg2OTExQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjExNTg5Nzc5NDhFNkE5OURCNTQ2QzIxQ0QyRDlCNTMyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Mjk5Mjc5NDl9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkxhWWJfYXFmUjcyclZuMkpnelhFcnciLCJwaG9uZUlkIjoiNDBiNGExMzMtOWIzMi00NWVlLTljYmQtYWM5YWMxNmI2NzI3IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii91Rmhobkh0Nmg2RXJvWUpmaDVtNmRFUmIvRT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYODhQZ3ByTzZaSWpES29IbWxxamtHc0Jja2c9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiOU5GTkJYMjciLCJtZSI6eyJpZCI6Ijk0NzU3NTg2OTExOjYxQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJWG54S2NFRVAyMThyZ0dHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJpazRpZVVYa2JkVWp5a1ErU1FMamlaeUVzcW93dmZuL1BBR3RCSW9LZWxJPSIsImFjY291bnRTaWduYXR1cmUiOiJHNFlGYzg0cWJFVS9IbUZwWnRVd2tqczVESDlQSDBFc1lVRHJ4ZnlqeEVVemY4bkM5NXJOR2ZpVHJianR4b2c4SHlxSFhWcFc0SDhFUWFlWWdYSS9BQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTlB1SXdsVElGcGZjMjgyVnU5UEUzZUhMU2tFZ0l2SU50V1dsVzNPYVJ5MTVHSHFFbjdPMXpoWHJ0ZEM5OWtZOEpmZVZ4WGFmYzd3TmJhUWprRWJuaVE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDc1NzU4NjkxMTo2MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZcE9JbmxGNUczVkk4cEVQa2tDNDRtY2hMS3FNTDM1L3p3QnJRU0tDbnBTIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI5OTI3OTQ2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVBvQyJ9',
    PREFIXE: process.env.PREFIX || ",",
    OWNER_NAME: process.env.OWNER_NAME || "🍂🖤𝗞𝗜𝗡𝗚 𝗔𝗡𝗝𝗔𝗡𝗔 𝗕𝗕𝗛 💦🥵🍂",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "🍂🖤𝗞𝗜𝗡𝗚 𝗔𝗡𝗝𝗔𝗡𝗔 𝗕𝗕𝗛 💦🥵🍂",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/b1ikpr.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
