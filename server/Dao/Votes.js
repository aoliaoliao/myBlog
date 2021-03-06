module.exports = (sequelize, DataTypes) => {
    let Votes = sequelize.define('Votes', {
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

    Votes.associate = function(models) {
        models.Votes.belongsTo(models.Users, {
            foreignKey: 'userId',
            as: 'LikeAuthor'
        })
    };
    return Votes
}