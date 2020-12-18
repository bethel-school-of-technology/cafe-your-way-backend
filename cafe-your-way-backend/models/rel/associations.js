module.exports = function(models) {
    models.customers.belongsToMany(models.users, 
        { 
            through: models.customers_users,
            foreignKey: 'customer_id'
        });
    models.users.belongsToMany(models.customers,
        {
            through: models.customers_users,
            foreignKey: 'user_id'
        });
}