"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _ = _interopRequireDefault(require("../.."));

var _user = _interopRequireDefault(require("./user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* globals describe, expect, it, before, after, beforeEach, afterEach */
describe('User API:', function () {
  var user; // Clear users before testing

  before(function () {
    return _user.default.remove().then(function () {
      user = new _user.default({
        name: 'Fake User',
        email: 'test@example.com',
        password: 'password'
      });
      return user.save();
    });
  }); // Clear users after testing

  after(function () {
    return _user.default.remove();
  });
  describe('GET /api/users/me', function () {
    var token;
    before(function (done) {
      (0, _supertest.default)(_.default).post('/auth/local').send({
        email: 'test@example.com',
        password: 'password'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        token = res.body.token;
        done();
      });
    });
    it('should respond with a user profile when authenticated', function (done) {
      (0, _supertest.default)(_.default).get('/api/users/me').set('authorization', "Bearer ".concat(token)).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        expect(res.body._id.toString()).to.equal(user._id.toString());
        done();
      });
    });
    it('should respond with a 401 when not authenticated', function (done) {
      (0, _supertest.default)(_.default).get('/api/users/me').expect(401).end(done);
    });
  });
});