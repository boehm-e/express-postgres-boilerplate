const request = require('supertest');
const should = require('should');
const app = require('../app');

describe('Update a user', () => {
	it('Put /api/user/1', done => {
		let user = {
				name: "Liazidi",
				fname: "Amine",
				address: "23 Avenue Bernard Palissy, 92210 Saint Cloud",
				email: "liazidiiamine@gmail.com",
				status: 1,
				password: "coucoutoi666"
		};

		request(app)
		.put('/api/user/1')
		.send(user)
		.expect(200).expect(res => {
			res.should.have.status(200);
			res.body.should.have.property('name');
			res.body.should.have.property('email');
			res.body.should.have.property('updated_at');
		}).end(done);
	});
});

describe('Retrieve a user', () => {
	it('GET /api/user/1', done => {

		request(app)
		.get('/api/user/1')
		.expect(200).expect(res => {
			res.should.have.status(200);
			res.body.should.have.property('name');
			res.body.should.have.property('fname');
			res.body.should.have.property('address');
			res.body.should.have.property('email');
			res.body.should.have.property('status');
			res.body.should.have.property('password');
		}).end(done);
	});
});
