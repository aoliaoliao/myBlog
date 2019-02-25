module.exports = (sequelize, DataTypes) => {
    let Like = sequelize.define('Like', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            comment: '点赞的ID，主键',
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            comment: '关联的用户ID',
        },
        articleId: {
            type: DataTypes.UUID,
            comment: '关联的文章ID',
        },
        momentId: {
            type: DataTypes.UUID,
            comment: '关联的动态ID',
        },
    }, {
        freezeTableName: true
    })

    Like.associate = function(models) {};
    return Like
}