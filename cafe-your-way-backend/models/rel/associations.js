module.exports = function (models) {
    models.users.hasMany(models.orders,
        {
            foreignKey: 'UserId'
        });
    models.orders.belongsTo(models.users,
        {
            foreignKey: 'UserId'

        });
    models.products.belongsToMany(models.orders, {
        through: models.orders_products,
        foreignKey: 'ProductId'
    });
    models.orders.belongsToMany(models.products, {
        through: models.orders_products,
        foreignKey: 'OrderId'
    });
}
