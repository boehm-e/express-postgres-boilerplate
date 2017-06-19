const request = require('supertest');
const should = require('should');
const app = require('../app');

describe('Create a new user', () => {
	it('POST /api/users', done => {
		let user = {
				name: "Liazidi",
				fname: "Amine",
				address: "23 Avenue Bernard Palissy, 92210 Saint Cloud",
				email: "liazidiiamine@gmail.com",
				status: 1,
				password: "coucoutoi666"
		};

		request(app)
		.post('/api/users')
		.send(user)
		.expect(200).expect(res => {
			res.should.have.status(201);
			res.body.should.have.property('name');
			res.body.should.have.property('email');
			res.body.should.have.property('created_at');
		}).end(done);
	});
});

describe('List all users', () => {
	it('GET /api/users', done => {

		request(app)
		.get('/api/users')
		.expect(200).expect(res => {
			res.should.have.status(200);
			res.body.should.be.a('array');
		}).end(done);
	});
});
