const query = require('../Database/queries');
var ObjectId = require('mongodb').ObjectID;
const Students = require('../Models/StudentModel');
const passwordHash = require('password-hash');

const addStudent = async (student_details) => {
    console.log(student_details)
    try {
        let hashedPassword;
        if (student_details.password)
            hashedPassword = passwordHash.generate(student_details.password);

        student_details.password = hashedPassword

        console.log(student_details)
        return await query.saveDocuments(Students.createModel(), student_details, { runValidators: false })
    }
    catch (error) {
        return error
    }
}


const updateStudent = async (profile) => {
    var update_data = null

    if (profile.type === "profile1") {
        update_data = {
            first_name: profile.first_name,
            last_name: profile.last_name
        }
        console.log(update_data)
        console.log(profile.id)
        try {
            let res = await query.updateField(Students.createModel(), { _id: ObjectId(profile.id) }, update_data)
            return { "status": 200, "message": "updated successfully" }
        }
        catch (error) {
            return {
                "status": error.status ? error.status : 500, "message": error.message ? error.message : "error while updating student profile"
            }
        }
    }

    if (profile.type === "career") {
        update_data = {
            career_objective: profile.career_objective

        }
        console.log(update_data)
        console.log(profile.id)
        try {
            let res = query.updateField(Students.createModel(), { _id: ObjectId(profile.id) }, update_data)
            return { "status": 200, "message": "updated successfully" }
        }
        catch (error) {
            return {
                "status": error.status ? error.status : 500, "message": error.message ? error.message : "error while updating student profile"
            }
        }
    }

    else if (profile.type === "basic") {
        update_data = {
            email: profile.email,
            mobile: profile.mobile,
            dob: profile.dob,
            city: profile.city,
            state: profile.state,
            country: profile.country
        }
        console.log(update_data)
        console.log(profile.id)
        try {
            let res = await query.updateField(Students.createModel(), { _id: ObjectId(profile.id) }, update_data)
            return { "status": 200, "message": "updated successfully" }
        }
        catch (error) {
            return {
                "status": error.status ? error.status : 500, "message": error.message ? error.message : "error while updating student profile"
            }
        }
    }

    else if (profile.type === "education") {
        // let update_data = {
        //     college_name: profile.college_name,
        //     location: profile.location,
        //     degree: profile.degree,
        //     major: profile.major,
        //     cgpa: profile.cgpa,
        //     year_of_starting: profile.year_of_starting,
        //     month_of_starting: profile.month_of_starting,
        //     year_of_passing: profile.year_of_passing,
        //     month_of_passing: profile.month_of_passing
        // }

        if (profile.educationId === "") {
            match = { _id: ObjectId(profile.id) }
            update_data = {
                $push: {
                    education: {
                        college_name: profile.college_name,
                        location: profile.location,
                        degree: profile.degree,
                        major: profile.major,
                        cgpa: profile.cgpa,
                        year_of_starting: profile.year_of_starting,
                        month_of_starting: profile.month_of_starting,
                        year_of_passing: profile.year_of_passing,
                        month_of_passing: profile.month_of_passing

                    }
                }
            }
        } else {
            match = { _id: ObjectId(profile.id), 'education._id': profile.educationId }
            update_data = {
                'education.$.college_name': profile.college_name,
                'education.$.location': profile.location,
                'education.$.degree': profile.degree,
                'education.$.major': profile.major,
                'education.$.cgpa': profile.cgpa,
                'education.$.year_of_starting': profile.year_of_starting,
                'education.$.month_of_starting': profile.month_of_starting,
                'education.$.year_of_passing': profile.year_of_passing,
                'education.$.month_of_passing': profile.month_of_passing
            }
        }

        console.log("updateeducation")
        console.log(update_data)
        console.log(profile.id)
        try {
            let res = await query.updateField(Students.createModel(), match, update_data)
            return { "status": 200, "message": "updated successfully" }
        }
        catch (error) {
            return {
                "status": error.status ? error.status : 500, "message": error.message ? error.message : "error while updating student profile"
            }
        }

    }

    else if (profile.type === "experience") {
        let update_data = {
            company: profile.company,
            title: profile.title,
            location: profile.location,
            description: profile.description,
            year_of_starting: profile.year_of_starting,
            month_of_starting: profile.month_of_starting,
            year_of_ending: profile.year_of_ending,
            month_of_ending: profile.month_of_ending
        }

        if (profile.experienceId === "") {
            match = { _id: ObjectId(profile.id) }
            update_data = {
                $push: {
                    experience: {
                        company: profile.company,
                        title: profile.title,
                        location: profile.location,
                        description: profile.description,
                        year_of_starting: profile.year_of_starting,
                        month_of_starting: profile.month_of_starting,
                        year_of_ending: profile.year_of_ending,
                        month_of_ending: profile.month_of_ending
                    }
                }
            }
        } else {
            match = { _id: ObjectId(profile.id), 'experience._id': profile.experienceId }
            update_data = {
                'experience.$.college_name': profile.college_name,
                'experience.$.company': profile.company,
                'experience.$.title': profile.title,
                'experience.$.location': profile.location,
                'experience.$.description': profile.description,
                'experience.$.year_of_starting': profile.year_of_starting,
                'experience.$.month_of_starting': profile.month_of_starting,
                'experience.$.year_of_ending': profile.year_of_ending,
                'experience.$.month_of_ending': profile.month_of_ending
            }
        }
        console.log(update_data)
        console.log(profile.id)
        try {
            let res = await query.updateField(Students.createModel(), match, update_data)
            return { "status": 200, "message": "updated successfully" }
        }
        catch (error) {
            return {
                "status": error.status ? error.status : 500, "message": error.message ? error.message : "error while updating student profile"
            }
        }

    }

}



exports.addStudent = addStudent;
exports.updateStudent = updateStudent;












