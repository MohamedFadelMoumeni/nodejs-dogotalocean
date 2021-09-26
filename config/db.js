
  const mysql = require("serverless-mysql");

  const db = mysql({
    config: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'app',
      port: "3306",
    },
  });
  
  exports.query = async (query) => {
    try {
      const results = await db.query(query);
      await db.end();
      return results;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }