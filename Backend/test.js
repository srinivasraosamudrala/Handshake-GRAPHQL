const chai = require('chai');
chai.use(require('chai-http'));
const { expect } = require('chai');
const app = require('./index');
const agent = require('chai').request.agent(app);


describe('Handshake Lab2 Testing', () => {

///////////////////////////////////**********************************////////////////// */
it('GET /signin - Authenticate User with Invalid Credentials', (done) => {
    agent.get('/company/company_signin/abcdefg@gmail.com/aaaaaa')      
    .then((response) => {
        expect(response.body.error).to.equal('failure');
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

///////////////////////////////////**********************************////////////////// */
  it('POST /post_job - Post a New Job', (done) => {
    const data = {
      title: 'Software Engineer test mocha',
      deadline: '2020-04-30',
      location: 'New York',
      salary: '50',
      description: 'React JS Software Engineer',
      category: 'Internship',
      posting_date: '2020-03-10',
      companyId: '5e85304c240b073600cc43f1'
    };
    agent.post('/company/post_job')
      .send(data)
      .then((response) => {
        expect(response.body.result).to.equal('success');
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  ///////////////////////////////////**********************************////////////////// */
  it('PUT /updateprofile - Update the company profile', (done) => {
    const data = {
      name: 'Infor, inc',
      email: 'infor@gmail.com',
      location: 'New York',
      phone: '77777777777',
      company_description: 'abcdef',
      company_id: '5e852ed74607a997f86f7108'
    };
    agent.put('/company/updateprofile')
      .send(data)
      .then((response) => {
        expect(response.body.result.description).to.equal('abcdef');
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});


  ///////////////////////////////////**********************************////////////////// */
  it('POST Update career objective of student', (done) => {
    const data = {
      id: '5e79811c9e59dd64e8c54ac8',
      career_objective: "My ultimate goal is to start a company"
    };
    agent.post('/student/student_journey_edited')
      .send(data)
      .then((response) => {
        expect(response.body.result.career_objective).to.equal('My ultimate goal is to start a company');
        done();
      })
      .catch((e) => {
        done(e);
      });
  });


  ///////////////////////////////////**********************************////////////////// */
  it('GET check if event already applied', (done) => {
    const data = {
      eventId: '5e85ca6aa3a5208d8cd3f2ac',
      studentId: '5e82e5091eebbf5fe00c0488'
    };
    agent.get('/company/event_already_applied/5e85ca6aa3a5208d8cd3f2ac/5e82e5091eebbf5fe00c0488')
      // .send(data)
      .then((response) => {
        expect(response.body.result).to.equal('success');
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
