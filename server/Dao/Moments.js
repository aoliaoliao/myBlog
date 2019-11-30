module.exports = (sequelize, DataTypes) => {
    let Moments = sequelize.define('Moments', {
        id: {
            type: DataTypes.CHAR(18),
            defaultValue: DataTypes.UUIDV1,
            comment: '动态ID，主键',
            primaryKey: true
        },
        userId: {
            type: DataTypes.CHAR(18),
            allowNull: false,
            comment: '关联的用户ID',
        },
        text: {
            type: DataTypes.STRING(1000),
            comment: 'moment的具体内容'
        },
        imgs: {
            type: DataTypes.STRING(1000),
            comment: 'moment关联图片的位置，用英文逗号分隔'
        },
        video: {
            type: DataTypes.STRING(1000),
            comment: 'moment关联视频的位置，只有一个'
        },
    }, {
        freezeTableName: true
    })

    Moments.associate = function(models) {
        models.Moments.belongsTo(models.Users, { foreignKey: 'userId', as: 'momentAuthor' })
        models.Moments.hasMany(models.Comments, { foreignKey: 'momentId', as: 'momentComments' })
        models.Moments.hasMany(models.Votes, { foreignKey: 'momentId', as: 'momentLikes' })
    };
    return Moments
}