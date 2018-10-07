const Sequelize = require( 'sequelize' )

module.exports = ( sequelize, DataTypes ) => {
  let User = sequelize.define( 'User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      comment: '用户ID，主键',
      primaryKey: true
    },
    linkedEMail: {
      type: DataTypes.STRING,
      allowNull: false,
      uniqueOne: {
        type: Sequelize.STRING,
        uniqueOne: true
      },
      validate: {
        isEmail: {
          msg: '请输入正确的邮箱格式'
        }
      },
      comment: '关联邮箱'
    },
    nickName: {
      type: DataTypes.STRING( 50 ),
      allowNull: false,
      uniqueOne: {
        type: Sequelize.STRING,
        unique: true
      },
      validate: {
        len: {
          args: [ 2, 10 ],
          msg: '用户昵称在2到10位字符之间'
        }
      },
      comment: '用户姓名'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^.*(?=.{9,})(?=.*\d)(?=.*[a-z]).*$/,
          msg: '密码长度不少于9位，必须包含字母和数字'
        }
      },
      comment: '密码'
    },
    avatar: {
      type: DataTypes.STRING,
      comment: '头像'
    },
    signature: {
      type: DataTypes.STRING,
      comment: '个性签名'
    },
    description: {
      type: DataTypes.STRING( 1000 ),
      comment: '个人描述'
    },
    highest: {
      type: DataTypes.ENUM( '0', '99' ),
      comment: '权限范围，99表示最高权限'
    },
    userHome: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
        isIP: true,
      },
      comment: '用户的个人主页'
    },
    isLoginIn: {
      type: DataTypes.BOOLEAN,
      comment: '是否注册过'
    }

  } )

  User.associate = function ( models ) {
    // models.User.hasMany(models.Task);
  };
  return User
}