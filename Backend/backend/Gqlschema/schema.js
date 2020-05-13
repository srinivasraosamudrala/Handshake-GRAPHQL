const graphql = require('graphql');

const { addJob, applyJob, changeJobStatus } = require('../mutations/job');
const { ViewJobs, ViewAllJobs, ViewJobDetails , listAppliedJobs, listApplicants} = require('../queries/job');
const { ViewCompany } = require('../queries/company');
const { ViewStudent, ViewAllStudents } = require('../queries/student');
const { addStudent, updateStudent } = require('../mutations/student');
const { addCompany, updateCompany } = require('../mutations/company');
const { studentLogin, companyLogin} = require('../Mutations/login');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const JobType = new GraphQLObjectType({
    name: 'job',
    fields: () => ({
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        posting_date: { type: GraphQLString },
        deadline: { type: GraphQLString },
        location: { type: GraphQLString },
        salary: { type: GraphQLString },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
        companyId: { type: GraphQLID },
        companydetails: { type: new GraphQLList(CompanyType) },
        applications:{ type: new GraphQLList(ApplicationType)},
        listApplicants:{type: new GraphQLList(StudentType)}
    })
});


const CompanyType = new GraphQLObjectType({
    name: 'company',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        location: { type: GraphQLString },
        description: { type: GraphQLString }

    })
});
const ApplicationType = new GraphQLObjectType({
    name: 'jobApplication',
    fields: () => ({
        _id: { type: GraphQLID },
        studentId: { type: GraphQLString },
        status: { type: GraphQLString },
        appliedDate: { type: GraphQLString }

    })
});




const StudentType = new GraphQLObjectType({
    name: 'student',
    fields: () => ({
        _id: { type: GraphQLID },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        college: { type: GraphQLString },
        dob: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        career_objective: { type: GraphQLString },
        education: { type: GraphQLList(EducationType) },
        experience: { type: GraphQLList(ExperienceType) },
        applications: { type: new GraphQLList(StudentApplicationType) }

    })
});

const LoginType = new GraphQLObjectType({
    name: 'login',
    fields: () => ({
        _id: { type: GraphQLID},
    })
})

const StatusType = new GraphQLObjectType({
    name: 'status',
    fields: () => ({
        status: { type: GraphQLString },
        message: { type: GraphQLString }
    })
})


const StudentApplicationType = new GraphQLObjectType({
    name: 'studentApplications',
    fields: () => ({
        _id: { type: GraphQLID },
        jobId: { type: GraphQLID }

    })
});


const EducationType = new GraphQLObjectType({
    name: 'education',
    fields: () => ({
        _id: { type: GraphQLID },
        college_name: { type: GraphQLString },
        location: { type: GraphQLString },
        degree: { type: GraphQLString },
        major: { type: GraphQLString },
        cgpa: { type: GraphQLString },
        year_of_starting: { type: GraphQLInt },
        month_of_starting: { type: GraphQLInt },
        year_of_passing: { type: GraphQLInt },
        month_of_passing: { type: GraphQLInt }
    })
});
const ExperienceType = new GraphQLObjectType({
    name: 'experience',
    fields: () => ({
        _id: { type: GraphQLID },
        company: { type: GraphQLString },
        title: { type: GraphQLString },
        location: { type: GraphQLString },
        description: { type: GraphQLString },
        year_of_starting: { type: GraphQLInt },
        month_of_starting: { type: GraphQLInt },
        year_of_ending: { type: GraphQLInt },
        month_of_ending: { type: GraphQLInt }

    })
});


const prepare = (o) => {
    console.log("aaa")
    o._id = o._id.toString()
    return o
}

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        jobs: {
            type: new GraphQLList(JobType),
            args: { companyId: { type: GraphQLString } },
            async resolve(parent, args) {
                let data = await ViewJobs(args)
                console.log(data)
                return (data)
            }
        },

        alljobs: {
            type: new GraphQLList(JobType),
            args: {},
            async resolve(parent, args) {
                let data = await ViewAllJobs(args)
                console.log(data)
                return (data)
            }
        },

        jobdetails: {
            type: new GraphQLList(JobType),
            args: { jobId: { type: GraphQLString } },
            async resolve(parent, args) {
                let data = await ViewJobDetails(args)
                console.log(data)
                return (data)
            }
        },
        
        listAppliedJobs: {
            type: new GraphQLList(JobType),
            args: { studentId: { type: GraphQLString } },
            async resolve(parent, args) {
                let data = await listAppliedJobs(args)
                return (data)
            }
        },
        
        listApplicants: {
            type: new GraphQLList(JobType),
            args: { jobId: { type: GraphQLString } },
            async resolve(parent, args) {
                let data = await listApplicants(args)
                console.log(data)
                return (data)
            }
        },
        
        company: {
            // type: new GraphQLList(CompanyType),
            type: CompanyType,

            args: { companyId: { type: GraphQLString } },
            async resolve(parent, args) {
                let data = await ViewCompany(args)
                console.log(data)
                return (data)
            }
        },

        student: {
            // type: new GraphQLList(CompanyType),
            type: StudentType,

            args: { studentId: { type: GraphQLString } },
            async resolve(parent, args) {
                let data = await ViewStudent(args)
                console.log(data)
                return (data)
            }
        },
        allStudents: {
            // type: new GraphQLList(CompanyType),
            type: new GraphQLList(StudentType),

            args: { studentId: { type: GraphQLString } },
            async resolve(parent, args) {
                let data = await ViewAllStudents(args)
                console.log(data)
                return (data)
            }
        },

    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addJob: {
            type: StatusType,
            args: {
                title: { type: GraphQLString },
                posting_date: { type: GraphQLString },
                deadline: { type: GraphQLString },
                location: { type: GraphQLString },
                salary: { type: GraphQLString },
                description: { type: GraphQLString },
                category: { type: GraphQLString },
                companyId: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let data = await addJob(args)
                {
                    return data
                }
            }
        },
        applyJob: {
            type: StatusType,
            args: {
                job_id: { type: GraphQLString },
                stud_id: { type: GraphQLString },
                app_date: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let data = await applyJob(args)
                {
                    return data
                }
            }
        },
        changeJobStatus: {
            type: StatusType,
            args: {
                studentId: { type: GraphQLString },
                status: { type: GraphQLString },
                jobId: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let data = await changeJobStatus(args)
                {
                    return data
                }
            }
        },

        
        addCompany: {
            type: CompanyType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                location: { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log(args)
                let data = await addCompany(args)
                {
                    return data
                }
            }
        },

        updateCompany: {
            type: CompanyType,
            args: {
                name: { type: GraphQLString },
                location: { type: GraphQLString },
                description: { type: GraphQLString },
                company_id: { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log(args)
                let data = await updateCompany(args)
                {
                    return data
                }
            }
        },

        updateStudent: {
            type: StatusType,
            args: {
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                email: { type: GraphQLString },
                college: { type: GraphQLString },
                dob: { type: GraphQLString },
                mobile:{ type: GraphQLString},
                city: { type: GraphQLString },
                state: { type: GraphQLString },
                country: { type: GraphQLString },
                career_objective: { type: GraphQLString },
                id: { type: GraphQLString },
                type: { type: GraphQLString }

            },
            async resolve(parent, args) {
                console.log(args)
                let data = await updateStudent(args)
                {
                    return data
                }
            }
        },
        updateStudentEducation: {
            type: StatusType,
            args: {
                college_name: { type: GraphQLString },
                location: { type: GraphQLString },
                degree: { type: GraphQLString },
                major: { type: GraphQLString },
                cgpa: { type: GraphQLString },
                year_of_starting: { type: GraphQLInt },
                month_of_starting: { type: GraphQLInt },
                year_of_passing: { type: GraphQLInt },
                month_of_passing: { type: GraphQLInt },
                id: { type: GraphQLString },
                type: { type: GraphQLString },
                educationId: {type: GraphQLString}

            },
            async resolve(parent, args) {
                console.log(args)
                let data = await updateStudent(args)
                {
                    return data
                }
            }
        },

        updateStudentExperience: {
            type: StatusType,
            args: {
                company: { type: GraphQLString },
                title: { type: GraphQLString },
                location: { type: GraphQLString },
                description: { type: GraphQLString },
                year_of_starting: { type: GraphQLInt },
                month_of_starting: { type: GraphQLInt },
                year_of_ending: { type: GraphQLInt },
                month_of_ending: { type: GraphQLInt },
                id: { type: GraphQLString },
                experienceId : { type: GraphQLString },
                type: { type: GraphQLString }

            },
            async resolve(parent, args) {
                console.log(args)
                let data = await updateStudent(args)
                {
                    return data
                }
            }
        },

        addStudent: {
            type: StudentType,
            args: {
                first_name  : { type: GraphQLString },
                last_name   : { type: GraphQLString },
                email       : { type: GraphQLString },
                password    : { type: GraphQLString },
                college     : { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log(args)
                let data = await addStudent(args)
                {
                    return data
                }
            }
        },

        studentLogin: {
            type: LoginType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                return studentLogin(args);
            }
        },

        companyLogin: {
            type: LoginType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                return companyLogin(args);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});