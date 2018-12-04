const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('Moment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            comment: '动态ID，主键',
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            comment: '关联的用户ID',
        },
        commentsId: {
            type: DataTypes.STRING(1000),
            comment: '关联的评论ID，用英文逗号分隔',
        },
        text: {
            type: DataTypes.STRING(1000),
            comment: 'moment的具体内容'
        },
        img: {
            type: DataTypes.STRING(1000),
            comment: 'moment关联图片的位置，用英文逗号分隔'
        },
        video: {
            type: DataTypes.STRING(1000),
            comment: 'moment关联视频的位置，只有一个'
        }
    })

    User.associate = function(models) {
        // models.User.hasMany(models.Task);
    };
    return User
}