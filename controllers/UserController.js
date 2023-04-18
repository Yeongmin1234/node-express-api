var mysql      = require('mysql2');
var dbconfig   = require('../config/database.js');
var connection = mysql.createConnection(dbconfig);
var message = function(status) {
  var text;
  if(status === 200){
    text = "Success";
  }
  else if(status === 400){
    text = "Bad Request";
  }
  else if(status === 403){
    text = "Forbidden";
  }
  else if(status === 404){
    text = "Not Found";
  }
  else if(status === 405){
    text = "Method Not Allowed";
  }
  else{
    text = "Error";
  }
  return text;
}

exports.CRUD = {

  userInfo : (req, res) => {
    try {
      connection.query('SELECT * from vuexy_user_info where user_id = ? and del_yn = 0', req.params.id,(error, row, fields) => {
        if(error) {
          res.json({"status": error.code, "message": error.message})
        } else if (!row[0]) {
          res.status(404);
          res.json({"status": 404, "message": message(404)});
        } else{
          res.send(row[0]);
        }
      });
    } catch (error) {
        return res.json({"status": error.code, "message": error.message});
    }
  },

  userCre : (req, res) => {
      var body = req.body;
      var status = res.statusCode;
      var sql = 'insert into vuexy_user_info (user_name, user_email, user_password, agree_policy) values (?, ?, ?, ?)';
      var params = [body.userName, body.userEmail, body.userPassword, body.agreePolicy];

      try {
        connection.query(sql, params, (error, rows) => {
          if(error) {
            return res.json({"status": error.code, "message": error.message});
          } else if (rows.changedRows != 1) {
            res.status(404);
            status = res.statusCode;
          }
          res.json({"status": status, "message": message(status)});
        });
      } catch (error) {
        return res.json({"status": error.code, "message": error.message});
      }
  },

  userUpdt : (req, res) => {
      var status = res.statusCode;
      var sql = 'update vuexy_user_info set user_password = ?, update_date = now() where user_password = ?';
      var params = [req.body.newPassword, req.body.oldPassword];
      console.log(params);
      try {
        connection.query(sql, params, (error, rows) => {
          console.log(rows)
          if(error) {
            return res.json({"status": error.code, "message": error.message});
          } else if (rows.changedRows != 1) {
            res.status(404);
            status = res.statusCode;
          }
          res.json({"status": status, "message": message(status)});
        });
      } catch (error) {
        return res.json({"status": error.code, "message": error.message});
      }
  },

  userDel : (req, res) => {
      var status = res.statusCode;
      var sql = 'update vuexy_user_info set del_yn = 1, del_date = now() where del_yn = 0 and user_id = ?';
      var params = req.params.id;

      try {
        connection.query(sql, params, (error, rows) => {
          if(error) {
            return res.json({"status": error.code, "message": error.message});
          } else if (rows.changedRows != 1) {
            res.status(404);
            status = res.statusCode;
          }
          res.json({"status": status, "message": message(status)});
        });
      } catch (error) {
        return res.json({"status": error.code, "message": error.message});
      }
  }
}
