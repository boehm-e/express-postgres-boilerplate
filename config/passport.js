module.exports = {
  secret: "seedup",
  strategy: {
    server: {
      url: 'ldap://localhost:1389',
      bindDN: 'uid=dashboard,ou=services,dc=seed-up,dc=org',
      bindCredentials: "dashboard",
      searchBase: 'ou=people,dc=seed-up,dc=org',
      searchFilter: '(uid={{username}})',
      reconnect: true
    }
  },
  ldap: {
    host: "localhost"
  },
  redis: {
    host: "localhost",
    port: 6397
  }
};
