const  findDocumentsByQuery = async(modelObject, query, options) => {

    try {
       return await  modelObject.find(query, options).lean();
    } catch (error) {
        console.log("Error while saving data:" + error)
     return error
    }
}
const getProfile = async(modelObject, query) => {
    try {
        console.log(modelObject)
        console.log(query)
        return await  modelObject.findOne(query).lean();
    } catch (error) {
        console.log("Error while getting data:" + error)
        return error
    }
}
const getStudents = async(modelObject, query) => {
    try {
        console.log(modelObject)
        console.log(query)
        return await  modelObject.find(query).lean();
    } catch (error) {
        console.log("Error while getting data:" + error)
        return error
    }
}

const saveDocuments = async(modelObject, data, options) => {
    console.log("bbb")
    try {
        let model = new modelObject(data,options);
        console.log(model)
        return await model.save(options);

    } catch (error) {
        console.log("Error while saving data:" + error)
        return error
    }
}



const findDocumentsByLookup = async (modelObject,lookupObject, query) => {
    try {
        console.log(query)

        const agg = [
            { $match: query },
            {
                $lookup:
                {
                    from: lookupObject,
                    localField: 'companyId',
                    foreignField: '_id',
                    as: 'companydetails'
                },
            },

        ];
        return await modelObject.aggregate(agg).exec();


    } catch (error) {
        console.log("Error while saving data:" + error)
        return error
    }
}





const updateField =  async(modelObject, id, update) => {
    console.log("update")
    console.log(id)
    try {
        return await modelObject.findOneAndUpdate(id, update, {useFindAndModify:false,new:true});
    } catch (error) {
        console.log("Error while saving data:" + error)
        return (error)
    }
}

const editObj =  async(modelObject, id, update) => {
    console.log("update")
    try {
        return await modelObject.findOneAndUpdate(id, update, {useFindAndModify:false,new:true});
    } catch (error) {
        console.log("Error while saving data:" + error)
        return (error)
    }
}



const getApplicantsforJob = async(modelObject,lookupObject, query) => {
    try {
        console.log(query)

        const agg = [
            { $match: query },
            {
                $lookup:
                {
                    from: lookupObject,
                    localField: '_id',
                    foreignField: 'applications.jobId',
                    as: 'listApplicants'
                },
            },

        ];
        return await modelObject.aggregate(agg).exec();


    } catch (error) {
        console.log("Error while saving data:" + error)
        return (error)
    }
}
///////////////////////////////////////////////////////////////












const checkEligibility = (modelObject,lookupObject, query, callback) => {
    try {
        console.log(query)

        const agg = [
            { $match: query },
            {
                $lookup:
                {
                    from: lookupObject,
                    localField: '_id',
                    foreignField: 'applications.jobId',
                    as: 'listApplicants'
                },
            },

        ];
        modelObject.aggregate(agg).exec((err, data) => {
            if (data) {
                console.log(data)
                callback(err, data)
            }
            else if (err) {
                callback(err, data)
            }
        });


    } catch (error) {
        console.log("Error while saving data:" + error)
        callback(err, null)
    }
}

// const findDocumentsByPopulate = (modelObject, query, options,callback) => {
//     try {
//         modelObject.find(query, options,'_id',(err, data)=>{
//             if (data){
//                 console.log(data)
//                 callback(err,data)
//             }
//             else if(err){
//                 callback(err,data)
//             }
//         }).lean();
//     } catch (error) {
//         console.log("Error while saving data:" + error)
//         callback(err,null)
//     }
// }


// function getUserWithPosts(username){
//     return User.findOne({ username: username })
//       .populate('posts').exec((err, posts) => {
//         console.log("Populated User " + posts);
//       })
//   }


// const listApplicants = (modelObject,lookupObject, query, callback) => {
//     try {
//         console.log("in lookup")

//         const agg = [
//             { $match: query },
//             {
//                 $lookup:
//                 {
//                     from: lookupObject,
//                     localField: 'companyId',
//                     foreignField: '_id',
//                     as: 'companydetails'
//                 },
//             },

//         ];
//         modelObject.aggregate(agg).exec((err, data) => {
//             if (data) {
//                 console.log(data)
//                 callback(err, data)
//             }
//             else if (err) {
//                 callback(err, data)
//             }
//         });


//     } catch (error) {
//         console.log("Error while saving data:" + error)
//         callback(err, null)
//     }
// }

const findDocumentsByQueryAsync = async (modelObject, query, projection, options) => {
    try {
        return await modelObject.find(query, projection, options).lean();
    } catch (error) {
        throw new Error(error);
    }
}

const findDocumentsByLookupAsync = async (modelObject,lookupObject, query, local, foreign, aggName) => {
    try { const agg = [
            { $match: query },
            {
                $lookup:
                {
                    from: lookupObject,
                    localField: local,
                    foreignField: foreign,
                    as: aggName
                },
            },
        ];
        return await modelObject.aggregate(agg).exec();
    } catch (error) {
        console.log("Error while saving data:" + error)
        throw new Error(error);
    }
}



module.exports.findDocumentsByQuery = findDocumentsByQuery;
module.exports.saveDocuments = saveDocuments;
module.exports.updateField = updateField;
module.exports.findDocumentsByLookup = findDocumentsByLookup;
module.exports.editObj = editObj;
module.exports.getApplicantsforJob = getApplicantsforJob;
module.exports.checkEligibility = checkEligibility;
module.exports.getProfile = getProfile;

module.exports.getStudents = getStudents;

module.exports.findDocumentsByLookupAsync = findDocumentsByLookupAsync;
module.exports.findDocumentsByQueryAsync = findDocumentsByQueryAsync;
