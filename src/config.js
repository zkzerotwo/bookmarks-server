module.exports = {
    PORT: process.env.PORT || 8080,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_TOKEN: process.env.API_TOKEN || '95868585',
    DB_URL: process.env.DB_URL || 'postgresql://dunder_mifflin@localhost/bookmarks',
    TEST_DB_URL: process.env.TEST_DB_URL || 'postgresql://dunder_mifflin@localhost/bookmarks-test',
  }